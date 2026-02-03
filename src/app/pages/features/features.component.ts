import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="features">
      <div class="container">
        <h2 class="section-heading">Waarom is het handig?</h2>

        <div class="feature-row">
          <div class="feature-text">
            <h3>Nooit vergeten</h3>
            <p>
              Elke anytimer wordt gelogd. Zie wie er nog op jouw anytimers heeft, wat jij nog
              kan uitdelen op andere en de volledige geschiedenis van elke vriend. Geen misverstanden meer van anytimers die eigenlijk al uitgedeelt zijn..
            </p>
          </div>
          <div class="feature-visual">
            <div class="illustration ledger">
              <div class="ledger-line"></div>
              <div class="ledger-line medium"></div>
              <div class="ledger-line short"></div>
              <div class="ledger-line"></div>
              <div class="ledger-dot"></div>
            </div>
          </div>
        </div>

        <div class="feature-row reverse">
          <div class="feature-text">
            <h3>Geven &amp; ontvangen</h3>
            <p>
              Weddenschap verloren of juist gewonnen? het is één centrale plek voor het sparen en uitdelen van anytimers.
            </p>
          </div>
          <div class="feature-visual">
            <div class="illustration gift">
              <div class="gift-box">
                <div class="gift-lid"></div>
                <div class="gift-body"></div>
                <div class="gift-ribbon-v"></div>
                <div class="gift-ribbon-h"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-row">
          <div class="feature-text">
            <h3>Deel uit</h3>
            <p>
              Deel een anytimer op het perfecte moment uit. Je vriend krijg realtime een notificatie binnen op zijn telefoon en oet direct een bak trekken.
            </p>
          </div>
          <div class="feature-visual">
            <div class="illustration trophy">
              <div class="trophy-cup"></div>
              <div class="trophy-stem"></div>
              <div class="trophy-base"></div>
            </div>
          </div>
        </div>

<!--        <div class="feature-row reverse">-->
<!--          <div class="feature-text">-->
<!--            <h3>Vriendengroepen</h3>-->
<!--            <p>-->
<!--              Maak groepen aan voor je vriendenkring, sportteam of huisgenoten.-->
<!--              Houd al je anytimers overzichtelijk op één plek.-->
<!--            </p>-->
<!--          </div>-->
<!--          <div class="feature-visual">-->
<!--            <div class="illustration people">-->
<!--              <div class="person p1"></div>-->
<!--              <div class="person p2"></div>-->
<!--              <div class="person p3"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </section>
  `,
  styles: [`
    .section-heading {
      font-size: 2.5rem;
      margin-bottom: 80px;
    }

    .feature-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
      margin-bottom: 100px;
    }
    .feature-row:last-child { margin-bottom: 0; }

    .feature-row.reverse { direction: rtl; }
    .feature-row.reverse > * { direction: ltr; }

    .feature-text h3 {
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
    .feature-text p {
      font-size: 1.05rem;
      max-width: 400px;
    }

    .feature-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .illustration {
      width: 200px;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Gift illustration */
    .gift-box { position: relative; }
    .gift-body {
      width: 80px;
      height: 60px;
      background: var(--primary);
      border-radius: 4px;
    }
    .gift-lid {
      width: 90px;
      height: 16px;
      background: var(--primary-hover);
      border-radius: 4px;
      margin: 0 auto 2px;
      margin-left: -5px;
    }
    .gift-ribbon-v {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 10px;
      height: 100%;
      background: #FFD700;
      opacity: 0.7;
    }
    .gift-ribbon-h {
      position: absolute;
      top: 45px;
      left: 0;
      width: 100%;
      height: 10px;
      background: #FFD700;
      opacity: 0.7;
    }

    /* Ledger illustration */
    .ledger {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 24px;
    }
    .ledger-line {
      width: 140px;
      height: 8px;
      background: var(--border-light);
      border-radius: 4px;
    }
    .ledger-line.medium { width: 100px; }
    .ledger-line.short { width: 70px; }
    .ledger-dot {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 50%;
      position: absolute;
      left: 12px;
      top: 78px;
    }

    /* Trophy illustration */
    .trophy {
      flex-direction: column;
      align-items: center;
    }
    .trophy-cup {
      width: 60px;
      height: 50px;
      background: #FFD700;
      border-radius: 4px 4px 30px 30px;
    }
    .trophy-stem {
      width: 12px;
      height: 20px;
      background: #B8860B;
    }
    .trophy-base {
      width: 50px;
      height: 10px;
      background: #B8860B;
      border-radius: 2px;
    }

    /* People illustration */
    .people {
      gap: 0;
    }
    .person {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 3px solid white;
      position: absolute;
    }
    .p1 {
      background: var(--primary);
      left: 50px;
      z-index: 3;
    }
    .p2 {
      background: var(--primary-hover);
      left: 80px;
      z-index: 2;
    }
    .p3 {
      background: var(--primary-light);
      left: 110px;
      z-index: 1;
    }

    @media (max-width: 768px) {
      .feature-row {
        grid-template-columns: 1fr;
        gap: 40px;
        margin-bottom: 60px;
      }
      .feature-row.reverse { direction: ltr; }
      .section-heading { font-size: 2rem; }
    }
  `]
})
export class FeaturesComponent {
  //todo nog niet groepen
}
