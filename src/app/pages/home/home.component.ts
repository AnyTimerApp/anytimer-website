import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { AboutComponent } from '../about/about.component';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HowItWorksComponent, FeaturesComponent, AboutComponent, TeamComponent],
  template: `
    <app-hero></app-hero>
    <app-how-it-works></app-how-it-works>
    <app-features></app-features>
    <app-about></app-about>
    <app-team></app-team>
  `
})
export class HomeComponent {}
