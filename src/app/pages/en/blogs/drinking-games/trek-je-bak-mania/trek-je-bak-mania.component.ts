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

// English version of blogs/drankspelletjes/trek-je-bak-mania. Styles are shared with the Dutch page.
@Component({
  selector: 'app-trek-je-bak-mania-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'trek-je-bak-mania.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/trek-je-bak-mania/trek-je-bak-mania.component.scss']
})
export class TrekJeBakManiaEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'trek-je-bak-mania')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Trek je Bak Mania' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-trek-je-bak-mania',
      lang: 'en',
      title: 'Trek je Bak Mania: Dutch Trackmania Drinking Game | AnyTimerApp',
      description: 'Trek je Bak Mania is the Dutch Trackmania drinking game. Everyone drives the same track and the slowest driver downs a drink. Learn the rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/trek-je-bak-mania/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/trek%20je%20bak%20mania.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Trek je Bak Mania', alternateName: ['Trackmania drinking game'] },
    });
  }
}
