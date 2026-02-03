import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact-page">
      <div class="container">
        <h1>Contact</h1>
        <p class="intro">
          Wil je ons bereiken? Dat kan altijd. Of het nu gaat om vragen, problemen, feedback of een samenwerking — we staan open voor alles. In dit geval kunt u ons bereiken per email en proberen we u zo snel mogelijk verder te helpen.
        </p>

        <div class="reasons">
          <div class="reason">
            <h3>Informatie</h3>
            <p>Heb je een vraag over de app of wil je meer weten over Anytimer? Laat het ons weten.</p>
          </div>
          <div class="reason">
            <h3>Problemen</h3>
            <p>Loop je ergens tegenaan in de app? Technisch of juist contextueel. Stuur ons een bericht en we helpen je zo snel mogelijk.</p>
          </div>
          <div class="reason">
            <h3>Samenwerking</h3>
            <p>Heb je een idee voor een samenwerking of wil je bijdragen aan Anytimer? We horen het graag!</p>
          </div>
        </div>

        <div class="email-block">
          <p>Stuur ons een mail op</p>
          <a href="mailto:info@anytimer.app" class="email-link">info&#64;anytimer.app</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
      padding-top: calc(var(--header-height) + 80px);
      padding-bottom: 120px;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .intro {
      font-size: 1.15rem;
      margin-bottom: 60px;
    }

    .reasons {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-bottom: 60px;
    }
    .reason h3 {
      font-size: 1.05rem;
      margin-bottom: 6px;
    }
    .reason p {
      font-size: 0.95rem;
    }

    .email-block p {
      font-size: 1rem;
      margin-bottom: 8px;
    }
    .email-link {
      display: inline-block;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary);
    }
    .email-link:hover {
      text-decoration: underline;
    }
  `]
})
export class ContactComponent {}
