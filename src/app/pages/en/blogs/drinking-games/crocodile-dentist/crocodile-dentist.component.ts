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

// English version of blogs/drankspelletjes/krokodillenspel. Styles are shared with the Dutch page.
@Component({
  selector: 'app-crocodile-dentist-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'crocodile-dentist.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/krokodillenspel/krokodillenspel.component.scss']
})
export class CrocodileDentistEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'crocodile-dentist')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Crocodile Dentist drinking game' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-crocodile-dentist',
      lang: 'en',
      title: 'Crocodile Dentist Drinking Game Rules | AnyTimerApp',
      description: 'Play Crocodile Dentist as a drinking game. Press a tooth and hope the jaw stays open. Snap? You drink. Learn the rules and extra rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/crocodile-dentist/',
      image: 'https://anytimer.app/assets/blogs/drankspel/krokodil.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-28',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Crocodile Dentist', alternateName: ['Krokodillenspel', 'Krokodil met Kiespijn'] },
    });
  }
}
