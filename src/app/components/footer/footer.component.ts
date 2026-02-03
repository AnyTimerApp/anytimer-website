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
            <h3>Mindify</h3>
            <p>Track your mental health journey with elegance and ease.</p>
          </div>
          <div class="footer-links">
            <div class="column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Download</a>
            </div>
            <div class="column">
              <h4>Legal</h4>
              <a routerLink="/privacy">Privacy Policy</a>
              <a routerLink="/terms">Terms of Use</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Mindify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--white);
      padding: 80px 0 40px;
      margin-top: 80px;
      border-top: 1px solid var(--neutral-lightest);
    }
    .footer-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 40px;
      margin-bottom: 60px;
    }
    .footer-brand { max-width: 300px; }
    .footer-links { display: flex; gap: 80px; }
    .column { display: flex; flex-direction: column; gap: 12px; }
    .column h4 { font-size: 1rem; margin-bottom: 8px; color: var(--black); }
    .column a { color: var(--neutral-light-dark); font-size: 0.9rem; }
    .column a:hover { color: var(--primary); }
    .footer-bottom {
      border-top: 1px solid var(--neutral-lightest);
      padding-top: 32px;
      text-align: center;
      color: var(--neutral-light-dark);
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {}
