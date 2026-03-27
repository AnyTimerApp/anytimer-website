import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
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

  private routerSub!: Subscription;

  constructor(private router: Router) {}

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
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
