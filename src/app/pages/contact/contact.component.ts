import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: 'contact.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', 'contact.component.scss']
})
export class ContactComponent {
  constructor(meta: Meta) {
    const title = 'Contact — Anytimer App';
    const description = 'Neem contact op met het Anytimer team. Heb je een vraag over de anytimerapp, een probleem of een idee? Stuur ons een mail — we reageren binnen 48 uur.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/contact';

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
