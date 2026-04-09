import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/juridisch/privacy/privacy.component';
import { TermsComponent } from './pages/juridisch/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RemoveAccountComponent } from './pages/account/remove/removeAccount.component';
import { WatIsEenAnytimer } from './pages/wat-is-een-anytimer/wat-is-een-anytimer.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Anytimer — Vergeet nooit op wie je nog anytimers hebt' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid Anytimer App - AVG-Conform & Veilig' },
  { path: 'remove-account', component: RemoveAccountComponent, title: 'Account Verwijderen Anytimer - Stap-voor-Stap Gids' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden Anytimer App - Regels & Voorwaarden' },
  { path: 'contact', component: ContactComponent, title: 'Contact AnyTimerApp - Vragen, Feedback & Samenwerking' },
  { path: 'blog', component: BlogComponent, title: 'Anytimer Blog - Tips, Ideeën & Gidsen — Anytimer App' },
  { path: 'wat-is-een-anytimer', component: WatIsEenAnytimer, title: 'Wat is een Anytimer? - Gids & Uitleg | Anytimer App' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
