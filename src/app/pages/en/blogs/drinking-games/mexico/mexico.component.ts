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

// English version of blogs/drankspelletjes/mexen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-mexico-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'mexico.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/mexen/mexen.component.scss']
})
export class MexicoEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'mexico')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Mexico' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-mexico',
      lang: 'en',
      title: 'Mexico Dice Game Rules: How to Play | AnyTimerApp',
      description: 'Mexico is a drinking game with two dice. Don\'t throw the lowest roll and hope for a Mexico. Learn the rules and the order of rolls. In Dutch: Mexen.',
      url: 'https://anytimer.app/en/blog/drinking-games/mexico/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/mexen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Mexico', alternateName: ['Mexen', 'Mexican dice game'] },
    });
  }
}
