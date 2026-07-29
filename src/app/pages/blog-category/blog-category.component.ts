import { Component, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BLOG_POSTS, CATEGORY_SLUGS, BlogCategory, BlogPost, DRANKSPEL_SUBCATEGORIES, DrankspelSubCategory } from '../blog/blog-posts.data';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

const CATEGORY_META: Record<BlogCategory, { title: string; description: string; intro: string; heading?: string }> = {
  Begrippen: {
    title: 'Anytimer Begrippen Uitgelegd | AnyTimerApp',
    description: 'Wat is een anytimer en wat is een adtje? Ontdek alle anytimer-begrippen met duidelijke uitleg en voorbeelden. Nooit meer twijfelen over de termen.',
    intro: 'Alle anytimer-begrippen helder uitgelegd. Van wat een anytimer precies is tot de betekenis van een adtje: hier vind je duidelijke antwoorden op elke term.'
  },
  Inspiratie: {
    title: 'Inspiratie voor een Leuke Avond | AnyTimerApp',
    description: 'Op zoek naar inspiratie voor een toffe avond? Ontdek drankspellen, huisavondideeën en de beste adt timer. Alles voor een gezellige avond met vrienden.',
    intro: 'Op zoek naar inspiratie voor een toffe avond met vrienden? Ontdek onze drankspellen, huisavondideeën en tips om er samen een onvergetelijke avond van te maken.'
  },
  Weetjes: {
    title: 'Anytimer Weetjes & Regels | AnyTimerApp',
    description: 'Handige weetjes over anytimers: mag je een anytimer weigeren, hoe houd je ze het beste bij en welke regels gelden er? Alle tips op een rij.',
    intro: 'Praktische weetjes en regels rond anytimers. Van of je een anytimer mag weigeren tot de beste manier om ze bij te houden: hier vind je de antwoorden.'
  },
  Drankspelletjes: {
    title: 'Drankspelletjes: Spelregels & Tips | AnyTimerApp',
    description: 'Ontdek onze drankspelletjes met alle spelregels, benodigdheden en tips. Van Jeu de bier tot nieuwe toevoegingen. Altijd een leuk drankspel bij de hand.',
    heading: 'De leukste drankspellen',
    intro: 'Op zoek naar leuke drankspellen voor een avond met vrienden? Dit zijn onze favorieten. Hier vind je niet elk drankspel dat bestaat. Maar alleen de leuke spellen. Bij elk spel vind je de regels, benodigdheden en tips.'
  }
};

@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbsComponent],
  templateUrl: './blog-category.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', '../blog/blog-shared.component.scss']
})
export class BlogCategoryComponent {
  category: BlogCategory;
  meta: { title: string; description: string; intro: string; heading?: string };
  posts: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
  // Only shown for the Drankspelletjes category — other categories have no subCategory to filter by.
  subCategories: readonly DrankspelSubCategory[] | null = null;
  activeFilter: DrankspelSubCategory | null = null;

  get sortedPosts(): BlogPost[] {
    return [...this.posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  get featuredPost(): BlogPost {
    return this.sortedPosts[0];
  }

  get otherPosts(): BlogPost[] {
    const rest = this.sortedPosts.slice(1);
    if (this.activeFilter) {
      return rest.filter(p => p.subCategory === this.activeFilter);
    }
    return rest;
  }

  toggleFilter(sub: DrankspelSubCategory) {
    this.activeFilter = this.activeFilter === sub ? null : sub;
  }

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    this.category = route.snapshot.data['category'] as BlogCategory;
    this.meta = CATEGORY_META[this.category];
    this.posts = BLOG_POSTS.filter(p => p.category === this.category);
    this.subCategories = this.category === 'Drankspelletjes' ? DRANKSPEL_SUBCATEGORIES : null;
    this.breadcrumbs = [
      { label: 'Blog', url: '/blog' },
      { label: this.category }
    ];

    const firstPost = this.sortedPosts[0];
    const title = this.meta.title;
    const description = this.meta.description;
    const image = `https://anytimer.app/${encodeURI(firstPost.image)}`;
    const slug = CATEGORY_SLUGS[this.category];
    const url = `https://anytimer.app/blog/${slug}/`;

    injectBreadcrumbSchema(document, `schema-breadcrumbs-${slug}`, this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: firstPost.imageAlt });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    const schemaId = `schema-collection-${slug}`;
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
          'itemListElement': this.sortedPosts.map((post, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'url': `https://anytimer.app/${post.path}/`,
            'name': post.title
          }))
        }
      });
      document.head.appendChild(script);
    }
  }
}
