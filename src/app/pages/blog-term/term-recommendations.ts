import { BlogPost, dutchSlugOf, pickRecommendations } from '../blog/blog-posts.data';
import { Lang } from '../../i18n/lang';
import { DEFAULT_BLOGS, DEFAULT_GAMES, REC_BLOGS, REC_GAMES, TERM_RECOMMENDATIONS } from './term-recommendations.data';

// "Aanbevolen drankspellen" (10) and "Aanbevolen blogs" (10) under a term page.
// Chosen per term by scripts/build_recommendations.py. Terms added after the last
// run get the default order (highest value first). The term data lives here, not
// in blog-posts.data.ts, so it only loads with the lazy term page.
export function getTermRecommendations(post: BlogPost, lang: Lang): { games: BlogPost[]; blogs: BlogPost[] } {
  const [games, blogs] = TERM_RECOMMENDATIONS[dutchSlugOf(post)] ?? [DEFAULT_GAMES, DEFAULT_BLOGS];
  return {
    games: pickRecommendations(games, REC_GAMES, DEFAULT_GAMES, lang, 10),
    blogs: pickRecommendations(blogs, REC_BLOGS, DEFAULT_BLOGS, lang, 10)
  };
}
