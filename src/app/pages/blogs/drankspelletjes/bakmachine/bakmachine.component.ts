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
  selector: 'app-bakmachine',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'bakmachine.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './bakmachine.component.scss']
})
export class BakmachineComponent {
  readonly faqTitle = 'Alles over Bakmachine';
  readonly faqs: FaqItem[] = [
    { question: 'Wat heb je nodig voor Bakmachine?', answer: 'Een telefoon met de AnyTimerApp en drank. Meer niet.' },
    { question: 'Wat gebeurt er als je twee keer drie volle bakken draait?', answer: 'Dan mag je nog meer uitdelen. Hoeveel dat is, bepalen jullie zelf. Spreek het af voordat je begint.' },
    { question: 'Hoe groot is de kans op een bak?', answer: 'De kans op drie volle bakken is 1 op 8. De kans op drie lege bakken ook. Gemiddeld is er om de vier beurten iemand die een bak trekt.' }
  ];
  readonly faqPromoTitle = 'Speel Bakmachine in de app';
  readonly faqPromoText = 'Download de gratis AnyTimerApp';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'bakmachine')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Bakmachine' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'bakmachine',
      lang: 'nl',
      title: 'Bakmachine regels: zo speel je het drankspel',
      description: 'Bakmachine is een gokkast voor bakken in de AnyTimerApp. Draai drie wielen. Drie volle bakken? Deel er een uit. Drie lege? Dan trek je zelf een bak.',
      url: 'https://anytimer.app/blog/drankspelletjes/bakmachine/',
      image: 'https://anytimer.app/assets/blogs/drankspel/bakmachine.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Bakmachine', alternateName: ['Bak machine', 'Bakken gokkast'] }
    });
  }
}
