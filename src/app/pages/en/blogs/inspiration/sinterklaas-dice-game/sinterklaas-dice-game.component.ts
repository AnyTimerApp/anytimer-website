import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { getRecommendedGamesForPost, getRecommendedPosts, getPostsBySlug } from '../../../../../pages/blog/blog-posts.data';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';
import { SliderNavComponent } from '../../../../../components/slider-nav/slider-nav.component';

// English version of blogs/inspiratie/sinterklaas-dobbelspel.
@Component({
  selector: 'app-sinterklaas-dice-game',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'sinterklaas-dice-game.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/drankspellen/drankspellen.component.scss', '../../../../blogs/drankspelletjes/beerpong/beerpong.component.scss']
})
export class SinterklaasDiceGameComponent {
  readonly recommendedPosts = getRecommendedPosts(getPostsBySlug(['sinterklaas-dice-game'], 'en')[0]);
  readonly recommendedGames = getRecommendedGamesForPost(getPostsBySlug(['sinterklaas-dice-game'], 'en')[0]);
  private readonly ui = UI.en;
  readonly category = this.ui.categoryLabels.Inspiratie;
  readonly subCategory = this.ui.subCategoryLabels.Dobbelspel;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.category, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Sinterklaas dice game' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-sinterklaas-dice-game',
      lang: 'en',
      title: 'Sinterklaas dice game: rules and tasks for adults',
      description: 'How to play the Dutch Sinterklaas dice game with presents. Rules for every roll, tasks for adults and a student house version with anytimers.',
      url: 'https://anytimer.app/en/blog/inspiration/sinterklaas-dice-game/',
      image: 'https://anytimer.app/assets/blogs/sinterklaas%20dobbelspel/sinterklaas.png',
      imageAlt: 'Friends roll a die next to a pile of presents in the Sinterklaas dice game',
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs
    });
  }
}
