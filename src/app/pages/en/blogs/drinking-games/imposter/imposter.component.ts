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
  selector: 'app-imposter-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'imposter.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/imposter/imposter.component.scss']
})
export class ImposterEnComponent {
  readonly faqTitle = 'Everything about the imposter game';
  readonly faqs: FaqItem[] = [
    { question: 'How many players do you need for Imposter?', answer: 'At least 3 and up to 16 players. It\'s most fun with 5 to 10.' },
    { question: 'How many imposters should you pick?', answer: 'With 3 to 7 players, 1 imposter is enough. From 8 players you can pick 2. The maximum depends on the number of players.' },
    { question: 'Does the imposter get a hint?', answer: 'You choose before the game starts. With a hint the imposter can bluff along more easily. Without a hint it\'s harder for them.' },
    { question: 'What if the imposter guesses the word?', answer: 'Is the imposter caught, but do they guess the secret word afterwards? Then they still win.' }
  ];
  readonly faqPromoTitle = 'Play Imposter in the app';
  readonly faqPromoText = 'Download the free AnyTimerApp';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'imposter')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Imposter' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-imposter',
      lang: 'en',
      title: 'Imposter game rules: how to play the drinking game',
      description: 'Imposter game rules: everyone gets the same secret word except the imposter. Take turns giving a hint and unmask the bluffer before they guess it.',
      url: 'https://anytimer.app/en/blog/drinking-games/imposter/',
      image: 'https://anytimer.app/assets/blogs/drankspel/imposter.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Imposter', alternateName: ['Imposter game', 'Who is the imposter', 'Word imposter'] },
    });
  }
}
