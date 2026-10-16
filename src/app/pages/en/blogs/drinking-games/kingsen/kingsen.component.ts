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

// English version of blogs/drankspelletjes/kingsen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-kingsen-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'kingsen.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/kingsen/kingsen.component.scss']
})
export class KingsenEnComponent {
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
      title: 'Kingsen: Dutch Drinking Game Rules | AnyTimerApp',
      description: 'Kingsen is the Dutch version of Kings Cup. Every card has its own rule. Learn how to play and what every card means in 2 minutes.',
      url: 'https://anytimer.app/en/blog/drinking-games/kingsen/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/kingsen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Kingsen', alternateName: ['Dutch Kings Cup'] },
    });
  }
}
