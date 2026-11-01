import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { getRecommendedPosts, getPostsBySlug } from '../../../../../pages/blog/blog-posts.data';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';

// English version of blogs/inspiratie/drankspellen-met-kaarten.
@Component({
  selector: 'app-card-drinking-games',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'card-drinking-games.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/drankspellen/drankspellen.component.scss']
})
export class CardDrinkingGamesComponent {
  readonly recommendedPosts = getRecommendedPosts(getPostsBySlug(['card-drinking-games'], 'en')[0]);
  private readonly ui = UI.en;
  readonly category = this.ui.categoryLabels.Inspiratie;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.category, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Card drinking games' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-card-drinking-games',
      lang: 'en',
      title: 'Card drinking games: the 8 best games with cards',
      description: 'All you need for these drinking games is a deck of cards. Kingsen, Ride the Bus, Fuck the Dealer and more. Per game the players and how it works.',
      url: 'https://anytimer.app/en/blog/inspiration/card-drinking-games/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/kingsen.png',
      imageAlt: 'Kingsen drinking game with cards in a circle around a shot glass',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
