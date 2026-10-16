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

// English version of blogs/drankspelletjes/30-seconds. Styles are shared with the Dutch page.
@Component({
  selector: 'app-30-seconds-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: '30-seconds.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/30-seconds/30-seconds.component.scss']
})
export class ThirtySecondsEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === '30-seconds')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: '30 Seconds' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-30-seconds',
      lang: 'en',
      title: '30 Seconds Drinking Game Rules | AnyTimerApp',
      description: 'Play 30 Seconds as a drinking game. Guess as many words as you can in 30 seconds. Every missed word means a sip. Learn the rules and extra rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/30-seconds/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/30%20seconds.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-24',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
