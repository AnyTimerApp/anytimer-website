import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-remove-account-en',
  standalone: true,
  templateUrl: 'remove-account.en.component.html',
  styleUrl: '../../juridisch/juridisch.component.scss'
})
export class RemoveAccountEnComponent {
  constructor(meta: Meta) {
    const title = 'Delete Your AnyTimerApp Account: Step by Step';
    const description = 'Want to delete your AnyTimerApp account? Follow our step by step guide. See what happens to your data and how to delete your account for good.';
    const image = 'https://anytimer.app/assets/logo.png';
    const url = 'https://anytimer.app/en/remove-account/';

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
