import { Injectable, Inject, computed, signal } from '@angular/core';
import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Router, ResolveEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Lang, langFromPath } from './lang';
import { UI, UiStrings } from './ui';

// The current language follows the URL: /en/... is English, the rest Dutch.
// It updates on ResolveEnd, so it's already correct when the next page's
// components are constructed. The initial value comes from PlatformLocation,
// which is the request path during prerendering.
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>('nl');
  readonly ui = computed<UiStrings>(() => UI[this.lang()]);

  constructor(
    router: Router,
    location: PlatformLocation,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.set(langFromPath(location.pathname));

    router.events
      .pipe(filter((e): e is ResolveEnd => e instanceof ResolveEnd))
      .subscribe(e => this.set(langFromPath(e.urlAfterRedirects)));
  }

  private set(lang: Lang) {
    this.lang.set(lang);
    this.document.documentElement.setAttribute('lang', lang);
  }
}
