import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GA_MEASUREMENT_ID, CLARITY_PROJECT_ID } from './analytics.config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'anytimer-cookie-consent';
type Consent = 'granted' | 'denied';

// GA4 + Clarity are only ever injected after explicit consent (or on later
// visits, once consent was already stored) — never during SSR/prerendering,
// and never before the visitor has accepted cookies.
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly isBrowser: boolean;
  private scriptsLoaded = false;

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

  trackPageView(path: string): void {
    if (!this.isBrowser || this.getConsent() !== 'granted' || !window.gtag) return;
    window.gtag('event', 'page_view', { page_path: path });
  }

  private loadScripts(): void {
    if (!this.isBrowser || this.scriptsLoaded) return;
    this.scriptsLoaded = true;
    this.loadGoogleAnalytics();
    this.loadClarity();
  }

  private loadGoogleAnalytics(): void {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    this.document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    // send_page_view is off — trackPageView() sends every pageview
    // explicitly from the Router subscription in app.component.ts instead,
    // since client-side route changes don't reload gtag's own snippet.
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
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
