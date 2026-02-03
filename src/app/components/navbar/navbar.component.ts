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
        <a routerLink="/" class="logo" (click)="scrollToTop()">
          <img src="assets/logo.png" alt="Anytimer" class="logo-img">
          <span>Anytimer</span>
        </a>

        <div class="nav-links" [class.open]="menuOpen">
          <a routerLink="/" fragment="hoe-het-werkt" (click)="closeMenu()">Hoe het werkt</a>
          <a routerLink="/" fragment="features" (click)="closeMenu()">Waarom</a>
          <a routerLink="/" fragment="over-ons" (click)="closeMenu()">Wat is het</a>
          <a routerLink="/" fragment="team" (click)="closeMenu()">Team</a>
          <a routerLink="/contact" (click)="closeMenu()">Contact</a>
        </div>

        <div class="nav-actions">
          <a href="#" class="btn btn-primary btn-sm">Download</a>
        </div>

        <button class="hamburger" [class.active]="menuOpen" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
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
      background: rgba(255, 255, 255, 0);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }

    .navbar.scrolled {
      background: #fff;
      box-shadow: 0 1px 0 var(--border-light);
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
    .logo-img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      object-fit: contain;
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
    .btn-sm { height: 40px; padding: 0 20px; font-size: 0.9rem; }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-main);
      transition: transform 0.3s, opacity 0.3s;
    }
    .hamburger.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
        position: absolute;
        top: var(--header-height);
        left: 0;
        right: 0;
        background: #fff;
        flex-direction: column;
        padding: 24px;
        gap: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      .nav-links.open {
        display: flex;
      }
      .nav-actions { display: none; }
      .hamburger { display: flex; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen = false;

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
