import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent implements OnInit {
  // Stays false during SSR/prerendering — getConsent() also returns null
  // server-side (no localStorage there), which is indistinguishable from
  // "no consent yet", so every static page would otherwise prerender the
  // banner as visible. Only decide real visibility once actually in the browser.
  visible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visible = this.analytics.getConsent() === null;
  }

  accept(): void {
    this.analytics.grantConsent();
    this.visible = false;
  }

  decline(): void {
    this.analytics.denyConsent();
    this.visible = false;
  }
}
