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

// English version of blogs/drankspelletjes/toepen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-toepen-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'toepen.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/toepen/toepen.component.scss']
})
export class ToepenEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'toepen')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Toepen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-toepen',
      lang: 'en',
      title: 'Toepen rules: how to play the drinking game',
      description: 'Toepen is a Dutch card game where only the last trick counts. Learn the rules: following suit, knocking, folding, dirty laundry and penalty points.',
      url: 'https://anytimer.app/en/blog/drinking-games/toepen/',
      image: 'https://anytimer.app/assets/blogs/drankspel/toepen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Toepen', alternateName: ['Toep', 'Toepen card game'] },
    });
  }
}
