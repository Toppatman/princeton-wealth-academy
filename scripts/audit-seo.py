#!/usr/bin/env python3
"""Phase 7 static output audit: run after npm run build."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import sys

ORIGIN = "https://princetonwealthacademy.com"
DIST = Path("dist")
ISSUES = []

class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.html_lang = None
        self.canonicals = []
        self.alternates = {}
        self.descriptions = []
        self.robots = []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html":
            self.html_lang = d.get("lang")
        elif tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "link":
            rel = (d.get("rel") or "").split()
            if "canonical" in rel:
                self.canonicals.append(d.get("href"))
            if "alternate" in rel and d.get("hreflang"):
                self.alternates[d["hreflang"]] = d.get("href")
        elif tag == "meta":
            if d.get("name") == "description":
                self.descriptions.append(d.get("content"))
            if d.get("name") == "robots":
                self.robots.append(d.get("content") or "")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def route_for(file):
    relative = file.relative_to(DIST)
    if relative.name == "index.html":
        parent = relative.parent.as_posix()
        return "/" if parent == "." else "/" + parent + "/"
    return "/" + relative.as_posix()

def fail(route, reason):
    ISSUES.append(f"{route}: {reason}")

pages = {}
for html in DIST.rglob("*.html"):
    route = route_for(html)
    m = Metadata()
    m.feed(html.read_text(encoding="utf-8"))
    pages[route] = m
    expected = ORIGIN + route
    zh = route.startswith("/zh/")
    if m.html_lang != ("zh-Hans" if zh else "en"):
        fail(route, f"incorrect html lang ({m.html_lang})")
    if len(m.canonicals) != 1 or m.canonicals[0] != expected:
        fail(route, f"invalid canonical: {m.canonicals}")
    if len(m.descriptions) != 1 or not m.descriptions[0] or not m.descriptions[0].strip():
        fail(route, "missing or duplicate meta description")
    if not m.title.strip() or "Princeton Wealth Academy | Princeton Wealth Academy" in m.title:
        fail(route, "missing or duplicated page title")
    if m.h1 != 1:
        fail(route, f"expected exactly one H1; found {m.h1}")
    if len(m.robots) != 1:
        fail(route, "expected one meta robots directive")
    if route == "/zh/insights/language-test/" and "noindex" not in " ".join(m.robots):
        fail(route, "test page must be noindex")

for route, m in pages.items():
    if m.alternates:
        for lang in ("en", "zh-Hans"):
            href = m.alternates.get(lang)
            if not href or not href.startswith(ORIGIN + "/"):
                fail(route, f"missing or invalid alternate {lang}")
                continue
            paired_route = urlparse(href).path
            if paired_route not in pages:
                fail(route, f"alternate {lang} route does not exist: {paired_route}")
                continue
            if pages[paired_route].alternates.get("zh-Hans" if route.startswith("/zh/") else "en") != ORIGIN + route:
                fail(route, f"alternate link to {paired_route} is not reciprocal")

if not pages:
    fail("dist/", "no HTML pages found")

print(f"Audited {len(pages)} pages: {len(ISSUES)} issues.")
for issue in ISSUES:
    print("ERROR:", issue)
sys.exit(1 if ISSUES else 0)
