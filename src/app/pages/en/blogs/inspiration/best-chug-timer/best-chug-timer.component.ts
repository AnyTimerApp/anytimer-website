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

// English version of blogs/inspiratie/wat-is-de-beste-adt-timer.
@Component({
  selector: 'app-best-chug-timer',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'best-chug-timer.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/inspiratie/wat-is-de-beste-adt-timer/wat-is-de-beste-adt-timer.component.scss']
})
export class BestChugTimerComponent {
  private readonly ui = UI.en;
  readonly relatedReading = getPostsBySlug(['what-is-an-anytimer', 'tracking-anytimers-in-whatsapp', 'can-you-refuse-an-anytimer'], 'en');

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Inspiratie, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Inspiratie}` },
    { label: 'What is the best chug timer?' }
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
      id: 'en-best-chug-timer',
      lang: 'en',
      title: 'What is the best chug timer? Guide and options',
      description: 'Which chug timer should you use? We compare an app, a stopwatch, the AdtMeister and a Rubik\'s cube timer. Plus tips for timing a fair chug.',
      url: 'https://anytimer.app/en/blog/inspiration/best-chug-timer/',
      image: 'https://anytimer.app/assets/blogs/beste%20timer/Any-timer%20in%20de%20club.png',
      imageAlt: 'The Any-timer chug timer in the club',
      published: '2026-04-17',
      breadcrumbs: this.breadcrumbs
    });
  }
}
