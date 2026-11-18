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

// English version of  Styles are shared with the Dutch page.
@Component({
  selector: 'app-chug-machine-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'chug-machine.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/bakmachine/bakmachine.component.scss']
})
export class ChugMachineEnComponent {
  readonly faqTitle = 'Everything about Chug Machine';
  readonly faqs: FaqItem[] = [
    { question: 'What do you need for Chug Machine?', answer: 'A phone with the AnyTimerApp and drinks. That\'s it.' },
    { question: 'What happens if you spin three full mugs twice?', answer: 'Then you get to hand out even more. How much is up to you. Agree on it before you start.' },
    { question: 'What are the odds of having to chug?', answer: 'The chance of three full mugs is 1 in 8. Same for three empty mugs. On average someone downs a drink every four turns.' }
  ];
  readonly faqPromoTitle = 'Play Chug Machine in the app';
  readonly faqPromoText = 'Download the free AnyTimerApp';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'chug-machine')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Chug Machine' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-chug-machine',
      lang: 'en',
      title: 'Chug Machine rules: how to play the drinking game',
      description: 'Chug Machine is a slot machine for chugs in the AnyTimerApp. Spin three reels. Three full mugs? Hand out a chug. Three empty ones? Then you chug yourself.',
      url: 'https://anytimer.app/en/blog/drinking-games/chug-machine/',
      image: 'https://anytimer.app/assets/blogs/drankspel/bakmachine.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Chug Machine', alternateName: ['Bakmachine', 'Chug slot machine'] },
    });
  }
}
