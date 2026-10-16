import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { getPostsBySlug } from '../../../../blog/blog-posts.data';

// English version of blogs/weetjes/anytimers-bijhouden-whatsapp-notities.
@Component({
  selector: 'app-tracking-anytimers-in-whatsapp',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'tracking-anytimers-in-whatsapp.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/weetjes/anytimers-bijhouden-whatsapp-notities/anytimers-bijhouden-whatsapp-notities.component.scss']
})
export class TrackingAnytimersInWhatsappComponent {
  private readonly ui = UI.en;
  readonly relatedReading = getPostsBySlug(['what-is-an-anytimer', 'can-you-refuse-an-anytimer', 'best-chug-timer'], 'en');

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Weetjes, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Weetjes}` },
    { label: 'Why you shouldn\'t track anytimers in WhatsApp or your notes' }
  ];

  readonly APP_STORE_URL = 'https://apps.apple.com/nl/app/anytimerapp/id6758271174';
  readonly PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.anytimer.app';

  get downloadUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      const ua = navigator.userAgent;
      if (/iPad|iPhone|iPod|Macintosh/i.test(ua)) {
        return this.APP_STORE_URL;
      }
    }
    return this.PLAY_STORE_URL;
  }

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document, @Inject(PLATFORM_ID) private platformId: object) {
    applyArticleSeo(meta, document, {
      id: 'en-tracking-anytimers-in-whatsapp',
      lang: 'en',
      title: 'Why You Shouldn\'t Track Anytimers in WhatsApp | AnyTimerApp',
      description: 'Why don\'t WhatsApp and notes work for tracking anytimers? Learn about version control, better options like a whiteboard or an app and how to avoid fights.',
      url: 'https://anytimer.app/en/blog/good-to-know/tracking-anytimers-in-whatsapp/',
      image: 'https://anytimer.app/assets/blogs/whatsapp%20en%20notities/Whatsapp%20phones.png',
      imageAlt: 'Tracking anytimers in WhatsApp fails without version control',
      published: '2026-05-21',
      breadcrumbs: this.breadcrumbs
    });
  }
}
