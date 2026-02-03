import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  template: `
    <section class="section">
      <div class="container">
        <div class="header-center">
          <h2>Everything you need.</h2>
          <p>Powerful features wrapped in a simple interface.</p>
        </div>

        <div class="bento-grid">
          <div class="card card-large">
            <div class="card-content">
              <h3>Analytics Dashboard</h3>
              <p>Track your progress with detailed charts and insights.</p>
            </div>
            <div class="card-visual visual-graph">
              <div class="bar" style="height: 40%"></div>
              <div class="bar" style="height: 60%"></div>
              <div class="bar active" style="height: 85%"></div>
              <div class="bar" style="height: 55%"></div>
              <div class="bar" style="height: 70%"></div>
            </div>
          </div>

          <div class="card card-small">
            <div class="icon-wrap">⚡</div>
            <h3>Fast Sync</h3>
            <p>Real-time updates across all devices.</p>
          </div>

          <div class="card card-small">
            <div class="icon-wrap">🔒</div>
            <h3>Secure</h3>
            <p>End-to-end encryption for your data.</p>
          </div>

          <div class="card card-wide">
             <div class="card-content">
               <h3>AI Assistant</h3>
               <p>Let our AI summarize your day and suggest improvements.</p>
             </div>
             <div class="visual-circle"></div>
           </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .header-center { text-align: center; margin-bottom: 64px; max-width: 600px; margin-inline: auto; }
    .header-center h2 { font-size: 2.5rem; margin-bottom: 16px; }

    .bento-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      grid-template-rows: 300px 300px;
      gap: 24px;
    }

    .card {
      background: var(--bg-surface);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 32px;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-sm);
      border-color: rgba(0, 111, 253, 0.3);
    }

    .card-large {
      grid-row: span 2; /* Takes full height on left */
      justify-content: space-between;
    }

    .card-small {
      justify-content: center;
    }

    .card-wide {
      grid-column: span 2;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 200px;
      margin-top: 24px; /* Optional if you want it outside grid rows */
    }

    /* Visuals inside cards */
    .card-visual.visual-graph {
      display: flex;
      align-items: flex-end;
      gap: 12px;
      height: 200px;
      width: 100%;
      padding-top: 40px;
    }
    .bar {
      flex: 1;
      background: #E5E7EB;
      border-radius: 6px;
      transition: height 1s ease;
    }
    .bar.active { background: var(--primary); }

    .icon-wrap {
      width: 48px;
      height: 48px;
      background: white;
      border: 1px solid var(--border-light);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 16px;
      box-shadow: var(--shadow-xs);
    }

    .card h3 { font-size: 1.5rem; margin-bottom: 8px; }

    @media (max-width: 900px) {
      .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
      .card-large { grid-row: span 1; height: 400px; }
      .card-wide { flex-direction: column; text-align: left; height: auto; }
    }
  `]
})
export class FeaturesComponent {}
