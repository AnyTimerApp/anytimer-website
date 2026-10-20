import { Component, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { CATEGORY_DISPLAY_ORDER, CategoryCard, getCategoryCards, BlogPost, postsFor } from './blog-posts.data';
import { Lang } from '../../i18n/lang';
import { UI, UiStrings } from '../../i18n/ui';
import { injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog-shared.component.scss', './blog.component.scss']
})
export class BlogComponent {
  lang: Lang;
  ui: UiStrings;
  posts: BlogPost[];

  get sortedPosts(): BlogPost[] {
    return [...this.posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  // Drankspelletjes and Begrippen posts never show up as individual articles
  // here — Drankspelletjes because there are too many single-game posts to
  // list, Begrippen because those are short, image-free glossary entries.
  // Both stay reachable only through their own category hub. Exception: the
  // two original, full-length Begrippen articles (with their own images)
  // still belong on the main feed like any other article.
  private readonly LISTABLE_BEGRIPPEN_EXCEPTIONS = ['wat-is-een-anytimer', 'wat-is-een-adtje', 'what-is-an-anytimer', 'what-is-an-adtje'];

  private isListable(post: BlogPost): boolean {
    if (post.category === 'Drankspelletjes') return false;
    if (post.category === 'Begrippen') return this.LISTABLE_BEGRIPPEN_EXCEPTIONS.includes(post.slug);
    return true;
  }

  get featuredPost(): BlogPost {
    return this.sortedPosts.find(p => this.isListable(p)) ?? this.sortedPosts[0];
  }

  get otherPosts(): BlogPost[] {
    return this.sortedPosts.filter(p => p !== this.featuredPost && this.isListable(p));
  }

  labelOf(post: BlogPost): string {
    return post.subCategory ? this.ui.subCategoryLabels[post.subCategory] : this.ui.categoryLabels[post.category];
  }

  get categoryCards(): CategoryCard[] {
    return getCategoryCards(this.lang);
  }

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    this.lang = (route.snapshot.data['lang'] as Lang) ?? 'nl';
    this.ui = UI[this.lang];
    this.posts = postsFor(this.lang);

    const en = this.lang === 'en';
    const title = en
      ? 'AnyTimerApp blog: drinking games, slang and tips'
      : 'Blog van AnyTimerApp: drankspellen, begrippen en tips';
    const description = en
      ? 'Read our blog with drinking game rules, ideas for a fun night and everything about anytimers. Plus the Dutch student slang you hear in the Netherlands.'
      : 'Lees onze blog met tips, ideeën en gidsen voor anytimers. Ontdek hoe je het meest uit je anytimers haalt en creëer meer plezier met je vrienden.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = `https://anytimer.app${this.ui.paths.blog}/`;

    injectBreadcrumbSchema(document, `schema-breadcrumbs-blog-${this.lang}`, [{ label: 'Blog' }]);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:width', content: '1920' });
    meta.updateTag({ property: 'og:image:height', content: '1080' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    const schemaId = `schema-collection-blog-${this.lang}`;
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': title,
        'description': description,
        'url': url,
        'inLanguage': this.lang,
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': CATEGORY_DISPLAY_ORDER.map((category, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'url': `https://anytimer.app${this.ui.paths.blog}/${this.ui.categorySlugs[category]}/`,
            'name': this.ui.categoryLabels[category]
          }))
        }
      });
      document.head.appendChild(script);
    }
  }
}
