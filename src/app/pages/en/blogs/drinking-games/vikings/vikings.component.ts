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

// English version of blogs/drankspelletjes/vikingen. Styles are shared with the Dutch page.
@Component({
  selector: 'app-vikings-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'vikings.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/vikingen/vikingen.component.scss']
})
export class VikingsEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'vikings')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Vikings' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-vikings',
      lang: 'en',
      title: 'Vikings rules: how to play the drinking game',
      description: 'Vikings is a drinking game where everyone has to pay attention. One player is the Viking, the neighbours row and the rest are the sea. Learn the rules.',
      url: 'https://anytimer.app/en/blog/drinking-games/vikings/',
      image: 'https://anytimer.app/assets/blogs/drankspel/vikingen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-28',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Vikings', alternateName: ['Viking drinking game', 'Vikingen'] },
    });
  }
}
