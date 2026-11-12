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

// English version of blogs/drankspelletjes/beerpong. Styles are shared with the Dutch page.
@Component({
  selector: 'app-beer-pong-en',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'beer-pong.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/beerpong/beerpong.component.scss']
})
export class BeerPongEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'beer-pong')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Beer Pong' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-beer-pong',
      lang: 'en',
      title: 'Beer Pong rules: how to play the drinking game',
      description: 'Beer Pong rules explained: setting up the cups, throwing, reracks, bounce shots and islands. Plus variations like flip cup and Rage Cage.',
      url: 'https://anytimer.app/en/blog/drinking-games/beer-pong/',
      image: 'https://anytimer.app/assets/blogs/drankspel/beerpong.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Beer Pong', alternateName: ['Beerpong', 'Beer pong', 'Beruit'] },
    });
  }
}
