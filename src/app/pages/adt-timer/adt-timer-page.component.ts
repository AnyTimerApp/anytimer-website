import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AdtTimerComponent } from '../../components/adt-timer/adt-timer.component';
import { DownloadCtaComponent } from '../../components/download-cta/download-cta.component';

// Content for both the Dutch /adt-timer/ and the English /en/chug-timer/ tool page.
export const ADT_TIMER_SEO = {
  nl: {
    title: 'Adt timer: de gratis bier timer voor je adtje',
    description: 'Gratis adt timer voor bier, direct in je browser. Tik, laat los en adten maar. Tik als je bier op is en zie je tijd tot op de honderdste seconde.',
    url: 'https://anytimer.app/adt-timer/',
    name: 'Bier adt timer',
    imageAlt: 'De online adt timer: een blauw scherm met de Any-timer, een tijd en een vingerafdruk'
  },
  en: {
    title: 'Chug timer: free online beer chugging timer',
    description: 'Free online chugging timer for beer and other drinks. Tap, let go and chug. Tap again when your drink is gone and see your time to a hundredth of a second.',
    url: 'https://anytimer.app/en/chug-timer/',
    name: 'Beer chug timer',
    imageAlt: 'The online chug timer: a blue screen with the Any timer, a time and a fingerprint'
  }
};

const IMAGE = 'https://anytimer.app/assets/blogs/beste%20timer/adt%20timer%20online.png';

// Meta tags and WebApplication JSON-LD for the timer tool page.
export function applyAdtTimerSeo(meta: Meta, document: Document, lang: 'nl' | 'en') {
  const seo = ADT_TIMER_SEO[lang];

  meta.updateTag({ name: 'description', content: seo.description });

  meta.updateTag({ property: 'og:type', content: 'website' });
  meta.updateTag({ property: 'og:url', content: seo.url });
  meta.updateTag({ property: 'og:title', content: seo.title });
  meta.updateTag({ property: 'og:description', content: seo.description });
  meta.updateTag({ property: 'og:image', content: IMAGE });
  meta.updateTag({ property: 'og:image:width', content: '1536' });
  meta.updateTag({ property: 'og:image:height', content: '1024' });
  meta.updateTag({ property: 'og:image:alt', content: seo.imageAlt });
  meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });

  meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  meta.updateTag({ name: 'twitter:title', content: seo.title });
  meta.updateTag({ name: 'twitter:description', content: seo.description });
  meta.updateTag({ name: 'twitter:image', content: IMAGE });

  const schemaId = `schema-adt-timer-${lang}`;
  if (!document.getElementById(schemaId)) {
    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': seo.name,
      'description': seo.description,
      'url': seo.url,
      'inLanguage': lang,
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'Any',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
      'publisher': { '@type': 'Organization', 'name': 'AnyTimerApp' }
    });
    document.head.appendChild(script);
  }
}

@Component({
  selector: 'app-adt-timer-page',
  standalone: true,
  imports: [RouterLink, AdtTimerComponent, DownloadCtaComponent],
  templateUrl: 'adt-timer-page.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', '../blogs/blog-article-shared.scss', './adt-timer-page.component.scss']
})
export class AdtTimerPageComponent {
  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyAdtTimerSeo(meta, document, 'nl');
  }
}
