import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-en',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'terms.en.component.html',
  styleUrl: '../../juridisch/juridisch.component.scss'
})
export class TermsEnComponent {
  constructor(meta: Meta) {
    const title = 'AnyTimerApp terms of use: rules and conditions';
    const description = 'Read the AnyTimerApp terms of use. See which rules apply when you use the app and what you can expect from us.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/en/terms/';

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
