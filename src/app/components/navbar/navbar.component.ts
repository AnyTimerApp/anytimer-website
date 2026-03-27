import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'navbar.component.html',
  styleUrl: 'navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isHeroPage = true;
  menuOpen = false;

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

  private routerSub!: Subscription;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.isHeroPage = this.isHomePath(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isHeroPage = this.isHomePath(e.urlAfterRedirects);
        this.menuOpen = false;
      });
  }

  // Strip fragment (#features) and query params before comparing —
  // "/#features" and "/" both resolve to the home hero page.
  private isHomePath(url: string): boolean {
    const path = url.split('#')[0].split('?')[0];
    return path === '/' || path === '';
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 20;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
