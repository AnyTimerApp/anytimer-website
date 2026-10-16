import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../../components/blog-card/blog-card.component';
import { BlogPost, CategoryCard, getCategoryCards, postsFor } from '../../blog/blog-posts.data';
import { LanguageService } from '../../../i18n/language.service';
import { Lang } from '../../../i18n/lang';
import { UI } from '../../../i18n/ui';

// Same order and games as the "Top 10 leukste drankspellen" post (drankspellen.component.html),
// shown in this fixed order rather than sorted by date. Its own #10 ("Bonus: Anytimer's") isn't
// a dedicated game post with its own slug, so it's left out here.
const TOP_DRANKSPELLEN_SLUGS: Record<Lang, string[]> = {
  nl: [
    'mario-barf',
    'trek-je-bak-mania',
    '30-seconds',
    'kingsen',
    'stress-pong',
    'fuck-the-dealer',
    'mexen',
    'bakplaten',
    'de-paardenrace'
  ],
  en: [
    'beerio-kart',
    'trek-je-bak-mania',
    '30-seconds',
    'kingsen',
    'rage-cage',
    'fuck-the-dealer',
    'mexico',
    'bakplaten',
    'horse-race'
  ]
};

// Slug of the "Top 10 drankspellen" post, pinned first in the latest posts row.
const TOP_LIST_SLUG: Record<Lang, string> = { nl: 'drankspellen', en: 'best-drinking-games' };

const TEXT = {
  nl: {
    title: 'We delen ook al onze kennis',
    intro: 'We delen alleen drankspellen die we zelf spelen en echt leuk vinden. Ook schrijven we artikelen vol inspiratie, bijvoorbeeld voor een leuke avond met vrienden. Daarnaast maakten we een begrippenwoordenboek met de bekendste studentenbegrippen. En af en toe delen we een interessant weetje. Zo vind je alles op één plek.',
    favourites: 'Onze favoriete drankspellen',
    latest: 'Onze laatste blogs'
  },
  en: {
    title: 'We share everything we know',
    intro: 'We only share drinking games we play ourselves and really enjoy. We also write articles full of ideas, like how to have a great night with friends. And we explain the Dutch student slang you hear everywhere in the Netherlands. Every now and then we share a fun fact too.',
    favourites: 'Our favourite drinking games',
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

  readonly topDrankspellen: BlogPost[] = TOP_DRANKSPELLEN_SLUGS[this.lang]
    .map(slug => postsFor(this.lang).find(p => p.slug === slug))
    .filter((p): p is BlogPost => !!p);

  // Newest posts that aren't Drankspelletjes (too many single-game posts) or
  // Begrippen (short, image-free glossary entries) — mirrors the exclusion
  // already used for the main /blog feed. The Top 10 drankspellen post is
  // pinned first regardless of date, then the rest fill in by recency.
  readonly latestPosts: BlogPost[] = (() => {
    const eligible = postsFor(this.lang).filter(p => p.category !== 'Drankspelletjes' && p.category !== 'Begrippen');
    const pinned = eligible.find(p => p.slug === TOP_LIST_SLUG[this.lang]);
    const rest = eligible
      .filter(p => p !== pinned)
      .sort((a, b) => b.date.localeCompare(a.date));
    return (pinned ? [pinned, ...rest] : rest).slice(0, 5);
  })();
}
