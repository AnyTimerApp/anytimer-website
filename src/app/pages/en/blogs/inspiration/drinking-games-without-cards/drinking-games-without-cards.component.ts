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

// English version of blogs/inspiratie/drankspellen-zonder-kaarten.
@Component({
  selector: 'app-drinking-games-without-cards',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drinking-games-without-cards.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/drankspellen/drankspellen.component.scss']
})
export class DrinkingGamesWithoutCardsComponent {
  readonly recommendedPosts = getRecommendedPosts(getPostsBySlug(['drinking-games-without-cards'], 'en')[0]);
  readonly recommendedGames = getRecommendedGamesForPost(getPostsBySlug(['drinking-games-without-cards'], 'en')[0]);
  private readonly ui = UI.en;
  readonly category = this.ui.categoryLabels.Inspiratie;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.category, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Drinking games without cards' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-drinking-games-without-cards',
      lang: 'en',
      title: 'Drinking games without cards: 10 games for any night',
      description: 'You play these 10 drinking games without cards. With dice, cups, a glass or your phone. Per game the number of players and how it works.',
      url: 'https://anytimer.app/en/blog/inspiration/drinking-games-without-cards/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/mexen.png',
      imageAlt: 'Mexico dice drinking game',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
