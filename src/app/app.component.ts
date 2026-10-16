import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { Meta } from '@angular/platform-browser';
import { AnalyticsService } from './shared/analytics.service';
import { LanguageService } from './i18n/language.service';
import { alternatesFor } from './i18n/alternates';
import { langFromPath, normalizePath } from './i18n/lang';
import { UI } from './i18n/ui';

const BASE_URL = 'https://anytimer.app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'anytimer-website';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private analytics: AnalyticsService,
    private meta: Meta,
    // Injected here so it exists (and sets <html lang>) before the first page renders.
    readonly language: LanguageService
  ) {}

  ngOnInit() {
    this.setLinkTags(this.router.url);
    this.setSmoothScroll(this.router.url);

    this.analytics.initIfConsented();
    this.analytics.trackPageView(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.setLinkTags(e.urlAfterRedirects);
        this.setSmoothScroll(e.urlAfterRedirects);
        this.analytics.trackPageView(e.urlAfterRedirects);
      });
  }

  // Strip fragment (#features) and query params before comparing —
  // "/#features" and "/" both resolve to the home page.
  private setSmoothScroll(url: string) {
    const path = url.split('#')[0].split('?')[0];
    const isHome = path === '/' || path === '';
    this.document.documentElement.classList.toggle('smooth-scroll', isHome);
  }

  // Canonical always points to the page itself. hreflang links point to both
  // language versions when the page has a counterpart (see i18n/alternates.ts),
  // with x-default on the Dutch version. og:locale follows the page language;
  // set here after the page component, so it overrides whatever it set.
  private setLinkTags(url: string) {
    const lang = langFromPath(url);
    const alternates = alternatesFor(url);
    const href = BASE_URL + normalizePath(url);

    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach(link => link.remove());

    const hreflangs: [string, string | undefined][] = [
      ['nl', alternates.nl],
      ['en', alternates.en],
      ['x-default', alternates.nl ?? alternates.en]
    ];
    for (const [hreflang, path] of hreflangs) {
      if (!path) continue;
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', BASE_URL + path);
      this.document.head.appendChild(link);
    }

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', href);

    this.meta.updateTag({ property: 'og:locale', content: UI[lang].locale });
    const otherLang = lang === 'nl' ? 'en' : 'nl';
    if (alternates[otherLang]) {
      this.meta.updateTag({ property: 'og:locale:alternate', content: UI[otherLang].locale });
    } else {
      this.meta.removeTag('property="og:locale:alternate"');
    }
  }
}
