import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-anytimers-bijhouden-whatsapp-notities',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'anytimers-bijhouden-whatsapp-notities.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './anytimers-bijhouden-whatsapp-notities.component.scss']
})
export class AnytimersWhatsappNotitiesComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: 'Weetjes', url: '/blog/weetjes' },
    { label: 'Waarom je anytimers niet in WhatsApp of notities moet bijhouden' }
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
    const title = 'Waarom je Anytimers niet in WhatsApp of Notities Bijhoudt | AnyTimerApp';
    const description = 'Waarom werken WhatsApp en notities niet voor het bijhouden van anytimers? Leer over versiebeheer, alternatieven zoals een whiteboard of app, en hoe je ruzie voorkomt.';
    const image = 'https://anytimer.app/assets/blogs/whatsapp%20en%20notities/Whatsapp%20phones.png';
    const url = 'https://anytimer.app/anytimers-bijhouden-whatsapp-notities/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-anytimers-bijhouden-whatsapp-notities', this.breadcrumbs);

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
