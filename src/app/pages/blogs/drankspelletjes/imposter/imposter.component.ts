import { AboutComponent, FaqItem } from '../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, getSimilarGames, getRecommendedGames } from '../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';

@Component({
  selector: 'app-imposter',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'imposter.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './imposter.component.scss']
})
export class ImposterComponent {
  readonly faqTitle = 'Alles over het imposter spel';
  readonly faqs: FaqItem[] = [
    { question: 'Met hoeveel spelers speel je imposter?', answer: 'Met minimaal 3 en maximaal 16 spelers. Met 5 tot 10 spelers is het het leukst.' },
    { question: 'Hoeveel imposters kies je?', answer: 'Met 3 tot 7 spelers is 1 imposter genoeg. Vanaf 8 spelers kun je er 2 kiezen. Hoeveel er maximaal mogen, hangt af van het aantal spelers.' },
    { question: 'Krijgt de imposter een hint?', answer: 'Dat kies je zelf voordat het spel begint. Met een hint kan de imposter beter meebluffen. Zonder hint is het moeilijker voor hem.' },
    { question: 'Wat als de imposter het woord raadt?', answer: 'Wordt de imposter aangewezen, maar raadt hij daarna het geheime woord? Dan wint hij alsnog.' }
  ];
  readonly faqPromoTitle = 'Speel Imposter in de app';
  readonly faqPromoText = 'Download de gratis AnyTimerApp';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'imposter')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Imposter' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'imposter',
      lang: 'nl',
      title: 'Imposter spel regels: zo speel je het drankspel',
      description: 'Imposter spel regels: iedereen krijgt hetzelfde geheime woord behalve de imposter. Geef om de beurt een hint en ontmasker de bluffer.',
      url: 'https://anytimer.app/blog/drankspelletjes/imposter/',
      image: 'https://anytimer.app/assets/blogs/drankspel/imposter.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Imposter', alternateName: ['Imposter game', 'Wie is de imposter'] }
    });
  }
}
