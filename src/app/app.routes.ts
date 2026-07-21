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
import { MagJeEenAnyttimerWeigerenComponent } from './pages/mag-je-een-anytimer-weigeren/mag-je-een-anytimer-weigeren.component';
import { AnytimersWhatsappNotitiesComponent } from './pages/anytimers-bijhouden-whatsapp-notities/anytimers-bijhouden-whatsapp-notities.component';
import { HuisavondideeenComponent } from './pages/huisavondideeen/huisavondideeen.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AnyTimerApp - De app om je anytimers in bij te houden' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid AnyTimerApp - AVG-Conform & Veilig' },
  { path: 'remove-account', component: RemoveAccountComponent, title: 'Account Verwijderen AnyTimerApp - Stap-voor-Stap Gids' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden AnyTimerApp - Regels & Voorwaarden' },
  { path: 'contact', component: ContactComponent, title: 'Contact AnyTimerApp - Vragen, Feedback & Samenwerking' },
  { path: 'blog', component: BlogComponent, title: 'AnyTimerApp Blog - Tips, Ideeën & Gidsen' },
  { path: 'drankspellen', component: DrankspellenComponent, title: 'Top 10 Drankspellen voor een Gezellige Avond | AnyTimerApp' },
  { path: 'wat-is-een-anytimer', component: WatIsEenAnytimer, title: 'Wat is een Anytimer? - Gids & Uitleg | AnyTimerApp' },
  { path: 'wat-is-een-adtje', component: WatIsEenAdtjeComponent, title: 'Wat is een Adtje? - Gids & Uitleg | AnyTimerApp' },
  { path: 'wat-is-de-beste-adt-timer', component: WatIsDeBestAdtTimerComponent, title: 'Wat is de Beste Adt Timer? - Gids & Opties | AnyTimerApp' },
  { path: 'mag-je-een-anytimer-weigeren', component: MagJeEenAnyttimerWeigerenComponent, title: 'Mag je een Anytimer Weigeren? - Regels & Gevolgen | AnyTimerApp' },
  { path: 'anytimers-bijhouden-whatsapp-notities', component: AnytimersWhatsappNotitiesComponent, title: 'Waarom je Anytimers niet in WhatsApp of Notities Bijhoudt | AnyTimerApp' },
  { path: 'huisavondideeen', component: HuisavondideeenComponent, title: 'Top 10 Leuke Huisavondideeën | AnyTimerApp' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
