import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-text">
          <p class="eyebrow">De anytimer app</p>
          <h1>Vergeet nooit op wie je nog anytimer's hebt</h1>
          <p class="subtitle">
            Met de AnyTimer app kun je vrienden toevoegen, anytimers bijhouden, uitdelen en de in-app timer gebruiken..
          </p>

          <div class="store-badges">
            <a href="#" class="store-badge">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
              </div>
              <div class="badge-text">
                <span class="badge-small">Beschikbaar op</span>
                <span class="badge-large">Google Play</span>
              </div>
            </a>
            <a href="#" class="store-badge">
              <div class="badge-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              </div>
              <div class="badge-text">
                <span class="badge-small">Download in de</span>
                <span class="badge-large">App Store</span>
              </div>
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="phone-mockup">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="screen-header">
                <div class="screen-title"></div>
                <div class="screen-avatar"></div>
              </div>
              <div class="screen-card">
                <div class="card-label"></div>
                <div class="card-value"></div>
                <div class="card-bar">
                  <div class="card-bar-fill"></div>
                </div>
              </div>
              <div class="screen-card">
                <div class="card-label"></div>
                <div class="card-value"></div>
                <div class="card-bar">
                  <div class="card-bar-fill short"></div>
                </div>
              </div>
              <div class="screen-list">
                <div class="list-item">
                  <div class="list-avatar"></div>
                  <div class="list-text"></div>
                  <div class="list-badge">+2</div>
                </div>
                <div class="list-item">
                  <div class="list-avatar"></div>
                  <div class="list-text"></div>
                  <div class="list-badge give">-1</div>
                </div>
                <div class="list-item">
                  <div class="list-avatar"></div>
                  <div class="list-text"></div>
                  <div class="list-badge">+1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding-top: calc(var(--header-height) + 80px);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 55% 45%;
      gap: 40px;
      align-items: center;
    }

    .eyebrow {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary);
      margin-bottom: 20px;
    }

    h1 {
      font-size: 3.5rem;
      margin-bottom: 24px;
    }

    .subtitle {
      font-size: 1.15rem;
      max-width: 480px;
      margin-bottom: 40px;
    }

    /* Store badges */
    .store-badges {
      display: flex;
      gap: 12px;
      margin-bottom: 32px;
    }
    .store-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--text-main);
      color: white;
      padding: 10px 18px;
      border-radius: 10px;
      transition: opacity 0.2s;
    }
    .store-badge:hover { opacity: 0.85; }
    .badge-icon { display: flex; }
    .badge-icon svg { fill: white; }
    .badge-text { display: flex; flex-direction: column; }
    .badge-small { font-size: 0.6rem; opacity: 0.8; line-height: 1; color: white; }
    .badge-large { font-size: 0.95rem; font-weight: 600; line-height: 1.3; color: white; }

    /* QR codes */
    .qr-row {
      display: flex;
      gap: 24px;
    }
    .qr-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .qr-block span {
      font-size: 0.75rem;
      color: var(--text-tertiary);
      font-weight: 500;
    }
    .qr-placeholder {
      width: 80px;
      height: 80px;
      border: 2px dashed var(--border-light);
      border-radius: 8px;
      background: var(--bg-surface);
    }

    /* Phone mockup */
    .hero-visual {
      display: flex;
      justify-content: center;
    }
    .phone-mockup {
      width: 280px;
      height: 560px;
      background: #fff;
      border-radius: 36px;
      border: 3px solid var(--text-main);
      padding: 12px;
      position: relative;
      transform: rotate(2deg);
      box-shadow: 24px 24px 0 var(--bg-surface);
    }
    .phone-notch {
      width: 100px;
      height: 24px;
      background: var(--text-main);
      border-radius: 0 0 14px 14px;
      margin: 0 auto 16px;
    }
    .phone-screen {
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .screen-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .screen-title {
      width: 100px;
      height: 14px;
      background: var(--text-main);
      border-radius: 4px;
    }
    .screen-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--primary-light);
    }
    .screen-card {
      background: var(--bg-surface);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-label {
      width: 60px;
      height: 8px;
      background: var(--text-tertiary);
      border-radius: 4px;
      opacity: 0.4;
    }
    .card-value {
      width: 40px;
      height: 20px;
      background: var(--text-main);
      border-radius: 4px;
    }
    .card-bar {
      height: 6px;
      background: #E5E7EB;
      border-radius: 3px;
    }
    .card-bar-fill {
      height: 100%;
      width: 70%;
      background: var(--primary);
      border-radius: 3px;
    }
    .card-bar-fill.short { width: 40%; }
    .screen-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .list-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-light);
    }
    .list-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 2px solid var(--border-light);
      flex-shrink: 0;
    }
    .list-text {
      flex: 1;
      height: 10px;
      background: #E5E7EB;
      border-radius: 4px;
    }
    .list-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 2px 8px;
      border-radius: var(--radius-pill);
    }
    .list-badge.give {
      color: #DC2626;
      background: #FEE2E2;
    }

    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      h1 { font-size: 2.5rem; }
      .subtitle { margin-left: auto; margin-right: auto; }
      .store-badges { justify-content: center; }
      .qr-row { justify-content: center; }
      .hero-visual { margin-top: 40px; }
      .phone-mockup {
        transform: rotate(0);
        width: 240px;
        height: 480px;
      }
    }
  `]
})
export class HeroComponent {
  //TODO ADD BADGE LINKS
}
