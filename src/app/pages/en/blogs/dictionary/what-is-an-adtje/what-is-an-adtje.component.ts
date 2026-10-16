import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';

// English version of blogs/begrippen/wat-is-een-adtje.
@Component({
  selector: 'app-what-is-an-adtje',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: 'what-is-an-adtje.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/begrippen/wat-is-een-adtje/wat-is-een-adtje.component.scss']
})
export class WhatIsAnAdtjeComponent {
  private readonly ui = UI.en;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Begrippen, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Begrippen}` },
    { label: 'What is an adtje?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-what-is-an-adtje',
      lang: 'en',
      title: 'What is an Adtje? The Dutch Chug Explained | AnyTimerApp',
      description: 'What does adtje mean? It is the Dutch word for downing your drink in one go. Learn where it comes from, how to chug fast and what a shotgun and rietbak are.',
      url: 'https://anytimer.app/en/blog/dictionary/what-is-an-adtje/',
      image: 'https://anytimer.app/assets/blogs/wat%20is%20een%20adtje/wat%20is%20een%20adtje.png',
      imageAlt: 'What is an adtje',
      published: '2026-03-27',
      breadcrumbs: this.breadcrumbs
    });
  }
}
