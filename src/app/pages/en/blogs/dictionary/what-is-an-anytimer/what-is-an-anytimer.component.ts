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
import { getPostsBySlug } from '../../../../blog/blog-posts.data';

// English version of blogs/begrippen/wat-is-een-anytimer.
@Component({
  selector: 'app-what-is-an-anytimer',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'what-is-an-anytimer.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/begrippen/wat-is-een-anytimer/wat-is-een-anytimer.component.scss']
})
export class WhatIsAnAnytimerComponent {
  private readonly ui = UI.en;
  readonly relatedReading = getPostsBySlug(['tracking-anytimers-in-whatsapp', 'can-you-refuse-an-anytimer', 'best-chug-timer'], 'en');

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Begrippen, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Begrippen}` },
    { label: 'What is an anytimer?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-what-is-an-anytimer',
      lang: 'en',
      title: 'What is an Anytimer? Meaning, Rules & Examples | AnyTimerApp',
      description: 'What is an anytimer? A free pass between friends that you can use at any moment. Learn how to earn one, how to use it and the unwritten rules.',
      url: 'https://anytimer.app/en/blog/dictionary/what-is-an-anytimer/',
      image: 'https://anytimer.app/assets/blogs/wat%20is%20een%20anytimer/Wat%20is%20een%20anytimer%20cover.png',
      imageAlt: 'What is an anytimer explained',
      published: '2026-04-12',
      breadcrumbs: this.breadcrumbs
    });
  }
}
