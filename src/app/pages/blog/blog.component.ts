import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BLOG_POSTS, CATEGORY_SLUGS, CATEGORY_DISPLAY_ORDER, BlogCategory, BlogPost } from './blog-posts.data';
import { injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

export interface CategoryCard {
  category: BlogCategory;
  slug: string;
  count: number;
  blurb: string;
  variant: 'light' | 'blue' | 'dark' | 'accent';
}

const CATEGORY_VARIANTS: Record<BlogCategory, 'light' | 'blue' | 'dark' | 'accent'> = {
  Begrippen: 'light',
  Inspiratie: 'light',
  Weetjes: 'light',
  Drankspelletjes: 'light'
};

const CATEGORY_BLURBS: Record<BlogCategory, string> = {
  Begrippen: 'Duidelijke uitleg van anytimer-begrippen.',
  Inspiratie: 'Ideeën voor een leuke avond met vrienden.',
  Weetjes: 'Handige tips en regels op een rij.',
  Drankspelletjes: 'Alle drankspelletjes uitgelicht.'
};

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog-shared.component.scss', './blog.component.scss']
})
export class BlogComponent {
  posts: BlogPost[] = BLOG_POSTS;

  get sortedPosts(): BlogPost[] {
    return [...this.posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  // Drankspelletjes and Begrippen posts never show up as individual articles
  // here — Drankspelletjes because there are too many single-game posts to
  // list, Begrippen because those are short, image-free glossary entries.
  // Both stay reachable only through their own category hub. Exception: the
  // two original, full-length Begrippen articles (with their own images)
  // still belong on the main feed like any other article.
  private readonly LISTABLE_BEGRIPPEN_EXCEPTIONS = ['wat-is-een-anytimer', 'wat-is-een-adtje'];

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

  get categoryCards(): CategoryCard[] {
    return CATEGORY_DISPLAY_ORDER.map(category => ({
      category,
      slug: CATEGORY_SLUGS[category],
      count: this.posts.filter(p => p.category === category).length,
      blurb: CATEGORY_BLURBS[category],
      variant: CATEGORY_VARIANTS[category]
    }));
  }

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Anytimer Blog - Tips, Ideeën & Gidsen | Anytimer App';
    const description = 'Lees onze blog met tips, ideeën en gidsen voor anytimers. Ontdek hoe je het meest uit je anytimers haalt en creëer meer plezier met je vrienden.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/blog/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-blog', [{ label: 'Blog' }]);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    const schemaId = 'schema-collection-blog';
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
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': CATEGORY_DISPLAY_ORDER.map((category, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'url': `https://anytimer.app/blog/${CATEGORY_SLUGS[category]}/`,
            'name': category
          }))
        }
      });
      document.head.appendChild(script);
    }
  }
}
