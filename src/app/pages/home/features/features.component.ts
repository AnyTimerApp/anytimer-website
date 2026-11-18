import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../i18n/language.service';

// Real reviews from the App Store and Google Play (copied 2026-11-18). Text is
// exactly as written; the store replaces the city line. `lang` is the language
// the review was written in, so the other site can mark it as translated.
// `stars` is left out when the rating is unknown; no stars are shown then.
type ReviewPerson = { name: string; store: 'App Store' | 'Play Store'; stars?: number; lang: 'nl' | 'en'; color: string };

const REVIEW_PEOPLE: ReviewPerson[] = [
  { name: 'jsiwebejkdowjsj', store: 'App Store', stars: 5, lang: 'nl', color: '#C4B5FD' },
  { name: 'Isabel169', store: 'App Store', stars: 5, lang: 'nl', color: '#FCA5A5' },
  { name: 'Susan', store: 'Play Store', stars: 5, lang: 'en', color: '#6EE7B7' },
  { name: 'LilSandy99', store: 'App Store', stars: 5, lang: 'nl', color: '#FDE68A' },
  { name: 'Stefnip', store: 'App Store', stars: 5, lang: 'nl', color: '#93C5FD' },
  { name: 'Berend', store: 'App Store', stars: 5, lang: 'nl', color: '#F9A8D4' },
  { name: 'Jil', store: 'App Store', stars: 5, lang: 'nl', color: '#A7F3D0' },
  { name: 'MaxTB010', store: 'App Store', stars: 5, lang: 'nl', color: '#DDD6FE' },
  { name: 'Felipe', store: 'App Store', stars: 5, lang: 'nl', color: '#FDBA74' }
];

const TEXT = {
  nl: {
    label: 'Waarom de AnyTimerApp?',
    title: 'Any\'s bijhouden, nooit vergeten',
    intro: 'De app die je vriendschappen eerlijk houdt. Geen discussies meer over wie welke any schuldig is.',
    cards: [
      { title: 'Nooit vergeten', text: 'Elke anytimer wordt bijgehouden. Zie wie er nog op jouw anytimers heeft, wat jij nog kan uitdelen en de volledige geschiedenis. Geen misverstanden meer.' },
      { title: 'Geven & ontvangen', text: 'Weddenschap verloren of gewonnen? Één centrale plek voor het sparen en uitdelen van anytimers. Eerlijk en transparant voor iedereen.' },
      { title: 'Any inzetten', text: 'Het moment is aangebroken. Deel een anytimer uit en je vriend krijgt direct een notificatie. Hij moet nu de anytimer nemen.' },
      { title: 'Media bewaren', text: 'Foto\'s, video\'s en berichten bij elke anytimer. Zodat het bewijs voor altijd bewaard blijft. Nooit meer twijfelen over waarom.' },
      { title: 'Vrienden', text: 'Voeg vrienden toe via gebruikersnaam en gebruik de app in je vriendenkring. Ideaal voor groepen, uitjes en weddenschappen.' },
      { title: 'Gratis te gebruiken', text: 'De app is volledig gratis maatje. In ruil voor dat jij volgend jaar naar ons festival komt. Je komt toch?' }
    ],
    reviewsLabel: 'Echte verhalen',
    reviewsTitle: 'Wat vrienden zeggen',
    translatedNote: 'Vertaald uit het Engels',
    reviews: [
      'Maakt een einde aan alle discussies. Zelfs na een paar biertjes snapt iedereen de stand nog. Houdt het ook allemaal een beetje spannend! Heel leuk :)',
      'Echt een leuke app om samen met je vrienden te hebben! Ik heb vrienden die ik weinig zie, maar op deze manier toch nog goed contact mee hou en ze een beetje scherp kan houden ;)',
      'Grappige app en superhandig',
      'Lang gewacht op een degelijke app die mijn goudvissenbrein helpt mijn hardverdiende anytimers bij te houden',
      'Soort Strava voor bier drinken. Lachen app!! gebruiken hem met onze vriendengroep!!!',
      'Goede app, hield het eerst bij in m’n notities maar dit is beter!',
      'Werkt allemaal echt Nice! Veel fijner bijhouden zo',
      '1 woord: WAUW',
      'Handige app'
    ]  },
  en: {
    label: 'Why AnyTimerApp?',
    title: "Track your any's. Never forget one.",
    intro: 'The app that keeps your friendships fair. No more arguing about who owes you an anytimer.',
    cards: [
      { title: 'Never forget', text: 'Every anytimer gets tracked. See who still owes you, what you can still hand out and your full history. No more discussions.' },
      { title: 'Give & receive', text: 'Lost or won a bet? One place to save and hand out anytimers. Fair and transparent for everyone.' },
      { title: 'Use an any', text: 'The moment has come. Hand out an anytimer and your friend gets a notification right away. Now they have to accept the anytimer.' },
      { title: 'Save proof', text: 'Photos, videos and notes with every anytimer. So history is saved forever. Like version control.' },
      { title: 'Friends', text: 'Add friends by username and use the app with your friend group. Perfect for groups, nights out and bets.' },
      { title: 'Free to use', text: 'The app is completely free. In return you come to our festival next year. You are coming, right?' }
    ],
    reviewsLabel: 'Real stories',
    reviewsTitle: 'What friends say',
    // Shown on reviews written in another language than the site.
    translatedNote: 'Translated from Dutch',
    reviews: [
      'Ends all the arguments. Even after a few beers everyone still gets the score. Keeps it all a bit exciting too! Really fun :)',
      'Really fun app to have with your friends! I have friends I don\'t see much, but this way I still keep in touch and can keep them on their toes ;)',
      'Funny app and super handy',
      'Waited a long time for a decent app that helps my goldfish brain keep track of my hard-earned anytimers',
      'Like Strava for drinking beer. Hilarious app!! we use it with our group of friends!!!',
      'Good app, I used to keep track in my notes but this is better!',
      'Everything works really nice! Much easier to keep track this way',
      '1 word: WOW',
      'Handy app'
    ]
  }
};

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  private readonly lang = inject(LanguageService).lang();
  private readonly text = TEXT[this.lang];

  readonly t = {
    ...this.text,
    reviews: this.text.reviews.map((text, i) => ({
      text,
      ...REVIEW_PEOPLE[i],
      starsText: '★'.repeat(REVIEW_PEOPLE[i].stars ?? 0),
      translated: REVIEW_PEOPLE[i].lang !== this.lang
    }))
  };
}
