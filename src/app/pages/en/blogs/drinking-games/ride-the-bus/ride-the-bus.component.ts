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

// English version of blogs/drankspelletjes/bussen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-ride-the-bus-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'ride-the-bus.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/bussen/bussen.component.scss']
})
export class RideTheBusEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'ride-the-bus')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Ride the Bus' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-ride-the-bus',
      lang: 'en',
      title: 'Ride the Bus rules: how to play the drinking game',
      description: 'Ride the Bus is a card drinking game with four rounds, a pyramid and the bus. Learn the rules, the sips per round and the Dutch version Bussen.',
      url: 'https://anytimer.app/en/blog/drinking-games/ride-the-bus/',
      image: 'https://anytimer.app/assets/blogs/drankspel/bussen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-28',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Ride the Bus', alternateName: ['Bussen'] },
    });
  }
}
