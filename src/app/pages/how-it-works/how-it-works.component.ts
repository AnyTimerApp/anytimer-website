import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: `
    <section class="section" id="hoe-het-werkt">
      <div class="container">
        <h2 class="section-heading">Hoe het werkt</h2>

        <div class="timeline">
          <div class="timeline-line"></div>

          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Voeg vrienden toe</h3>
              <p>
                Voeg je vrienden in de app toe aan je vrienden lijst.
                Dit doe je door ze op te zoeken via hun gebruikersnaam in de app.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Verdien</h3>
              <p>
                Iemand wint een weddenschap of doet iets geks en verdient daarom een anytimer op de andere persoon.
                Open de app, selecteer de vriend en voeg een anytimer toe aan deze persoon.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Houd bij</h3>
              <p>
                Elke anytimer wordt automatisch bijgehouden. Check je saldo wanneer je wilt —
                zie wie jou iets schuldig is en wat jij nog kan inzetten.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Deel uit</h3>
              <p>
                Het perfecte moment is aangebroken. Je vriend is brak of heeft een zware dag gehad.
                Je deelt hem uit en deze vriend krijgt een melding van de app. Hij moet nu de anytimer nemen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-heading {
      font-size: 2.5rem;
      margin-bottom: 50px;
    }

    .timeline {
      position: relative;
      padding-left: 60px;
    }

    .timeline-line {
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border-light);
    }

    .step {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 32px;
      margin-bottom: 80px;
    }
    .step:last-child { margin-bottom: 0; }

    .step-number {
      position: absolute;
      left: -60px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
      z-index: 1;
    }

    .step-content {
      max-width: 480px;
    }
    .step-content h3 {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }
    .step-content p {
      font-size: 1.05rem;
    }

    @media (max-width: 768px) {
      .section-heading { font-size: 2rem; }
      .timeline { padding-left: 48px; }
      .timeline-line { left: 14px; }
      .step-number {
        left: -48px;
        width: 32px;
        height: 32px;
        font-size: 1rem;
      }
      .step { margin-bottom: 56px; }
    }
  `]
})
export class HowItWorksComponent {}
