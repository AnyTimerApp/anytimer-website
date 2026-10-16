import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogCategoryComponent } from './pages/blog-category/blog-category.component';
import { DICTIONARY_POSTS_EN } from './pages/blog/dictionary.en.data';
import { ContactEnComponent } from './pages/en/contact/contact.en.component';
import { PrivacyEnComponent } from './pages/en/privacy/privacy.en.component';
import { TermsEnComponent } from './pages/en/terms/terms.en.component';
import { RemoveAccountEnComponent } from './pages/en/remove-account/remove-account.en.component';
import { WhatIsAnAnytimerComponent } from './pages/en/blogs/dictionary/what-is-an-anytimer/what-is-an-anytimer.component';
import { WhatIsAnAdtjeComponent } from './pages/en/blogs/dictionary/what-is-an-adtje/what-is-an-adtje.component';
import { BestDrinkingGamesComponent } from './pages/en/blogs/inspiration/best-drinking-games/best-drinking-games.component';
import { BestChugTimerComponent } from './pages/en/blogs/inspiration/best-chug-timer/best-chug-timer.component';
import { NightInIdeasForHousematesComponent } from './pages/en/blogs/inspiration/night-in-ideas-for-housemates/night-in-ideas-for-housemates.component';
import { CanYouRefuseAnAnytimerComponent } from './pages/en/blogs/good-to-know/can-you-refuse-an-anytimer/can-you-refuse-an-anytimer.component';
import { TrackingAnytimersInWhatsappComponent } from './pages/en/blogs/good-to-know/tracking-anytimers-in-whatsapp/tracking-anytimers-in-whatsapp.component';
import { JeuDeBierEnComponent } from './pages/en/blogs/drinking-games/jeu-de-bier/jeu-de-bier.component';
import { BeerioKartEnComponent } from './pages/en/blogs/drinking-games/beerio-kart/beerio-kart.component';
import { TrekJeBakManiaEnComponent } from './pages/en/blogs/drinking-games/trek-je-bak-mania/trek-je-bak-mania.component';
import { ThirtySecondsEnComponent } from './pages/en/blogs/drinking-games/30-seconds/30-seconds.component';
import { KingsenEnComponent } from './pages/en/blogs/drinking-games/kingsen/kingsen.component';
import { RageCageEnComponent } from './pages/en/blogs/drinking-games/rage-cage/rage-cage.component';
import { FuckTheDealerEnComponent } from './pages/en/blogs/drinking-games/fuck-the-dealer/fuck-the-dealer.component';
import { MexicoEnComponent } from './pages/en/blogs/drinking-games/mexico/mexico.component';
import { BakplatenEnComponent } from './pages/en/blogs/drinking-games/bakplaten/bakplaten.component';
import { HorseRaceEnComponent } from './pages/en/blogs/drinking-games/horse-race/horse-race.component';
import { RingOfFireEnComponent } from './pages/en/blogs/drinking-games/ring-of-fire/ring-of-fire.component';
import { MijnenveldEnComponent } from './pages/en/blogs/drinking-games/mijnenveld/mijnenveld.component';
import { LoopingLouieEnComponent } from './pages/en/blogs/drinking-games/looping-louie/looping-louie.component';
import { FingersEnComponent } from './pages/en/blogs/drinking-games/fingers/fingers.component';
import { VikingsEnComponent } from './pages/en/blogs/drinking-games/vikings/vikings.component';
import { BattleshipEnComponent } from './pages/en/blogs/drinking-games/battleship/battleship.component';
import { SuckAndBlowEnComponent } from './pages/en/blogs/drinking-games/suck-and-blow/suck-and-blow.component';
import { RideTheBusEnComponent } from './pages/en/blogs/drinking-games/ride-the-bus/ride-the-bus.component';
import { HigherOrLowerEnComponent } from './pages/en/blogs/drinking-games/higher-or-lower/higher-or-lower.component';
import { CrocodileDentistEnComponent } from './pages/en/blogs/drinking-games/crocodile-dentist/crocodile-dentist.component';
import { FingerRouletteEnComponent } from './pages/en/blogs/drinking-games/finger-roulette/finger-roulette.component';
import { AngryMugEnComponent } from './pages/en/blogs/drinking-games/angry-mug/angry-mug.component';

// English site under /en/. Every route carries data.lang = 'en'. The Dutch
// counterpart of each page is registered in i18n/alternates.ts (static pages)
// or via `alternate` in blog-posts.en.data.ts (posts).
const EN = { lang: 'en' };

