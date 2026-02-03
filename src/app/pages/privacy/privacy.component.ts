import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container page-content">
      <h1>Privacybeleid</h1>
      <p class="date">Laatst bijgewerkt: januari 2025</p>

      <div class="content-block">
        <h3>1. Introductie</h3>
        <p>Anytimer ("wij", "ons" of "onze") beheert de Anytimer mobiele applicatie en website. Deze pagina informeert je over ons beleid met betrekking tot het verzamelen, gebruiken en openbaar maken van persoonlijke gegevens wanneer je onze dienst gebruikt.</p>

        <h3>2. Gegevensverzameling</h3>
        <p>We verzamelen informatie die je direct verstrekt, zoals je naam en e-mailadres bij het aanmaken van een account. Daarnaast verzamelen we gebruiksgegevens om de app-ervaring te verbeteren, waaronder hoe je omgaat met functies zoals het geven en verzilveren van anytimers.</p>

        <h3>3. Rechten van gebruikers</h3>
        <p>Je hebt het recht om je persoonlijke gegevens op elk moment in te zien, bij te werken of te verwijderen. Je kunt een kopie van je gegevens opvragen of ons vragen je account te verwijderen via onze contactpagina.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding-top: calc(var(--header-height) + 60px);
      padding-bottom: 60px;
      max-width: 800px;
    }
    .date { color: var(--text-tertiary); margin-bottom: 40px; }
    .content-block h3 { color: var(--primary); margin-top: 32px; margin-bottom: 8px; }
    .content-block p { margin-bottom: 16px; }
  `]
})
export class PrivacyComponent {}
