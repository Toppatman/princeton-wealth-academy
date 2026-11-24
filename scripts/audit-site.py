#!/usr/bin/env python3
"""Supplemental static-site audit. Run from the Astro project root after npm run build."""
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import re
import sys
import xml.etree.ElementTree as ET

DIST = Path('dist')
ORIGIN = 'https://princetonwealthacademy.com'
HOSTS = {'princetonwealthacademy.com', 'www.princetonwealthacademy.com'}
issues = set()

def issue(route, message):
    issues.add((route, message))

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.in_title = False
        self.descriptions = []
        self.robots = []
        self.links = []
        self.ids = set()
        self.headings = []
        self.mains = 0
        self.images_without_alt = 0
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if d.get('id'):
            self.ids.add(d['id'])
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            if (d.get('name') or '').lower() == 'description':
                self.descriptions.append((d.get('content') or '').strip())
            if (d.get('name') or '').lower() == 'robots':
                self.robots.append((d.get('content') or '').lower())
        if tag == 'a' and d.get('href') is not None:
            self.links.append(d['href'])
            if d.get('name'):
                self.ids.add(d['name'])
        if re.fullmatch(r'h[1-6]', tag):
            self.headings.append(int(tag[1]))
        if tag == 'main':
            self.mains += 1
        if tag == 'img' and 'alt' not in d:
            self.images_without_alt += 1
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title += data
    @property
    def noindex(self):
        return any('noindex' in x for x in self.robots)

def route_for(file):
    p = file.relative_to(DIST)
    if p.name == 'index.html':
        return '/' if p.parent == Path('.') else '/' + p.parent.as_posix() + '/'
    return '/' + p.as_posix()

def route_alias(path):
    if path.endswith('/index.html'):
        return path[:-len('index.html')]
    return path

if not DIST.is_dir():
    sys.exit('Missing dist/. Run npm run build from the project root first.')
pages = {}
for file in sorted(DIST.rglob('*.html')):
    route = route_for(file)
    p = Page()
    p.feed(file.read_text(encoding='utf-8'))
    pages[route] = p
if not pages:
    sys.exit('No HTML pages found. Run npm run build first.')

titles, descriptions = defaultdict(list), defaultdict(list)
link_count = 0
for route, p in pages.items():
    if p.title.strip():
        titles[' '.join(p.title.split()).casefold()].append(route)
    else:
        issue(route, 'Missing title')
    if len(p.descriptions) != 1 or not p.descriptions[0]:
        issue(route, 'Missing or multiple meta descriptions')
    else:
        descriptions[' '.join(p.descriptions[0].split()).casefold()].append(route)
    if p.mains != 1:
        issue(route, f'Expected one main landmark; found {p.mains}')
    if p.headings.count(1) != 1:
        issue(route, f'Expected one H1; found {p.headings.count(1)}')
    previous = 0
    for level in p.headings:
        if level > previous + 1:
            issue(route, f'Heading level jumps from H{previous} to H{level}' if previous else f'First heading is H{level}')
        previous = level
    if p.images_without_alt:
        issue(route, f'{p.images_without_alt} image(s) missing alt attribute')
    for href in p.links:
        if not href or href == '#':
            continue
        url = urlsplit(urljoin(ORIGIN + route, href))
        if url.scheme not in ('http', 'https') or url.hostname not in HOSTS:
            continue
        link_count += 1
        path = route_alias(unquote(url.path) or '/')
        target = path if path in pages else path.rstrip('/') + '/'
        if target in pages:
            fragment = unquote(url.fragment)
            if fragment and not fragment.startswith(':~:text=') and fragment not in pages[target].ids:
                issue(route, f'Broken fragment link: {href}')
        else:
            asset = DIST / path.lstrip('/')
            if not asset.is_file():
                issue(route, f'Broken internal link: {href}')

for label, groups in [('title', titles), ('description', descriptions)]:
    for routes in groups.values():
        if len(routes) > 1:
            issue(', '.join(routes), f'Duplicate {label}')

# Verify sitemap index, sitemap entries and noindex consistency.
sitemap_routes = set()
index = DIST / 'sitemap-index.xml'
robots = DIST / 'robots.txt'
if not robots.is_file():
    issue('/robots.txt', 'Missing generated robots.txt')
if not index.is_file():
    issue('/sitemap-index.xml', 'Missing generated sitemap index')
else:
    try:
        root = ET.parse(index).getroot()
        for loc in root.findall('.//{*}loc'):
            url = urlsplit((loc.text or '').strip())
            f = DIST / unquote(url.path).lstrip('/')
            if url.hostname not in HOSTS or not f.is_file():
                issue('/sitemap-index.xml', f'Invalid sitemap reference: {loc.text}')
                continue
            for entry in ET.parse(f).getroot().findall('.//{*}loc'):
                u = urlsplit((entry.text or '').strip())
                route = route_alias(unquote(u.path) or '/')
                route = route if route in pages else route.rstrip('/') + '/'
                if u.hostname not in HOSTS or route not in pages:
                    issue(f.name, f'Invalid sitemap URL: {entry.text}')
                else:
                    sitemap_routes.add(route)
                    if pages[route].noindex:
                        issue(route, 'Noindex page appears in sitemap')
        for route, p in pages.items():
            if not p.noindex and route not in sitemap_routes and route not in ('/404.html', '/404/'):
                issue(route, 'Indexable page is missing from sitemap')
    except (ET.ParseError, OSError) as exc:
        issue('/sitemap-index.xml', f'Cannot parse sitemap: {exc}')

print(f'Checked {len(pages)} pages, {link_count} internal link occurrences, and {len(sitemap_routes)} sitemap URLs.')
for route, message in sorted(issues):
    print(f'REVIEW: {route}: {message}')
print(f'{len(issues)} issue(s) found.')
print('Static checks only: review heading semantics, mobile layout, external links and Lighthouse in a browser.')
sys.exit(1 if issues else 0)
