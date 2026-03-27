import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/juridisch/privacy/privacy.component';
import { TermsComponent } from './pages/juridisch/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RemoveAccountComponent } from './pages/account/remove/removeAccount.component';
import { WatIsEenAnytimer } from './pages/wat-is-een-anytimer/wat-is-een-anytimer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Anytimer — Vergeet nooit op wie je nog anytimers hebt' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid — Anytimer' },
  { path: 'remove-account', component: RemoveAccountComponent, title: 'Account verwijderen — Anytimer' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden — Anytimer' },
  { path: 'contact', component: ContactComponent, title: 'Contact — Anytimer' },
  { path: 'wat-is-een-anytimer', component: WatIsEenAnytimer, title: 'Wat is een anytimer? — Anytimer App' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
