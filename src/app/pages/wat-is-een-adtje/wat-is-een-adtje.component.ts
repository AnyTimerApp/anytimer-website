import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wat-is-een-adtje',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'wat-is-een-adtje.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './wat-is-een-adtje.component.scss']
})
export class WatIsEenAdtjeComponent {
  constructor(meta: Meta) {
    const title = 'Wat is een Adtje? - Gids & Uitleg | AnyTimerApp';
    const description = 'Wat is een adtje? Lees alles over atten, shotgun en rietbak. Tips voor snel drinken, de oorsprong en alle drankspel tradities uit Nederland.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/wat-is-een-adtje/';

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
