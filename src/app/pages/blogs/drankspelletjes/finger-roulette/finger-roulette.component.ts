import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS, getPostsBySlug, getRecommendedGames } from '../../../blog/blog-posts.data';

@Component({
  selector: 'app-finger-roulette',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'finger-roulette.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './finger-roulette.component.scss']
})
export class FingerRouletteComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'finger-roulette')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  // Hand-picked: the other app games plus Krokodillenspel.
  readonly similarGames = getPostsBySlug(['bakplaten', 'boze-bak', 'krokodillenspel']);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Finger roulette' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Finger roulette - Spelregels & Tips | AnyTimerApp';
    const description = 'Finger roulette speel je op je telefoon. Iedereen legt een vinger op het scherm en de telefoon kiest er één. Lees de spelregels en speel het in de app.';
    const image = 'https://anytimer.app/assets/blogs/drankspel/finger%20roulette.png';
    const url = 'https://anytimer.app/blog/drankspelletjes/finger-roulette/';
    const publishedTime = '2026-10-13';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-finger-roulette', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:width', content: '1536' });
    meta.updateTag({ property: 'og:image:height', content: '1024' });
    meta.updateTag({ property: 'og:image:alt', content: 'Vrienden spelen Finger roulette met hun vingers op het scherm van een telefoon' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-finger-roulette')) {
      const script = document.createElement('script');
      script.id = 'schema-finger-roulette';
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
