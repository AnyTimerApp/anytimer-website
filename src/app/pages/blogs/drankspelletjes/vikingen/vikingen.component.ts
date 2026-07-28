import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS } from '../../../blog/blog-posts.data';

@Component({
  selector: 'app-vikingen',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'vikingen.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', './vikingen.component.scss']
})
export class VikingenComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'vikingen')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Vikingen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Vikingen - Spelregels & Tips | AnyTimerApp';
    const description = 'Vikingen is een drankspel waarbij je steeds moet opletten wie de Viking is. Ontdek de spelregels en tips voor dit snelle reactiespel voor de groep.';
    const image = 'https://anytimer.app/assets/blogs/drankspel/vikingen.png';
    const url = 'https://anytimer.app/blog/drankspelletjes/vikingen/';
    const publishedTime = '2026-07-28';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-vikingen', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: 'Vikingen drankspel met een speler als Viking en twee spelers die roeien' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-vikingen')) {
      const script = document.createElement('script');
      script.id = 'schema-vikingen';
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
