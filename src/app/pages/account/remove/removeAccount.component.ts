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
    const title = 'Account Verwijderen Anytimer - Stap-voor-Stap Gids';
    const description = 'Account verwijderen bij Anytimer? Lees onze stap-voor-stap gids. Ontdek wat er gebeurt met je gegevens en hoe je je account permanent verwijdert.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/remove-account/';

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
