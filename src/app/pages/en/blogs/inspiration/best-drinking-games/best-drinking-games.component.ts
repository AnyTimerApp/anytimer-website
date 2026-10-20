import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';

// English version of blogs/inspiratie/drankspellen.
@Component({
  selector: 'app-best-drinking-games',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: 'best-drinking-games.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/drankspellen/drankspellen.component.scss']
})
export class BestDrinkingGamesComponent {
  private readonly ui = UI.en;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Inspiratie, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Top 10 best drinking games' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-best-drinking-games',
      lang: 'en',
      title: 'Top 10 best drinking games for a fun night',
      description: 'Our top 10 drinking games for a fun night with friends. From Beerio Kart and Kingsen to Rage Cage and Mexico. With all the rules and tips.',
      url: 'https://anytimer.app/en/blog/inspiration/best-drinking-games/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/mario%20barf.png',
      imageAlt: 'Beerio Kart drinking game',
      published: '2026-04-10',
      breadcrumbs: this.breadcrumbs
    });
  }
}
