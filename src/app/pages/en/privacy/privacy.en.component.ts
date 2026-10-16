import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-en',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'privacy.en.component.html',
  styleUrl: '../../juridisch/juridisch.component.scss'
})
export class PrivacyEnComponent {
  constructor(meta: Meta) {
    const title = 'AnyTimerApp Privacy Policy: GDPR Compliant & Secure';
    const description = 'Read the AnyTimerApp privacy policy. We handle your data with care. GDPR compliant, no ads and we never sell your data.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/en/privacy/';

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
