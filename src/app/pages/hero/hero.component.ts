import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero-section">
      <div class="container hero-content">
        <div class="badge-pill">
          <span class="badge-new">New</span>
          <span>Introducing Mindify AI 2.0</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 9L7.5 6L4.5 3"/></svg>
        </div>

        <h1>Design your mind. <br><span class="text-gradient">Build your future.</span></h1>
        <p class="subtitle">Mindify helps you track your mood, habits, and tasks in one beautiful workspace. Simple, fast, and designed for focus.</p>

        <div class="cta-group">
          <button class="btn btn-primary">Start for free</button>
          <button class="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
            Watch Demo
          </button>
        </div>

        <div class="ui-mockup-wrapper">
          <div class="ui-mockup">
             <div class="mock-sidebar"></div>
             <div class="mock-content">
                <div class="mock-header"></div>
                <div class="mock-cards">
                  <div class="m-card"></div>
                  <div class="m-card"></div>
                  <div class="m-card big"></div>
                </div>
             </div>
          </div>
          <div class="glow-bg"></div>
        </div>

        <div class="trusted-by">
          <p>Trusted by forward-thinking teams</p>
          <div class="logos">
            <div class="logo-box">ACME</div>
            <div class="logo-box">Quantum</div>
            <div class="logo-box">Echo</div>
            <div class="logo-box">Nebula</div>
            <div class="logo-box">FoxRun</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding-top: 140px; /* Space for fixed header */
      padding-bottom: 80px;
      text-align: center;
      background: radial-gradient(circle at 50% 0%, rgba(0, 111, 253, 0.05) 0%, rgba(255, 255, 255, 0) 50%);
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Badge */
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px 6px 6px;
      background: white;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-pill);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 32px;
      box-shadow: var(--shadow-xs);
      cursor: pointer;
      transition: 0.2s;
    }
    .badge-pill:hover { border-color: var(--primary); }
    .badge-new {
      background: var(--primary);
      color: white;
      padding: 2px 8px;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    /* Typography */
    h1 {
      font-size: 4rem; /* HUGE text like template */
      letter-spacing: -0.04em;
      margin-bottom: 24px;
    }
    .text-gradient {
      background: linear-gradient(135deg, var(--primary) 0%, #60A5FA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.25rem;
      max-width: 600px;
      margin-bottom: 40px;
    }

    .cta-group { display: flex; gap: 16px; margin-bottom: 80px; }

    /* UI Mockup */
    .ui-mockup-wrapper {
      position: relative;
      width: 100%;
      max-width: 1000px;
      margin-bottom: 80px;
    }
    .ui-mockup {
      width: 100%;
      height: 500px;
      background: white;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      position: relative;
      z-index: 2;
      display: flex;
    }
    .glow-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      background: var(--primary);
      filter: blur(120px);
      opacity: 0.15;
      z-index: 1;
    }

    /* Fake UI Internals */
    .mock-sidebar { width: 200px; height: 100%; border-right: 1px solid var(--border-light); background: #FAFAFA; }
    .mock-content { flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
    .mock-header { width: 100%; height: 40px; background: #F3F4F6; border-radius: 8px; }
    .mock-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; height: 100%; }
    .m-card { background: #F3F4F6; border-radius: 12px; height: 100px; }
    .big { grid-column: span 2; height: auto; }

    /* Trusted By */
    .trusted-by p { font-size: 0.875rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px; }
    .logos { display: flex; justify-content: center; gap: 48px; opacity: 0.4; flex-wrap: wrap; }
    .logo-box { font-weight: 800; font-size: 1.5rem; color: var(--text-main); }

    @media (max-width: 768px) {
      h1 { font-size: 2.5rem; }
      .ui-mockup { height: 300px; }
      .mock-sidebar { display: none; }
    }
  `]
})
export class HeroComponent {}
