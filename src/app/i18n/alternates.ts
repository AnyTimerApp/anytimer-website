import { BLOG_POSTS_EN } from '../pages/blog/blog-posts.en.data';
import { Lang, normalizePath } from './lang';

// Single source of truth for which Dutch page belongs to which English page.
// Used for hreflang (app.component.ts), the language switcher (navbar) and
// the sitemap (scripts/sitemap_alternates.py parses the pairs below plus
// BLOG_POSTS_EN). Paths: leading slash, trailing slash, '/' for home.
const STATIC_PAIRS: [nl: string, en: string][] = [
  ['/', '/en/'],
  ['/contact/', '/en/contact/'],
  ['/privacy/', '/en/privacy/'],
  ['/terms/', '/en/terms/'],
  ['/remove-account/', '/en/remove-account/'],
  ['/blog/', '/en/blog/'],
  ['/blog/begrippen/', '/en/blog/dictionary/'],
  ['/blog/inspiratie/', '/en/blog/inspiration/'],
  ['/blog/weetjes/', '/en/blog/good-to-know/'],
  ['/blog/drankspelletjes/', '/en/blog/drinking-games/']
];

export const ALTERNATE_PAIRS: [nl: string, en: string][] = [
  ...STATIC_PAIRS,
  ...BLOG_POSTS_EN
    .filter(p => p.alternate)
    .map(p => [normalizePath('/' + p.alternate), normalizePath('/' + p.path)] as [string, string])
];

const NL_TO_EN = new Map(ALTERNATE_PAIRS.map(([nl, en]) => [nl, en]));
const EN_TO_NL = new Map(ALTERNATE_PAIRS.map(([nl, en]) => [en, nl]));

// Both language versions of the page at `url`. A language is missing when
// that page has no counterpart (yet), e.g. the Dutch glossary term pages.
export function alternatesFor(url: string): Partial<Record<Lang, string>> {
  const path = normalizePath(url);
  if (NL_TO_EN.has(path)) return { nl: path, en: NL_TO_EN.get(path)! };
  if (EN_TO_NL.has(path)) return { nl: EN_TO_NL.get(path)!, en: path };
  return path.startsWith('/en/') ? { en: path } : { nl: path };
}
