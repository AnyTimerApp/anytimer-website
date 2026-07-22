import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wat-is-een-anytimer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'wat-is-een-anytimer.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './wat-is-een-anytimer.component.scss']
})
export class WatIsEenAnytimer {
  constructor(meta: Meta) {
    const title = 'Wat is een Anytimer? - Gids & Uitleg | Anytimer App';
    const description = 'Wat is een anytimer? Ontdek alles over dit concept: een tegoed in te zetten op elk moment. Lees hoe je het verdient, inzet en waarom je het nodig hebt.';
    const image = 'https://anytimer.app/assets/blogs/wat%20is%20een%20anytimer/Wat%20is%20een%20anytimer%20cover.png';
    const url = 'https://anytimer.app/wat-is-een-anytimer/';

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
