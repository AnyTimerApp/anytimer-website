import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS } from '../../../blog/blog-posts.data';

@Component({
  selector: 'app-bakplaten',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: 'bakplaten.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './bakplaten.component.scss']
})
export class BakplatenComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'bakplaten')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Bakplaten' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Bakplaten - Spelregels & Tips | AnyTimerApp';
    const description = 'Bakplaten is een heel simpel kaartspel. Trek een plaatje en drink een bak. Ontdek de spelregels en variaties.';
    const image = 'https://anytimer.app/assets/blogs/drankspellen/bakplaten.png';
    const url = 'https://anytimer.app/blog/drankspelletjes/bakplaten/';
    const publishedTime = '2026-07-24';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-bakplaten', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: 'Bakplaten kaartspel als simpel drankspel' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-bakplaten')) {
      const script = document.createElement('script');
      script.id = 'schema-bakplaten';
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
