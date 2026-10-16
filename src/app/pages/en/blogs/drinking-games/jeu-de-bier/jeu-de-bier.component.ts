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

// English version of blogs/drankspelletjes/jeu-de-bier. Styles are shared with the Dutch page.
@Component({
  selector: 'app-jeu-de-bier-en',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'jeu-de-bier.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/jeu-de-bier/jeu-de-bier.component.scss']
})
export class JeuDeBierEnComponent {
  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'jeu-de-bier')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Jeu de bier' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-jeu-de-bier',
      lang: 'en',
      title: 'Jeu de Bier: Dutch Drinking Game Rules | AnyTimerApp',
      description: 'Jeu de bier is a Dutch drinking game with beer caps. Think pétanque, but on a table. Learn the rules and fun extra rules in 2 minutes.',
      url: 'https://anytimer.app/en/blog/drinking-games/jeu-de-bier/',
      image: 'https://anytimer.app/assets/blogs/drankspel/jeu%20de%20bier.png',
      imageAlt: this.post.imageAlt,
      published: '2026-07-22',
      breadcrumbs: this.breadcrumbs,
    });
  }
}
