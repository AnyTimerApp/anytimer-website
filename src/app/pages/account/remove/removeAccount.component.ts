import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-removeAccount',
  standalone: true,
  templateUrl: 'removeAccount.component.html',
  styleUrl: '../../juridisch/juridisch.component.scss'
})
export class RemoveAccountComponent {
  constructor(meta: Meta) {
    const title = 'Account verwijderen — Anytimer App';
    const description = 'Verwijder je Anytimer account via de app-instellingen. Stap-voor-stap uitleg over hoe het werkt en wat er met je gegevens gebeurt na verwijdering.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/remove-account';

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
