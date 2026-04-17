import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/juridisch/privacy/privacy.component';
import { TermsComponent } from './pages/juridisch/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RemoveAccountComponent } from './pages/account/remove/removeAccount.component';
import { WatIsEenAnytimer } from './pages/wat-is-een-anytimer/wat-is-een-anytimer.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DrankspellenComponent } from './pages/drankspellen/drankspellen.component';
import { WatIsEenAdtjeComponent } from './pages/wat-is-een-adtje/wat-is-een-adtje.component';
import { WatIsDeBestAdtTimerComponent } from './pages/wat-is-de-beste-adt-timer/wat-is-de-beste-adt-timer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Anytimer — Vergeet nooit op wie je nog anytimers hebt' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid Anytimer App - AVG-Conform & Veilig' },
  { path: 'remove-account', component: RemoveAccountComponent, title: 'Account Verwijderen Anytimer - Stap-voor-Stap Gids' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden Anytimer App - Regels & Voorwaarden' },
  { path: 'contact', component: ContactComponent, title: 'Contact AnyTimerApp - Vragen, Feedback & Samenwerking' },
  { path: 'blog', component: BlogComponent, title: 'Anytimer Blog - Tips, Ideeën & Gidsen — Anytimer App' },
  { path: 'drankspellen', component: DrankspellenComponent, title: 'Top 10 Drankspellen voor een Gezellige Avond | Anytimer' },
  { path: 'wat-is-een-anytimer', component: WatIsEenAnytimer, title: 'Wat is een Anytimer? - Gids & Uitleg | Anytimer App' },
  { path: 'wat-is-een-adtje', component: WatIsEenAdtjeComponent, title: 'Wat is een Adtje? - Gids & Uitleg | Anytimer' },
  { path: 'wat-is-de-beste-adt-timer', component: WatIsDeBestAdtTimerComponent, title: 'Wat is de Beste Adt Timer? - Gids & Opties | Anytimer' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
