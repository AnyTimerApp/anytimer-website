import { AfterViewInit, Component, DestroyRef, ElementRef, NgZone, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { startReviewMarquee } from './review-marquee';
import { LanguageService } from '../../../i18n/language.service';

// Real reviews from the App Store and Google Play (copied 2026-11-18). Text is
// exactly as written; the store replaces the city line. `lang` is the language
// the review was written in, so the other site can mark it as translated.
// `stars` is left out when the rating is unknown; no stars are shown then.
// Each review is { title, text }. The title is the one from the store; an empty
// title (Play Store reviews have none) shows no title at all.
type ReviewPerson = { name: string; store: 'App Store' | 'Play Store'; stars?: number; lang: 'nl' | 'en' };

const REVIEW_PEOPLE: ReviewPerson[] = [
  { name: 'jsiwebejkdowjsj', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Isabel169', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Susan', store: 'Play Store', stars: 5, lang: 'en' },
  { name: 'LilSandy99', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Stefnip', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Berend', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Jil', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'MaxTB010', store: 'App Store', stars: 5, lang: 'nl' },
  { name: 'Felipe', store: 'App Store', stars: 5, lang: 'nl' }
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
    reviewsLabel: 'Beoordelingen',
    reviewsTitle: 'Neem het niet van ons aan',
    reviewsStarsLabel: '5 van de 5 sterren',
    translatedNote: 'Vertaald uit het Engels',
    reviews: [
      { title: 'Anyone, anywhere, anytime!', text: 'Maakt een einde aan alle discussies. Zelfs na een paar biertjes snapt iedereen de stand nog. Houdt het ook allemaal een beetje spannend! Heel leuk :)' },
      { title: 'Aanrader!', text: 'Echt een leuke app om samen met je vrienden te hebben! Ik heb vrienden die ik weinig zie, maar op deze manier toch nog goed contact mee hou en ze een beetje scherp kan houden ;)' },
      { title: '', text: 'Grappige app en superhandig' },
      { title: 'Eindelijk een oplossing', text: 'Lang gewacht op een degelijke app die mijn goudvissenbrein helpt mijn hardverdiende anytimers bij te houden' },
      { title: 'Soort Strava voor bier drinken', text: 'Lachen app!! gebruiken hem met onze vriendengroep!!!' },
      { title: '👍👍', text: 'Goede app, hield het eerst bij in m’n notities maar dit is beter!' },
      { title: 'Nice', text: 'Werkt allemaal echt Nice! Veel fijner bijhouden zo' },
      { title: 'Chille app!', text: '1 woord: WAUW' },
      { title: 'Mooi', text: 'Handige app' }
    ]
  },
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
    reviewsLabel: 'Reviews',
    reviewsTitle: 'Don\'t just take our word for it',
    reviewsStarsLabel: '5 out of 5 stars',
    // Shown on reviews written in another language than the site.
    translatedNote: 'Translated from Dutch',
    reviews: [
      { title: 'Anyone, anywhere, anytime!', text: 'Ends all the arguments. Even after a few beers everyone still gets the score. Keeps it all a bit exciting too! Really fun :)' },
      { title: 'Recommended!', text: 'Really fun app to have with your friends! I have friends I don\'t see much, but this way I still keep in touch and can keep them on their toes ;)' },
      { title: '', text: 'Funny app and super handy' },
      { title: 'Finally a solution', text: 'Waited a long time for a decent app that helps my goldfish brain keep track of my hard-earned anytimers' },
      { title: 'Like Strava for drinking beer', text: 'Hilarious app!! we use it with our group of friends!!!' },
      { title: '👍👍', text: 'Good app, I used to keep track in my notes but this is better!' },
      { title: 'Nice', text: 'Everything works really nice! Much easier to keep track this way' },
      { title: 'Chill app!', text: '1 word: WOW' },
      { title: 'Lovely', text: 'Handy app' }
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
export class FeaturesComponent implements AfterViewInit {
  private readonly lang = inject(LanguageService).lang();
  private readonly text = TEXT[this.lang];
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('reviewRow') private reviewRow?: ElementRef<HTMLElement>;

  readonly t = {
    ...this.text,
    reviews: this.text.reviews.map((review, i) => ({
      ...review,
      ...REVIEW_PEOPLE[i],
      starsText: '★'.repeat(REVIEW_PEOPLE[i].stars ?? 0),
      translated: REVIEW_PEOPLE[i].lang !== this.lang
    }))
  };

  // The slow drifting row runs outside Angular, so each frame does not trigger
  // change detection. Only in the browser: the prerendered page shows the row
  // standing still.
  ngAfterViewInit() {
    const row = this.reviewRow?.nativeElement;
    if (!row || !isPlatformBrowser(this.platformId)) return;
    const stop = this.zone.runOutsideAngular(() => startReviewMarquee(row));
    this.destroyRef.onDestroy(stop);
  }
}
