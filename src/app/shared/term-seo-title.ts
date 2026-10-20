import { Lang } from '../i18n/lang';

// Proper nouns that must keep their capital inside the title.
const KEEP_CASE = new Set(['Houdini', 'Italiaans afscheid', 'Spa goud']);

// Google shows about 60 characters of a title.
const MAX_TITLE = 60;

// Single source for the meta title of every Begrippen / dictionary page, so the
// route title (what Google shows) and the og:/twitter:title always match.
// Searchers type "<term> betekenis" / "<term> meaning", so that leads the title.
//   NL: "Exclusief betekenis: wat betekent exclusief?"
//   EN: "Feut meaning: what does feut mean in Dutch?"
// Too long for Google? Then the term is not repeated:
//   "Studentenreisproduct betekenis: wat betekent het?"
// app.routes.ts holds the Dutch titles as static strings built with this same rule.
export function termSeoTitle(term: string, lang: Lang, origin?: 'dutch' | 'flemish'): string {
  // Lowercase only plain capitalised words ("Exclusief" -> "exclusief");
  // acronyms, single letters, names and the pronoun "I" keep their casing.
  const plain = term.length > 1
    && term.slice(1) === term.slice(1).toLowerCase()
    && !/^I\b/.test(term)
    && !KEEP_CASE.has(term);
  const inline = plain ? term.charAt(0).toLowerCase() + term.slice(1) : term;

  if (lang === 'en') {
    const where = origin === 'flemish' ? ' in Flemish' : origin === 'dutch' ? ' in Dutch' : '';
    const full = `${term} meaning: what does ${inline} mean${where}?`;
    return full.length <= MAX_TITLE ? full : `${term} meaning: what does it mean${where}?`;
  }
  const full = `${term} betekenis: wat betekent ${inline}?`;
  return full.length <= MAX_TITLE ? full : `${term} betekenis: wat betekent het?`;
}
