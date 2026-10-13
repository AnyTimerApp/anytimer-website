import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: 'hero.component.html',
  styleUrl: 'hero.component.scss'
})
export class HeroComponent {
  // Flat app screenshot shown inside the CSS phone frame, e.g. 'assets/hero/app-screenshot.webp'.
  // Leave empty to fall back to the existing friendlist mockup image.
  readonly screenshot = '';
}
