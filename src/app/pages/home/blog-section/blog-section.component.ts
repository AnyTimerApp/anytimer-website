import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../../components/blog-card/blog-card.component';
import { BLOG_POSTS, BlogPost, CategoryCard, getCategoryCards } from '../../blog/blog-posts.data';

// Same order and games as the "Top 10 leukste drankspellen" post (drankspellen.component.html),
// shown in this fixed order rather than sorted by date. Its own #10 ("Bonus: Anytimer's") isn't
// a dedicated game post with its own slug, so it's left out here.
const TOP_DRANKSPELLEN_SLUGS = [
  'mario-barf',
  'trek-je-bak-mania',
  '30-seconds',
  'kingsen',
  'stress-pong',
  'fuck-the-dealer',
  'mexen',
  'bakplaten',
  'de-paardenrace'
];

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [RouterLink, CommonModule, BlogCardComponent],
  templateUrl: './blog-section.component.html',
  styleUrls: ['../../blog/blog-shared.component.scss', './blog-section.component.scss']
})
export class BlogSectionComponent {
  readonly categoryCards: CategoryCard[] = getCategoryCards();

  readonly topDrankspellen: BlogPost[] = TOP_DRANKSPELLEN_SLUGS
    .map(slug => BLOG_POSTS.find(p => p.slug === slug))
    .filter((p): p is BlogPost => !!p);

  // Newest posts that aren't Drankspelletjes (too many single-game posts) or
  // Begrippen (short, image-free glossary entries) — mirrors the exclusion
  // already used for the main /blog feed. The Top 10 drankspellen post is
  // pinned first regardless of date, then the rest fill in by recency.
  readonly latestPosts: BlogPost[] = (() => {
    const eligible = BLOG_POSTS.filter(p => p.category !== 'Drankspelletjes' && p.category !== 'Begrippen');
    const pinned = eligible.find(p => p.slug === 'drankspellen');
    const rest = eligible
      .filter(p => p.slug !== 'drankspellen')
      .sort((a, b) => b.date.localeCompare(a.date));
    return (pinned ? [pinned, ...rest] : rest).slice(0, 5);
  })();
}
