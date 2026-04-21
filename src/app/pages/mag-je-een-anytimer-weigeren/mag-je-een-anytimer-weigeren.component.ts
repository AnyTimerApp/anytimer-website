import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mag-je-een-anytimer-weigeren',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'mag-je-een-anytimer-weigeren.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './mag-je-een-anytimer-weigeren.component.scss']
})
export class MagJeEenAnyttimerWeigerenComponent {
  constructor(meta: Meta) {
    const title = 'Mag je een Anytimer Weigeren? - Regels & Gevolgen | AnyTimerApp';
    const description = 'Mag je een anytimer weigeren? Lees de regels en gevolgen. Wanneer mag je nee zeggen, wat zijn de straffen, en wanneer mag je geen anytimer inzetten.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/mag-je-een-anytimer-weigeren/';

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
