import { Component } from '@angular/core';
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
export class HomeComponent {}
