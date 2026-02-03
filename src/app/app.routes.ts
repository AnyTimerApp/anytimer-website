import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Mindify - Home' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacy Policy' },
  { path: 'terms', component: TermsComponent, title: 'Terms of Use' },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' }
];
