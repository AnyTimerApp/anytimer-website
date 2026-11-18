import { AboutComponent, FaqItem } from '../../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { BLOG_POSTS_EN } from '../../../../blog/blog-posts.en.data';
import { getSimilarGames, getRecommendedGames } from '../../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../../components/slider-nav/slider-nav.component';

// English version of blogs/drankspelletjes/mexen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-mexico-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'mexico.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/mexen/mexen.component.scss']
})
export class MexicoEnComponent {
  readonly faqTitle = 'Everything about Mexico';
  readonly faqs: FaqItem[] = [
    { question: 'What is a Mexico?', answer: 'A Mexico is a roll of a 2 and a 1. You read it as 21. It is the highest roll in the game and the penalty doubles.' },
    { question: 'What is the order of the rolls?', answer: 'First the Mexico (21). Then the doubles from 66 down to 11. After that the normal rolls from 65 down to 31.' },
    { question: 'Can you play Mexico online?', answer: 'Yes. Mexico is in the free AnyTimerApp. You don\'t need any dice.' }
  ];
  readonly faqPromoTitle = 'Play Mexico in the app';
  readonly faqPromoText = 'Download the free AnyTimerApp';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'mexico')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Mexico' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-mexico',
      lang: 'en',
      title: 'Mexico rules: how to play the drinking game',
      description: 'Mexico is a drinking game with two dice. Don\'t throw the lowest roll and hope for a Mexico. Learn the rules and the order of rolls. In Dutch: Mexen.',
      url: 'https://anytimer.app/en/blog/drinking-games/mexico/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/mexen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Mexico', alternateName: ['Mexen', 'Mexican dice game'] },
    });
  }
}
