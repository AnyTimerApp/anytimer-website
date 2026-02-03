import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="section" id="over-ons">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h2>Wat is een Anytimer?</h2>
            <p>
              Een anytimer is een belofte tussen vrienden. Als iemand iets geks doet voor een aytimer, of juist een challenge verliest, dan ontvangt diegene een anytimer van de ander.
            </p>
            <p>
              Die kan op elk moment uitgedeeld worden. Een biertje op maandagavond,
              op een brakke ochtend of tijdens een familie feestje. De
              mogelijkheden zijn eindeloos.
            </p>
            <p>
              We hebben Anytimer gebouwd omdat het bijhouden van anytimers in notities of in je hoofd nooit werkt omdat er dingen fout gaat of vergeten worden. Nu is daar deze app voor.
            </p>
          </div>
          <div class="about-visual">
            <div class="iou-card">
              <div class="iou-header">
                <span class="iou-label">Anytimer</span>
                <span class="iou-hash">#0042</span>
              </div>
              <div class="iou-body">
                <div class="iou-from">
                  <span class="iou-field-label">Van</span>
                  <span class="iou-name">Marty</span>
                </div>
                <div class="iou-arrow">
                  <div class="arrow-line"></div>
                  <div class="arrow-head"></div>
                </div>
                <div class="iou-to">
                  <span class="iou-field-label">Naar</span>
                  <span class="iou-name">Stijn</span>
                </div>
              </div>
              <div class="iou-footer">
                <span>Altijd uitdeelbaar</span>
              </div>
            </div>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat">
            <h3>100% Gratis</h3>
            <p>Geen abonnementen, geen verborgen kosten.</p>
          </div>
          <div class="stat">
            <h3>Volg elke dare</h3>
            <p>Drankjes, gunsten, weddenschappen — alles kan.</p>
          </div>
          <div class="stat">
            <h3>Tussen vrienden</h3>
            <p>Gemaakt voor echte vriendschappen, niet voor volgers.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
      margin-bottom: 100px;
    }

    .about-text h2 {
      font-size: 2.5rem;
      margin-bottom: 28px;
    }
    .about-text p {
      font-size: 1.05rem;
      margin-bottom: 20px;
    }
    .about-text p:last-child { margin-bottom: 0; }

    .about-visual {
      padding-top: 40px;
      display: flex;
      justify-content: center;
    }

    /* IOU Card illustration */
    .iou-card {
      width: 260px;
      background: white;
      border: 2px solid var(--text-main);
      border-radius: 12px;
      overflow: hidden;
    }
    .iou-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-light);
    }
    .iou-label {
      font-weight: 700;
      font-size: 0.9rem;
    }
    .iou-hash {
      font-size: 0.8rem;
      color: var(--text-tertiary);
      font-family: monospace;
    }
    .iou-body {
      padding: 28px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .iou-from, .iou-to {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .iou-field-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
    }
    .iou-name {
      font-weight: 600;
      font-size: 1.1rem;
    }
    .iou-arrow {
      display: flex;
      align-items: center;
      gap: 0;
    }
    .arrow-line {
      width: 40px;
      height: 2px;
      background: var(--primary);
    }
    .arrow-head {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid var(--primary);
    }
    .iou-footer {
      padding: 12px 20px;
      border-top: 1px dashed var(--border-light);
      text-align: center;
    }
    .iou-footer span {
      font-size: 0.75rem;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Stats */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 48px;
      border-top: 1px solid var(--border-light);
      padding-top: 60px;
    }
    .stat h3 {
      font-size: 1.25rem;
      margin-bottom: 8px;
    }
    .stat p {
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        margin-bottom: 60px;
      }
      .about-text h2 { font-size: 2rem; }
      .about-visual { padding-top: 0; }
      .stats-row {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }
  `]
})
export class AboutComponent {}
