import { defaultLang, showDefaultLang, ui, type Lang, type TranslationKey } from './ui';

/** Detect the language from an Astro.url object or a URL path. */
export function getLangFromUrl(url: URL | string): Lang {
  const path = typeof url === 'string' ? url : url.pathname;
  const pathname = path.startsWith('http://') || path.startsWith('https://')
    ? new URL(path).pathname
    : path;
  return pathname.split('/').filter(Boolean)[0] === 'zh' ? 'zh' : defaultLang;
}

/** Usage: const t = useTranslations(getLangFromUrl(Astro.url)); t('nav.home') */
export function useTranslations(lang: Lang) {
  return (key: TranslationKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Translate a local path while preserving its slug, query string, and fragment. */
export function localizePath(path: string, lang: Lang): string {
  // Leave mailto:, https: and other externally handled URLs alone.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;

  const match = path.match(/^([^?#]*)(.*)$/);
  const rawPath = match?.[1] || '/';
  const suffix = match?.[2] || '';
  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = pathname.replace(/^\/(?:zh|en)(?=\/|$)/, '') || '/';

  if (lang === defaultLang && !showDefaultLang) return pathname + suffix;
  const localized = pathname === '/' ? `/${lang}/` : `/${lang}${pathname}`;
  return localized + suffix;
}

/** Astro's common helper pattern, for nav/menu links. */
export function useTranslatedPath(lang: Lang) {
  return (path: string) => localizePath(path, lang);
}

/** Flip English ↔ Chinese, keeping the current route when translations share slugs. */
export function getAlternateLanguagePath(url: URL | string): string {
  const path = typeof url === 'string' ? url : `${url.pathname}${url.search}${url.hash}`;
  const nextLang: Lang = getLangFromUrl(url) === 'zh' ? 'en' : 'zh';
  return localizePath(path, nextLang);
}
