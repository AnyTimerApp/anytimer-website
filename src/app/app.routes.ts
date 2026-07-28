import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/juridisch/privacy/privacy.component';
import { TermsComponent } from './pages/juridisch/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RemoveAccountComponent } from './pages/account/remove/removeAccount.component';
import { WatIsEenAnytimer } from './pages/blogs/begrippen/wat-is-een-anytimer/wat-is-een-anytimer.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DrankspellenComponent } from './pages/blogs/inspiratie/drankspellen/drankspellen.component';
import { WatIsEenAdtjeComponent } from './pages/blogs/begrippen/wat-is-een-adtje/wat-is-een-adtje.component';
import { WatIsDeBestAdtTimerComponent } from './pages/blogs/inspiratie/wat-is-de-beste-adt-timer/wat-is-de-beste-adt-timer.component';
import { MagJeEenAnyttimerWeigerenComponent } from './pages/blogs/weetjes/mag-je-een-anytimer-weigeren/mag-je-een-anytimer-weigeren.component';
import { AnytimersWhatsappNotitiesComponent } from './pages/blogs/weetjes/anytimers-bijhouden-whatsapp-notities/anytimers-bijhouden-whatsapp-notities.component';
import { HuisavondideeenComponent } from './pages/blogs/inspiratie/huisavondideeen/huisavondideeen.component';
import { JeuDeBierComponent } from './pages/blogs/drankspelletjes/jeu-de-bier/jeu-de-bier.component';
import { BlogCategoryComponent } from './pages/blog-category/blog-category.component';
import { MarioBarfComponent } from './pages/blogs/drankspelletjes/mario-barf/mario-barf.component';
import { TrekJeBakManiaComponent } from './pages/blogs/drankspelletjes/trek-je-bak-mania/trek-je-bak-mania.component';
import { ThirtySecondsComponent } from './pages/blogs/drankspelletjes/30-seconds/30-seconds.component';
import { KingsenComponent } from './pages/blogs/drankspelletjes/kingsen/kingsen.component';
import { StressPongComponent } from './pages/blogs/drankspelletjes/stress-pong/stress-pong.component';
import { FuckTheDealerComponent } from './pages/blogs/drankspelletjes/fuck-the-dealer/fuck-the-dealer.component';
import { MexenComponent } from './pages/blogs/drankspelletjes/mexen/mexen.component';
import { BakplatenComponent } from './pages/blogs/drankspelletjes/bakplaten/bakplaten.component';
import { DePaardenraceComponent } from './pages/blogs/drankspelletjes/de-paardenrace/de-paardenrace.component';
import { RingOfFireComponent } from './pages/blogs/drankspelletjes/ring-of-fire/ring-of-fire.component';
import { MijnenveldComponent } from './pages/blogs/drankspelletjes/mijnenveld/mijnenveld.component';
import { StefStuntpilootComponent } from './pages/blogs/drankspelletjes/stef-stuntpiloot/stef-stuntpiloot.component';
import { VingerenComponent } from './pages/blogs/drankspelletjes/vingeren/vingeren.component';
import { VikingenComponent } from './pages/blogs/drankspelletjes/vikingen/vikingen.component';
import { ZeeslagComponent } from './pages/blogs/drankspelletjes/zeeslag/zeeslag.component';
import { KusjeGevenComponent } from './pages/blogs/drankspelletjes/kusje-geven/kusje-geven.component';
import { BussenComponent } from './pages/blogs/drankspelletjes/bussen/bussen.component';
import { HogerLagerComponent } from './pages/blogs/drankspelletjes/hoger-lager/hoger-lager.component';
import { KrokodillenspelComponent } from './pages/blogs/drankspelletjes/krokodillenspel/krokodillenspel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AnyTimerApp - De app om je anytimers in bij te houden' },
  { path: 'privacy', component: PrivacyComponent, title: 'Privacybeleid AnyTimerApp - AVG-Conform & Veilig' },
  { path: 'remove-account', component: RemoveAccountComponent, title: 'Account Verwijderen AnyTimerApp - Stap-voor-Stap Gids' },
  { path: 'terms', component: TermsComponent, title: 'Gebruiksvoorwaarden AnyTimerApp - Regels & Voorwaarden' },
  { path: 'contact', component: ContactComponent, title: 'Contact AnyTimerApp - Vragen, Feedback & Samenwerking' },
  { path: 'blog', component: BlogComponent, title: 'AnyTimerApp Blog - Tips, Ideeën & Gidsen' },
  { path: 'blog/begrippen', component: BlogCategoryComponent, title: 'Anytimer Begrippen Uitgelegd | AnyTimerApp', data: { category: 'Begrippen' } },
  { path: 'blog/inspiratie', component: BlogCategoryComponent, title: 'Inspiratie voor een Leuke Avond | AnyTimerApp', data: { category: 'Inspiratie' } },
  { path: 'blog/weetjes', component: BlogCategoryComponent, title: 'Anytimer Weetjes & Regels | AnyTimerApp', data: { category: 'Weetjes' } },
  { path: 'blog/drankspelletjes', component: BlogCategoryComponent, title: 'Drankspelletjes: Spelregels & Tips | AnyTimerApp', data: { category: 'Drankspelletjes' } },
  { path: 'drankspellen', component: DrankspellenComponent, title: 'Top 10 Leukste Drankspellen voor een Gezellige Avond | AnyTimerApp' },
  { path: 'wat-is-een-anytimer', component: WatIsEenAnytimer, title: 'Wat is een Anytimer? - Gids & Uitleg | AnyTimerApp' },
  { path: 'wat-is-een-adtje', component: WatIsEenAdtjeComponent, title: 'Wat is een Adtje? - Gids & Uitleg | AnyTimerApp' },
  { path: 'wat-is-de-beste-adt-timer', component: WatIsDeBestAdtTimerComponent, title: 'Wat is de Beste Adt Timer? - Gids & Opties | AnyTimerApp' },
  { path: 'mag-je-een-anytimer-weigeren', component: MagJeEenAnyttimerWeigerenComponent, title: 'Mag je een Anytimer Weigeren? - Regels & Gevolgen | AnyTimerApp' },
  { path: 'anytimers-bijhouden-whatsapp-notities', component: AnytimersWhatsappNotitiesComponent, title: 'Waarom je Anytimers niet in WhatsApp of Notities Bijhoudt | AnyTimerApp' },
  { path: 'huisavondideeen', component: HuisavondideeenComponent, title: 'Top 10 Leuke Huisavondideeën | AnyTimerApp' },
  { path: 'blog/drankspelletjes/jeu-de-bier', component: JeuDeBierComponent, title: 'Jeu de Bier - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/mario-barf', component: MarioBarfComponent, title: 'Mario Barf - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/trek-je-bak-mania', component: TrekJeBakManiaComponent, title: 'Trek je Bak Mania - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/30-seconds', component: ThirtySecondsComponent, title: '30 Seconds - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/kingsen', component: KingsenComponent, title: 'Kingsen - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/stress-pong', component: StressPongComponent, title: 'Stress Pong - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/fuck-the-dealer', component: FuckTheDealerComponent, title: 'Fuck the Dealer - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/mexen', component: MexenComponent, title: 'Mexen - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/bakplaten', component: BakplatenComponent, title: 'Bakplaten - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/de-paardenrace', component: DePaardenraceComponent, title: 'De Paardenrace - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/ring-of-fire', component: RingOfFireComponent, title: 'Ring of fire - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/mijnenveld', component: MijnenveldComponent, title: 'Mijnenveld - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/stef-stuntpiloot', component: StefStuntpilootComponent, title: 'Stef stuntpiloot - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/vingeren', component: VingerenComponent, title: 'Vingeren - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/vikingen', component: VikingenComponent, title: 'Vikingen - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/zeeslag', component: ZeeslagComponent, title: 'Zeeslag - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/kusje-geven', component: KusjeGevenComponent, title: 'Kusje geven - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/bussen', component: BussenComponent, title: 'Bussen - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/hoger-lager', component: HogerLagerComponent, title: 'Hoger lager - Spelregels & Tips | AnyTimerApp' },
  { path: 'blog/drankspelletjes/krokodillenspel', component: KrokodillenspelComponent, title: 'Krokodillenspel - Spelregels & Tips | AnyTimerApp' },
  { path: '**', component: NotFoundComponent, title: '404 Niet gevonden' }
];
