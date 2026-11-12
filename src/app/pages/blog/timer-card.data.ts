import { Lang } from '../../i18n/lang';
import type { BlogPost } from './blog-posts.data';

// Card for the online adt timer / chug timer tool. The tool page is not a blog post,
// so it has its own card: on the home page (latest posts) and under every term page.
export const TIMER_CARD: Record<Lang, BlogPost> = {
  nl: {
    slug: 'adt-timer',
    path: 'adt-timer',
    category: 'Inspiratie',
    title: 'Online adt timer',
    excerpt: 'Time je adtje gratis in je browser. Dezelfde Any-timer als in de app, tot op de honderdste seconde.',
    date: '2026-11-04',
    image: 'assets/blogs/beste timer/adt timer online.webp',
    imageAlt: 'De online adt timer: een blauw scherm met de Any-timer, een tijd en een vingerafdruk',
    variant: 'light'
  },
  en: {
    slug: 'chug-timer',
    path: 'en/chug-timer',
    category: 'Inspiratie',
    title: 'Online chug timer',
    excerpt: 'Time your chug for free in your browser. The same Any timer as in the app, down to a hundredth of a second.',
    date: '2026-11-04',
    image: 'assets/blogs/beste timer/adt timer online.webp',
    imageAlt: 'The online chug timer: a blue screen with the Any timer, a time and a fingerprint',
    variant: 'light'
  }
};
