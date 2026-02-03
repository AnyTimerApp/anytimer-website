import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="container nav-inner">
        <a routerLink="/" class="logo">
          <div class="logo-icon"></div>
          <span>Mindify</span>
        </a>

        <div class="nav-links">
          <a routerLink="/" fragment="features">Features</a>
          <a routerLink="/" fragment="testimonials">Testimonials</a>
          <a routerLink="/" fragment="pricing">Pricing</a>
          <a routerLink="/" fragment="about">About</a>
        </div>

        <div class="nav-actions">
          <a routerLink="/login" class="link-login">Log in</a>
          <a routerLink="/signup" class="btn btn-primary btn-sm">Get Started</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      z-index: 1000;
      background: rgba(255, 255, 255, 0.0); /* Start transparant */
      transition: background 0.3s ease, border-bottom 0.3s ease;
      border-bottom: 1px solid transparent;
    }

    /* Als er gescrolled wordt, voeg blur toe */
    .navbar.scrolled {
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-light);
    }

    .nav-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .logo-icon {
      width: 28px;
      height: 28px;
      background: var(--primary);
      border-radius: 8px;
    }

    .nav-links {
      display: flex;
      gap: 32px;
    }
    .nav-links a {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .nav-links a:hover { color: var(--primary); }

    .nav-actions { display: flex; align-items: center; gap: 24px; }
    .link-login { font-weight: 600; font-size: 0.95rem; color: var(--text-main); }
    .btn-sm { height: 40px; padding: 0 16px; font-size: 0.9rem; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
