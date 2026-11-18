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

// English version of blogs/drankspelletjes/kingsen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-kingsen-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'kingsen.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/kingsen/kingsen.component.scss']
})
export class KingsenEnComponent {
  readonly faqTitle = 'Everything about Kingsen';
  readonly faqs: FaqItem[] = [
    { question: 'What do you need for Kingsen?', answer: 'A normal deck of 52 cards, a big glass for the middle and drinks for everyone. That is all.' },
    { question: 'What happens with the fourth king?', answer: 'Whoever draws the fourth king drinks the glass in the middle. Then the game is over.' },
    { question: 'What is the difference between Kingsen and Ring of Fire?', answer: 'It is the same idea. Kingsen is the Dutch version, with its own rule for almost every card.' }
  ];
  readonly faqPromoTitle = 'More drinking games?';
  readonly faqPromoText = 'See all drinking games and their rules';
  readonly faqPromoLink = '/en/blog/drinking-games';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'kingsen')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Kingsen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-kingsen',
      lang: 'en',
      title: 'Kingsen rules: how to play the drinking game',
      description: 'Kingsen rules: what every card means, from ace to king. The Dutch version of Kings Cup. Whoever draws the fourth king drinks the glass in the middle.',
      url: 'https://anytimer.app/en/blog/drinking-games/kingsen/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/kingsen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Kingsen', alternateName: ['Dutch Kings Cup'] },
    });
  }
}
