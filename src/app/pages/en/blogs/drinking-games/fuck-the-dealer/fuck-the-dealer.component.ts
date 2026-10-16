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

// English version of blogs/drankspelletjes/fuck-the-dealer. Styles are shared with the Dutch page.
@Component({
  selector: 'app-fuck-the-dealer-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'fuck-the-dealer.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/fuck-the-dealer/fuck-the-dealer.component.scss']
})
export class FuckTheDealerEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'fuck-the-dealer')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Fuck the Dealer' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-fuck-the-dealer',
      lang: 'en',
      title: 'Fuck the Dealer Rules: How to Play | AnyTimerApp',
      description: 'Fuck the Dealer is a card drinking game where everyone tries to beat the dealer by guessing the next card. Learn the rules in 2 minutes.',
      url: 'https://anytimer.app/en/blog/drinking-games/fuck-the-dealer/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/fuck%20the%20dealer.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
