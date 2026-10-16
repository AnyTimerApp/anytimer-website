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
import { getPostsBySlug, getRecommendedGames } from '../../../../blog/blog-posts.data';

// English version of blogs/drankspelletjes/boze-bak. Styles are shared with the Dutch page.
@Component({
  selector: 'app-angry-mug-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'angry-mug.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/boze-bak/boze-bak.component.scss']
})
export class AngryMugEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'angry-mug')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getPostsBySlug(['bakplaten', 'finger-roulette', 'crocodile-dentist'], 'en');
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Angry Mug' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-angry-mug',
      lang: 'en',
      title: 'Angry Mug Rules: Play in the App | AnyTimerApp',
      description: 'Angry Mug is an exciting game of luck on your phone. Tap the happy mugs but watch out for the angry one. Free to play in the AnyTimerApp.',
      url: 'https://anytimer.app/en/blog/drinking-games/angry-mug/',
      image: 'https://anytimer.app/assets/blogs/drankspel/bozebak.png',
      imageAlt: this.post.imageAlt,
      published: '2026-10-13',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Angry Mug', alternateName: ['Boze bak'] },
    });
  }
}
