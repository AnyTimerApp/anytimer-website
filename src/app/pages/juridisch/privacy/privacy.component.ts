import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'privacy.component.html',
  styleUrl: '../juridisch.component.scss'
})
export class PrivacyComponent {
  constructor(meta: Meta) {
    const title = 'Privacybeleid — Anytimer App';
    const description = 'Privacybeleid van de Anytimer app. Wij gaan zorgvuldig om met jouw gegevens — AVG-conform, geen advertenties en geen dataverkoop aan derden.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/privacy';

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
