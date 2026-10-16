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

// English version of blogs/weetjes/mag-je-een-anytimer-weigeren.
@Component({
  selector: 'app-can-you-refuse-an-anytimer',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'can-you-refuse-an-anytimer.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/weetjes/mag-je-een-anytimer-weigeren/mag-je-een-anytimer-weigeren.component.scss']
})
export class CanYouRefuseAnAnytimerComponent {
  private readonly ui = UI.en;
  readonly relatedReading = getPostsBySlug(['what-is-an-anytimer', 'tracking-anytimers-in-whatsapp', 'best-chug-timer'], 'en');

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Weetjes, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Weetjes}` },
    { label: 'Can you refuse an anytimer?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-can-you-refuse-an-anytimer',
      lang: 'en',
      title: 'Can You Refuse an Anytimer? Rules & Penalties | AnyTimerApp',
      description: 'Can you refuse an anytimer? Yes, but there is a price. Read the rules, the usual penalty and when you can\'t use an anytimer.',
      url: 'https://anytimer.app/en/blog/good-to-know/can-you-refuse-an-anytimer/',
      image: 'https://anytimer.app/assets/blogs/anytimer%20weigeren/maatje%20adt%20een%20biertje%20cartoon.png',
      imageAlt: 'Cartoon about refusing an anytimer',
      published: '2026-04-21',
      breadcrumbs: this.breadcrumbs
    });
  }
}
