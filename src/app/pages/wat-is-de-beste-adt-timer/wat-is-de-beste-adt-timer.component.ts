import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-wat-is-de-beste-adt-timer',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'wat-is-de-beste-adt-timer.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './wat-is-de-beste-adt-timer.component.scss']
})
export class WatIsDeBestAdtTimerComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: 'Inspiratie', url: '/blog/inspiratie' },
    { label: 'Wat is de beste adt timer?' }
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

  constructor(meta: Meta, @Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) document: Document) {
    const title = 'Wat is de Beste Adt Timer? - Gids & Opties | AnyTimerApp';
    const description = 'Welke adt timer moet je kiezen? Vergelijk app timers, stopwatch, AdtMeister en Rubiks cube timer. Tips voor eerlijke atten en snelle drankspellen.';
    const image = 'https://anytimer.app/assets/blogs/beste%20timer/Any-timer%20in%20de%20club.png';
    const url = 'https://anytimer.app/wat-is-de-beste-adt-timer/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-wat-is-de-beste-adt-timer', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