export const enRoutes: Routes = [
  { path: 'en', component: HomeComponent, title: 'AnyTimerApp: Track Anytimers & Play Drinking Games', data: EN },
  { path: 'en/contact', component: ContactEnComponent, title: 'Contact AnyTimerApp: Questions, Feedback & Partnerships', data: EN },
  { path: 'en/privacy', component: PrivacyEnComponent, title: 'AnyTimerApp Privacy Policy: GDPR Compliant & Secure', data: EN },
  { path: 'en/terms', component: TermsEnComponent, title: 'AnyTimerApp Terms of Use: Rules & Conditions', data: EN },
  { path: 'en/remove-account', component: RemoveAccountEnComponent, title: 'Delete Your AnyTimerApp Account: Step by Step', data: EN },
  { path: 'en/blog', component: BlogComponent, title: 'AnyTimerApp Blog: Drinking Games, Ideas & Guides', data: EN },
  { path: 'en/blog/dictionary', component: BlogCategoryComponent, title: 'Dutch Student Slang Dictionary: A to Z | AnyTimerApp', data: { ...EN, category: 'Begrippen' } },
  { path: 'en/blog/inspiration', component: BlogCategoryComponent, title: 'Inspiration for a Fun Night | AnyTimerApp', data: { ...EN, category: 'Inspiratie' } },
  { path: 'en/blog/good-to-know', component: BlogCategoryComponent, title: 'Anytimer Rules & Good to Know | AnyTimerApp', data: { ...EN, category: 'Weetjes' } },
  { path: 'en/blog/drinking-games', component: BlogCategoryComponent, title: 'Drinking Game Rules & Tips | AnyTimerApp', data: { ...EN, category: 'Drankspelletjes' } },
  { path: 'en/blog/dictionary/what-is-an-anytimer', component: WhatIsAnAnytimerComponent, title: 'What is an Anytimer? Meaning, Rules & Examples | AnyTimerApp', data: EN },
  { path: 'en/blog/dictionary/what-is-an-adtje', component: WhatIsAnAdtjeComponent, title: 'What is an Adtje? The Dutch Chug Explained | AnyTimerApp', data: EN },
  { path: 'en/blog/inspiration/best-drinking-games', component: BestDrinkingGamesComponent, title: 'Top 10 Best Drinking Games for a Fun Night | AnyTimerApp', data: EN },
  { path: 'en/blog/inspiration/best-chug-timer', component: BestChugTimerComponent, title: 'What is the Best Chug Timer? Apps & Options | AnyTimerApp', data: EN },
  { path: 'en/blog/inspiration/night-in-ideas-for-housemates', component: NightInIdeasForHousematesComponent, title: 'Top 10 Fun Night In Ideas for Housemates | AnyTimerApp', data: EN },
  { path: 'en/blog/good-to-know/can-you-refuse-an-anytimer', component: CanYouRefuseAnAnytimerComponent, title: 'Can You Refuse an Anytimer? Rules & Penalties | AnyTimerApp', data: EN },
  { path: 'en/blog/good-to-know/tracking-anytimers-in-whatsapp', component: TrackingAnytimersInWhatsappComponent, title: 'Why You Shouldn\'t Track Anytimers in WhatsApp | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/jeu-de-bier', component: JeuDeBierEnComponent, title: 'Jeu de Bier: Dutch Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/beerio-kart', component: BeerioKartEnComponent, title: 'Beerio Kart Rules: The Mario Kart Drinking Game | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/trek-je-bak-mania', component: TrekJeBakManiaEnComponent, title: 'Trek je Bak Mania: Dutch Trackmania Drinking Game | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/30-seconds', component: ThirtySecondsEnComponent, title: '30 Seconds Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/kingsen', component: KingsenEnComponent, title: 'Kingsen: Dutch Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/rage-cage', component: RageCageEnComponent, title: 'Rage Cage Rules: How to Play Stack Cup | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/fuck-the-dealer', component: FuckTheDealerEnComponent, title: 'Fuck the Dealer Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/mexico', component: MexicoEnComponent, title: 'Mexico Dice Game Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/bakplaten', component: BakplatenEnComponent, title: 'Bakplaten: Dutch Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/horse-race', component: HorseRaceEnComponent, title: 'Horse Race Drinking Game Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/ring-of-fire', component: RingOfFireEnComponent, title: 'Ring of Fire Rules: How to Play Kings Cup | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/mijnenveld', component: MijnenveldEnComponent, title: 'Mijnenveld: Dutch Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/looping-louie', component: LoopingLouieEnComponent, title: 'Looping Louie Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/fingers', component: FingersEnComponent, title: 'Fingers Drinking Game Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/vikings', component: VikingsEnComponent, title: 'Vikings Drinking Game Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/battleship', component: BattleshipEnComponent, title: 'Battleship Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/suck-and-blow', component: SuckAndBlowEnComponent, title: 'Suck and Blow Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/ride-the-bus', component: RideTheBusEnComponent, title: 'Ride the Bus Rules: How to Play | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/higher-or-lower', component: HigherOrLowerEnComponent, title: 'Higher or Lower Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/crocodile-dentist', component: CrocodileDentistEnComponent, title: 'Crocodile Dentist Drinking Game Rules | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/finger-roulette', component: FingerRouletteEnComponent, title: 'Finger Roulette Rules: Play in the App | AnyTimerApp', data: EN },
  { path: 'en/blog/drinking-games/angry-mug', component: AngryMugEnComponent, title: 'Angry Mug Rules: Play in the App | AnyTimerApp', data: EN },
  // One route per dictionary entry, built from the generated data.
  ...DICTIONARY_POSTS_EN.map(p => ({
    path: p.path,
    loadComponent: () => import('./pages/blog-term/blog-term.component').then(m => m.BlogTermComponent),
    title: p.termOrigin
      ? `What does ${p.title} mean? ${p.termOrigin === 'flemish' ? 'Flemish' : 'Dutch'} student slang`
      : `What does ${p.title} mean?`,
    data: { ...EN, slug: p.slug }
  })),
];
