import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'terms.component.html',
  styleUrl: '../juridisch.component.scss'
})
export class TermsComponent {
  constructor(meta: Meta) {
    const title = 'Gebruiksvoorwaarden — Anytimer App';
    const description = 'Gebruiksvoorwaarden van de Anytimer app. Lees wat je van ons mag verwachten en welke regels gelden voor het gebruik van de anytimerapp.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/terms';

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    meta.updateTag({ name: 'twitter:card', content: 'summary' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
