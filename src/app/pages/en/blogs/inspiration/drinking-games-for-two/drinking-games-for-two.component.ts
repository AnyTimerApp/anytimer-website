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

// English version of blogs/inspiratie/drankspellen-voor-2-personen.
@Component({
  selector: 'app-drinking-games-for-two',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drinking-games-for-two.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/drankspellen/drankspellen.component.scss']
})
export class DrinkingGamesForTwoComponent {
  readonly recommendedPosts = getRecommendedPosts(getPostsBySlug(['drinking-games-for-two'], 'en')[0]);
  private readonly ui = UI.en;
  readonly category = this.ui.categoryLabels.Inspiratie;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.category, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Drinking games for 2 people' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-drinking-games-for-two',
      lang: 'en',
      title: 'Drinking games for 2 people: 10 games for two',
      description: 'You can play these 10 drinking games with just 2 people. From Battleship and Mexico to Higher or Lower. Per game the players, what you need and how it works.',
      url: 'https://anytimer.app/en/blog/inspiration/drinking-games-for-two/',
      image: 'https://anytimer.app/assets/blogs/drankspel/zeeslag.png',
      imageAlt: 'Battleship drinking game with the board and pegs',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
