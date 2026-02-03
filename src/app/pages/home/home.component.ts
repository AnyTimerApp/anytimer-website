import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { PricingComponent } from '../pricing/pricing.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FeaturesComponent, PricingComponent, FooterComponent, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-features></app-features>
      <app-pricing></app-pricing>
    </main>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}
