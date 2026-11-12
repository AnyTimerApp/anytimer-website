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

// English version of blogs/drankspelletjes/jenga. Styles are shared with the Dutch page.
@Component({
  selector: 'app-drunk-jenga-en',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drunk-jenga.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/jenga/jenga.component.scss']
})
export class DrunkJengaEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'drunk-jenga')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Drunk Jenga' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-drunk-jenga',
      lang: 'en',
      title: 'Drunk Jenga rules: how to play the drinking game',
      description: 'Drunk Jenga is Jenga with a task on every block. Pull a block and do what it says. Knock the tower over and you down your drink. Learn the rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/drunk-jenga/',
      image: 'https://anytimer.app/assets/blogs/drankspel/jenga.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-04',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Drunk Jenga', alternateName: ['Drinking Jenga', 'Jenga drankspel'] },
    });
  }
}
