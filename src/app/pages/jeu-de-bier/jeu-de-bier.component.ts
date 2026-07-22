import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS } from '../blog/blog-posts.data';

@Component({
  selector: 'app-jeu-de-bier',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'jeu-de-bier.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './jeu-de-bier.component.scss']
})
export class JeuDeBierComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'jeu-de-bier')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Jeu de bier' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Jeu de Bier - Spelregels & Tips | AnyTimerApp';
    const description = 'Jeu de bier is jeu de boules voor aan tafel met bierdopjes. Ontdek de spelregels, benodigdheden en leuke drinkvariaties van dit behendigheidsspel.';
    const image = 'https://anytimer.app/assets/blogs/drankspel/jeu%20de%20bier.png';
    const url = 'https://anytimer.app/jeu-de-bier/';
    const publishedTime = '2026-07-22';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-jeu-de-bier', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: 'Jeu de bier drankspel met bierdopjes' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-jeu-de-bier')) {
      const script = document.createElement('script');
      script.id = 'schema-jeu-de-bier';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': image,
        'datePublished': publishedTime,
        'author': { '@type': 'Organization', 'name': 'AnyTimerApp' },
        'mainEntityOfPage': url
      });
      document.head.appendChild(script);
    }
  }
}
