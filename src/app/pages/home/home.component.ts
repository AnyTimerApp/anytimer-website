import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HowItWorksComponent, FeaturesComponent, AboutComponent, TeamComponent],
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  constructor(meta: Meta) {
    const title = 'Anytimer App — Vergeet nooit meer wie jou een anytimer schuldig is';
    const description = 'Houd anytimers bij met de gratis Anytimer app. Wat is een anytimer? Een tegoed dat je op elk moment kunt inzetten. Download de anytimerapp en vergeet nooit meer wie jou er een schuldig is.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/';

    meta.updateTag({ name: 'description', content: description });

    // Open Graph
    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    // Twitter Card
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
