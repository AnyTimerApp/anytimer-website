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

// English version of blogs/drankspelletjes/stress-pong. Styles are shared with the Dutch page.
@Component({
  selector: 'app-rage-cage-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'rage-cage.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/stress-pong/stress-pong.component.scss']
})
export class RageCageEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'rage-cage')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Rage Cage' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-rage-cage',
      lang: 'en',
      title: 'Rage Cage Rules: How to Play Stack Cup | AnyTimerApp',
      description: 'Rage Cage, also called Stack Cup or Stress Pong, is a fast beer pong game with two cups going round. Get stacked and you drink. Learn the rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/rage-cage/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/stress%20pong.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Rage Cage', alternateName: ['Stack Cup', 'Stress Pong'] },
    });
  }
}
