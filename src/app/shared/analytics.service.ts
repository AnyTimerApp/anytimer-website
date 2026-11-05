import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CLARITY_PROJECT_ID } from './analytics.config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'anytimer-cookie-consent';
type Consent = 'granted' | 'denied';

// The Google tag itself sits in index.html with Consent Mode set to "denied".
// After explicit consent (or on later visits, once consent was already stored)
// this service grants analytics_storage, sends pageviews and loads Clarity.
// Nothing runs during SSR/prerendering.
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly isBrowser: boolean;
  private scriptsLoaded = false;
  private lastTrackedPath: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getConsent(): Consent | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(CONSENT_KEY) as Consent | null;
  }

  grantConsent(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(CONSENT_KEY, 'granted');
    this.loadScripts();
    // The pageview for the page the visitor accepted on was skipped earlier.
    this.trackPageView(window.location.pathname + window.location.search);
  }

  denyConsent(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(CONSENT_KEY, 'denied');
  }

  // Called once on app init — loads the scripts immediately for a returning
  // visitor who already granted consent on a previous visit.
  initIfConsented(): void {
    if (this.isBrowser && this.getConsent() === 'granted') {
      this.loadScripts();
    }
  }

  // GA4 reads page_location and page_title (page_path is a Universal Analytics
  // field). The same path twice in a row is one pageview: on first load both
  // app init and the first NavigationEnd report it.
  trackPageView(path: string): void {
    if (!this.isBrowser || this.getConsent() !== 'granted' || !window.gtag) return;
    if (path === this.lastTrackedPath) return;
    this.lastTrackedPath = path;
    window.gtag('event', 'page_view', {
      page_location: window.location.origin + path,
      page_title: this.document.title
    });
  }

  private loadScripts(): void {
    if (!this.isBrowser || this.scriptsLoaded) return;
    this.scriptsLoaded = true;
    this.grantGoogleAnalytics();
    this.loadClarity();
  }

  // send_page_view is off in index.html: trackPageView() sends every pageview
  // explicitly from the Router subscription in app.component.ts, since
  // client-side route changes don't reload the page.
  private grantGoogleAnalytics(): void {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  }

  private loadClarity(): void {
    const doc = this.document;
    const w = window as Window;
    if (w.clarity) return;
    w.clarity = function (...args: unknown[]) {
      (w.clarity as any).q = (w.clarity as any).q || [];
      (w.clarity as any).q.push(args);
    };
    const script = doc.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    const first = doc.getElementsByTagName('script')[0];
    first.parentNode?.insertBefore(script, first);
  }
}
