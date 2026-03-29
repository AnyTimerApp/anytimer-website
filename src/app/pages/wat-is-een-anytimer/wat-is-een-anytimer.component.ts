import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wat-is-een-anytimer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'wat-is-een-anytimer.component.html',
  styleUrl: '../juridisch/juridisch.component.scss'
})
export class WatIsEenAnytimer {
  constructor(meta: Meta) {
    const title = 'Wat is een anytimer? — Anytimer App';
    const description = 'Wat is een anytimer? Een anytimer is een tegoed dat je van een vriend krijgt of aan iemand geeft — in te zetten op elk moment. Lees alles over het concept achter de anytimerapp.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/wat-is-een-anytimer';

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
