import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';

// English version of blogs/inspiratie/huisavondideeen.
@Component({
  selector: 'app-night-in-ideas-for-housemates',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: 'night-in-ideas-for-housemates.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/huisavondideeen/huisavondideeen.component.scss']
})
export class NightInIdeasForHousematesComponent {
  private readonly ui = UI.en;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Inspiratie, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'Top 10 night in ideas for housemates' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-night-in-ideas-for-housemates',
      lang: 'en',
      title: 'Top 10 Fun Night In Ideas for Housemates | AnyTimerApp',
      description: 'Staying in with your housemates? Our top 10 night in ideas, from a black run through your student house to Christmas dinner in July. Fun ideas for every student house.',
      url: 'https://anytimer.app/en/blog/inspiration/night-in-ideas-for-housemates/',
      image: 'https://anytimer.app/assets/blogs/huisavond/Huisavond%20cover.png',
      imageAlt: 'Top 10 night in ideas for housemates',
      published: '2026-07-21',
      breadcrumbs: this.breadcrumbs
    });
  }
}
