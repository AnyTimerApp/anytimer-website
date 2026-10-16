export const LANGS = ['nl', 'en'] as const;

export type Lang = typeof LANGS[number];

// Every English page lives under /en/. Everything else is Dutch.
export function langFromPath(url: string): Lang {
  const path = url.split('#')[0].split('?')[0];
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'nl';
}

// Path without fragment/query, always with a trailing slash ('/' for home).
export function normalizePath(url: string): string {
  const path = url.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return '/';
  return path.endsWith('/') ? path : path + '/';
}
