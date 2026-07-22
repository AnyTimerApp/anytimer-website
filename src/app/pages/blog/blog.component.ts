import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BLOG_POSTS, CATEGORY_SLUGS, BlogCategory, BlogPost } from './blog-posts.data';

export interface CategoryCard {
  category: BlogCategory;
  slug: string;
  count: number;
  blurb: string;
  variant: 'light' | 'blue' | 'dark' | 'accent';
}

// Display order for the category cards row (independent of BLOG_CATEGORIES' canonical order).
const CARD_ORDER: BlogCategory[] = ['Drankspelletjes', 'Inspiratie', 'Begrippen', 'Weetjes'];

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

  get featuredPost(): BlogPost {
    return this.sortedPosts.find(p => p.category !== 'Drankspelletjes') ?? this.sortedPosts[0];
  }

  get otherPosts(): BlogPost[] {
    return this.sortedPosts.filter(p => p !== this.featuredPost && p.category !== 'Drankspelletjes');
  }

  get categoryCards(): CategoryCard[] {
    return CARD_ORDER.map(category => ({
      category,
      slug: CATEGORY_SLUGS[category],
      count: this.posts.filter(p => p.category === category).length,
      blurb: CATEGORY_BLURBS[category],
      variant: CATEGORY_VARIANTS[category]
    }));
  }

  constructor(meta: Meta) {
    const title = 'Anytimer Blog - Tips, Ideeën & Gidsen | Anytimer App';
    const description = 'Lees onze blog met tips, ideeën en gidsen voor anytimers. Ontdek hoe je het meest uit je anytimers haalt en creëer meer plezier met je vrienden.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/blog/';

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
  }
}
