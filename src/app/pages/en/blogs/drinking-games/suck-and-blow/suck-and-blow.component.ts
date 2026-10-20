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

// English version of blogs/drankspelletjes/kusje-geven. Styles are shared with the Dutch page.
@Component({
  selector: 'app-suck-and-blow-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'suck-and-blow.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/kusje-geven/kusje-geven.component.scss']
})
export class SuckAndBlowEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'suck-and-blow')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Suck and Blow' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-suck-and-blow',
      lang: 'en',
      title: 'Suck and Blow rules: how to play the drinking game',
      description: 'Suck and Blow is a party drinking game with one playing card. Pass the card around with your mouth and don\'t drop it. Learn the rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/suck-and-blow/',
      image: 'https://anytimer.app/assets/blogs/drankspel/kusje%20geven.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-28',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Suck and Blow', alternateName: ['Kusje geven'] },
    });
  }
}
