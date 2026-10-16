import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../i18n/language.service';

const TEXT = {
  nl: {
    tag: 'De anytimer app',
    title: 'De App om je anytimers bij te houden.',
    subtitle: 'Vergeet nooit meer wie jou een anytimer schuldig is. Spaar, deel uit en houd bij.',
    playSmall: 'Beschikbaar op',
    playAria: 'Download on Google Play',
    appleSmall: 'Download in de',
    appleAria: 'Download in de App Store',
    cardTopTitle: 'Anytimer ingezet',
    cardTopMeta: '1 min geleden',
    cardBottomTitle: 'Adtje in 2,4 sec'
  },
  en: {
    tag: 'The anytimer app',
    title: 'The app to keep track of your anytimers.',
    subtitle: 'Never forget who owes you an anytimer again. Save them, hand them out and keep track.',
    playSmall: 'Get it on',
    playAria: 'Get it on Google Play',
    appleSmall: 'Download on the',
    appleAria: 'Download on the App Store',
    cardTopTitle: 'Anytimer used',
    cardTopMeta: '1 min ago',
    cardBottomTitle: 'Chugged in 2.4 sec'
  }
};

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: 'hero.component.html',
  styleUrl: 'hero.component.scss'
})
export class HeroComponent {
  readonly t = TEXT[inject(LanguageService).lang()];

  // Flat app screenshot shown inside the CSS phone frame, e.g. 'assets/hero/app-screenshot.webp'.
  // Leave empty to fall back to the existing friendlist mockup image.
  readonly screenshot = '';
}
