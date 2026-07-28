import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS } from '../../../blog/blog-posts.data';

@Component({
  selector: 'app-ring-of-fire',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: 'ring-of-fire.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './ring-of-fire.component.scss']
})
export class RingOfFireComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'ring-of-fire')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Ring of fire' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Ring of fire - Spelregels & Tips | AnyTimerApp';
    const description = 'Ring of fire is de internationale variant van Kingsen. Ontdek de spelregels, kaartbetekenissen en tips voor dit populaire kaartspel als drankspel.';
    const image = 'https://anytimer.app/assets/blogs/drankspel/ring%20of%20fire.png';
    const url = 'https://anytimer.app/blog/drankspelletjes/ring-of-fire/';
    const publishedTime = '2026-07-28';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-ring-of-fire', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: 'Ring of fire drankspel met kaarten in een ring rond een glas' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-ring-of-fire')) {
      const script = document.createElement('script');
      script.id = 'schema-ring-of-fire';
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
