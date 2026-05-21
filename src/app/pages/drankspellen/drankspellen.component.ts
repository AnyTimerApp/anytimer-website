import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drankspellen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'drankspellen.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './drankspellen.component.scss']
})
export class DrankspellenComponent {
  constructor(meta: Meta) {
    const title = 'Top 10 Drankspellen voor een Gezellige Avond | AnyTimerApp';
    const description = 'Ontdek de top 10 leukste drankspellen voor een gezellige avond met vrienden. Mario Barf, Kingsen, Mexen en meer. Alle spelregels en tips.';
    const image = 'https://anytimer.app/assets/blogs/drankspellen/mario%20barf.png';
    const url = 'https://anytimer.app/drankspellen/';

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
