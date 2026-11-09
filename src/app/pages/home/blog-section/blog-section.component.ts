import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../../components/blog-card/blog-card.component';
import { BlogPost, CategoryCard, getCategoryCards, postsFor } from '../../blog/blog-posts.data';
import { LanguageService } from '../../../i18n/language.service';
import { Lang } from '../../../i18n/lang';
import { UI } from '../../../i18n/ui';

// "Populairste drankspellen" on the home page: the 12 single-game posts with the most
// Google Search Console impressions over the last 28 days. Updated by the weekly SEO
// analysis (.claude/skills/gum-seo-weekly). Last update: 2026-11-04 (data 5 Oct to 1 Nov 2026).
const TOP_DRANKSPELLEN_SLUGS = [
  'kingsen',
  'fuck-the-dealer',
  'de-paardenrace',
  'mexen',
  'bussen',
  'mario-barf',
  'stress-pong',
  'zeeslag',
  'vikingen',
  'hoger-lager',
  '30-seconds',
  'trek-je-bak-mania'
];

// The English site shows the same games in the same order, through each post's `alternate`.
// Only fill this in once the English pages have enough Search Console data of their own.
const TOP_DRANKSPELLEN_SLUGS_EN: string[] | null = null;

// Slugs pinned at the start of the latest posts row, in this order: the "Top 10
// drankspellen" post and the adt timer comparison. The online timer page itself
// is not a blog post, so it gets its own card right after the top 10.
const PINNED_SLUGS: Record<Lang, string[]> = {
  nl: ['drankspellen', 'wat-is-de-beste-adt-timer'],
  en: ['best-drinking-games', 'best-chug-timer']
};

const TIMER_CARD: Record<Lang, BlogPost> = {
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

const TEXT = {
  nl: {
    title: 'We delen ook al onze kennis',
    intro: 'We delen alleen drankspellen die we zelf spelen en echt leuk vinden. Ook schrijven we artikelen vol inspiratie, bijvoorbeeld voor een leuke avond met vrienden. Daarnaast maakten we een begrippenwoordenboek met de bekendste studentenbegrippen. En af en toe delen we een interessant weetje. Zo vind je alles op één plek.',
    favourites: 'Populairste drankspellen',
    latest: 'Onze laatste blogs'
  },
  en: {
    title: 'We share everything we know',
    intro: 'We only share drinking games we play ourselves and really enjoy. We also write articles full of ideas, like how to have a great night with friends. And we explain the Dutch student slang you hear everywhere in the Netherlands. Every now and then we share a fun fact too.',
    favourites: 'Most popular drinking games',
    latest: 'Our latest blogs'
  }
};

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [RouterLink, CommonModule, BlogCardComponent],
  templateUrl: './blog-section.component.html',
  styleUrls: ['../../blog/blog-shared.component.scss', './blog-section.component.scss']
})
export class BlogSectionComponent {
  private readonly lang = inject(LanguageService).lang();
  readonly t = TEXT[this.lang];
  readonly ui = UI[this.lang];
  readonly categoryCards: CategoryCard[] = getCategoryCards(this.lang);

  readonly topDrankspellen: BlogPost[] = this.lang === 'en' && TOP_DRANKSPELLEN_SLUGS_EN
    ? TOP_DRANKSPELLEN_SLUGS_EN
      .map(slug => postsFor('en').find(p => p.slug === slug))
      .filter((p): p is BlogPost => !!p)
    : TOP_DRANKSPELLEN_SLUGS
      .map(slug => postsFor('nl').find(p => p.slug === slug))
      .filter((p): p is BlogPost => !!p)
      .map(nl => this.lang === 'en' ? postsFor('en').find(p => p.alternate === nl.path) : nl)
      .filter((p): p is BlogPost => !!p);

  // Newest posts that aren't Drankspelletjes (too many single-game posts) or
  // Begrippen (short, image-free glossary entries), mirroring the exclusion
  // already used for the main /blog feed. The newest post leads, so a new blog
  // is always the first card. Then the top 10, the online timer and the adt
  // timer comparison regardless of date, then 4 more by recency.
  readonly latestPosts: BlogPost[] = (() => {
    const eligible = postsFor(this.lang).filter(p => p.category !== 'Drankspelletjes' && p.category !== 'Begrippen');
    const [topList, comparison] = PINNED_SLUGS[this.lang].map(slug => eligible.find(p => p.slug === slug));
    const pinned = [topList, TIMER_CARD[this.lang], comparison].filter((p): p is BlogPost => !!p);
    const [newest, ...rest] = eligible
      .filter(p => !pinned.includes(p))
      .sort((a, b) => b.date.localeCompare(a.date));
    return [newest, ...pinned, ...rest.slice(0, 4)].filter((p): p is BlogPost => !!p);
  })();
}
