import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Anytimer — Vergeet nooit op wie je nog anytimer\'s hebt' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid — Anytimer' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden — Anytimer' },
  { path: 'contact', component: ContactComponent, title: 'Contact — Anytimer' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
