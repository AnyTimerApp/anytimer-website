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
    meta.updateTag({ name: 'description', content: 'Houd anytimers bij met de gratis Anytimer app. Wat is een anytimer? Een tegoed dat je op elk moment kunt inzetten. Download de anytimerapp en vergeet nooit meer wie jou er een schuldig is.' });
  }
}
