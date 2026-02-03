import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <h3>Anytimer</h3>
            <p>De anytimer app. Houd anytimers bij tussen vrienden.</p>
          </div>
          <div class="footer-links">
            <div class="column">
              <h4>Product</h4>
              <a routerLink="/" fragment="features">Features</a>
              <a routerLink="/" fragment="over-ons">Over ons</a>
              <a routerLink="/contact">Contact</a>
            </div>
            <div class="column">
              <h4>Juridisch</h4>
              <a routerLink="/privacy">Privacybeleid</a>
              <a routerLink="/terms">Gebruiksvoorwaarden</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Anytimer. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-page);
      padding: 80px 0 40px;
      margin-top: 80px;
      border-top: 1px solid var(--border-light);
    }
    .footer-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 40px;
      margin-bottom: 60px;
    }
    .footer-brand { max-width: 300px; }
    .footer-brand h3 { margin-bottom: 12px; }
    .footer-links { display: flex; gap: 80px; }
    .column { display: flex; flex-direction: column; gap: 12px; }
    .column h4 { font-size: 1rem; margin-bottom: 8px; }
    .column a { color: var(--text-secondary); font-size: 0.9rem; }
    .column a:hover { color: var(--primary); }
    .footer-bottom {
      border-top: 1px solid var(--border-light);
      padding-top: 32px;
      text-align: center;
      color: var(--text-tertiary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-links { gap: 40px; }
    }
  `]
})
export class FooterComponent {}
