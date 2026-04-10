import { ui, type Lang, type UITranslations } from './ui';

export type { Lang, UITranslations };

export function useTranslations(lang: Lang): UITranslations {
  return ui[lang];
}

/** Build the path for a given locale.
 *  e.g. getLocalePath('hu', '/about-us') → '/hu/about-us'
 *       getLocalePath('en', '/about-us') → '/about-us'
 */
export function getLocalePath(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  return `/${lang}${path}`;
}

/** Detect the active lang from a URL pathname.
 *  e.g. '/hu/about-us' → 'hu'
 *       '/about-us'    → 'en'
 */
export function getLangFromPath(path: string): Lang {
  if (path.startsWith('/hu')) return 'hu';
  if (path.startsWith('/ro')) return 'ro';
  return 'en';
}

/** Return the equivalent path in a target locale.
 *  e.g. switchLang('/hu/about-us', 'ro') → '/ro/about-us'
 *       switchLang('/about-us', 'hu')     → '/hu/about-us'
 */
export function switchLang(currentPath: string, targetLang: Lang): string {
  // Strip existing prefix
  const stripped = currentPath
    .replace(/^\/hu(\/|$)/, '/')
    .replace(/^\/ro(\/|$)/, '/');
  const clean = stripped || '/';
  return getLocalePath(targetLang, clean);
}
