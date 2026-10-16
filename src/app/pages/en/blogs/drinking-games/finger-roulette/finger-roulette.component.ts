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

// English version of blogs/drankspelletjes/finger-roulette. Styles are shared with the Dutch page.
@Component({
  selector: 'app-finger-roulette-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'finger-roulette.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/finger-roulette/finger-roulette.component.scss']
})
export class FingerRouletteEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'finger-roulette')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getPostsBySlug(['bakplaten', 'angry-mug', 'crocodile-dentist'], 'en');
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Finger Roulette' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-finger-roulette',
      lang: 'en',
      title: 'Finger Roulette Rules: Play in the App | AnyTimerApp',
      description: 'Finger Roulette is a quick game you play on your phone. Everyone puts a finger on the screen and the phone picks one. Free in the AnyTimerApp.',
      url: 'https://anytimer.app/en/blog/drinking-games/finger-roulette/',
      image: 'https://anytimer.app/assets/blogs/drankspel/finger%20roulette.png',
      imageAlt: this.post.imageAlt,
      published: '2026-10-13',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
