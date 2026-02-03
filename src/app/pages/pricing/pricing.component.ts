import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <div class="header-center">
          <h2>Simple pricing.</h2>
          <p>No hidden fees. Cancel anytime.</p>
        </div>

        <div class="pricing-grid">
          @for(plan of plans; track plan.name) {
            <div class="plan-card" [class.popular]="plan.popular">
              @if(plan.popular) { <div class="pop-badge">Most Popular</div> }

              <div class="plan-header">
                <h3>{{plan.name}}</h3>
                <div class="price">
                  <span class="amount">\${{plan.price}}</span>
                  <span class="period">/mo</span>
                </div>
                <p>{{plan.desc}}</p>
              </div>

              <div class="features-list">
                @for(feat of plan.features; track feat) {
                  <div class="feat-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="check"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    {{feat}}
                  </div>
                }
              </div>

              <button class="btn" [ngClass]="plan.popular ? 'btn-primary' : 'btn-secondary'">
                Choose {{plan.name}}
              </button>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .header-center { text-align: center; margin-bottom: 64px; }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      align-items: start;
    }

    .plan-card {
      background: white;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 32px;
      position: relative;
    }

    .plan-card.popular {
      border-color: var(--primary);
      box-shadow: var(--shadow-sm);
      transform: scale(1.05); /* Iets groter */
      z-index: 2;
    }

    .pop-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      text-transform: uppercase;
    }

    .plan-header { margin-bottom: 32px; text-align: center; }
    .price { margin: 16px 0; display: flex; align-items: baseline; justify-content: center; gap: 4px; }
    .amount { font-size: 3rem; font-weight: 800; color: var(--text-main); letter-spacing: -0.05em; }
    .period { color: var(--text-secondary); }

    .features-list { margin-bottom: 32px; display: flex; flex-direction: column; gap: 16px; }
    .feat-item { display: flex; align-items: center; gap: 12px; color: var(--text-secondary); font-size: 0.95rem; }
    .check { color: var(--primary); width: 20px; min-width: 20px; }

    .btn { width: 100%; }

    @media (max-width: 900px) {
      .pricing-grid { grid-template-columns: 1fr; gap: 48px; }
      .plan-card.popular { transform: scale(1); }
    }
  `]
})
export class PricingComponent {
  plans = [
    { name: 'Basic', price: 0, desc: 'For individuals just starting.', features: ['3 Projects', 'Basic Analytics', 'Community Support'], popular: false },
    { name: 'Pro', price: 19, desc: 'For power users and creators.', features: ['Unlimited Projects', 'AI Assistant', 'Priority Support', 'Advanced Charts'], popular: true },
    { name: 'Team', price: 49, desc: 'For growing teams.', features: ['Everything in Pro', 'Team Collaboration', 'Admin Dashboard', 'SSO'], popular: false }
  ];
}
