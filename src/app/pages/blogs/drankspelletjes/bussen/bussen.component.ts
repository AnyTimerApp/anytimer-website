import { AboutComponent, FaqItem } from '../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS, getSimilarGames, getRecommendedGames } from '../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';

@Component({
  selector: 'app-bussen',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'bussen.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './bussen.component.scss']
})
export class BussenComponent {
  readonly faqTitle = 'Alles over bussen';
  readonly faqs: FaqItem[] = [
    { question: 'Hoe gaat het drankspel bussen?', answer: 'Je speelt vier rondes waarin je raadt: rood of zwart, hoger of lager, binnen of buiten en dezelfde kleur of niet. Daarna legt de deler een piramide van 15 kaarten. Wie aan het einde de meeste kaarten over heeft, gaat de bus in.' },
    { question: 'Wat is de bus bij bussen?', answer: 'De bus is de laatste ronde. Er liggen 8 open kaarten op een rij. De speler in de bus raadt steeds hoger of lager en begint opnieuw bij elke fout.' },
    { question: 'Met hoeveel mensen speel je bussen?', answer: 'Bussen speel je met 2 tot 8 spelers. Met meer mensen heb je een tweede kaartspel nodig, anders is de stapel te snel op.' }
  ];
  readonly faqPromoTitle = 'Meer drankspelletjes?';
  readonly faqPromoText = 'Bekijk alle drankspellen met spelregels';
  readonly faqPromoLink = '/blog/drankspelletjes';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'bussen')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Bussen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Bussen regels: zo speel je het drankspel';
    const description = 'Bussen is een kaartspel met meerdere rondes en een piramide. Ontdek de spelregels, slokverdeling en tips voor deze drankspel klassieker.';
    const image = 'https://anytimer.app/assets/blogs/drankspel/bussen.png';
    const url = 'https://anytimer.app/blog/drankspelletjes/bussen/';
    const publishedTime = '2026-07-28';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-bussen', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:width', content: '1536' });
    meta.updateTag({ property: 'og:image:height', content: '1024' });
    meta.updateTag({ property: 'og:image:alt', content: 'Bussen kaartspel met de piramide en de kaarten voor de bus' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-bussen')) {
      const script = document.createElement('script');
      script.id = 'schema-bussen';
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
