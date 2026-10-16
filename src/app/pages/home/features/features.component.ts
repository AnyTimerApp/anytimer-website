import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../i18n/language.service';

const REVIEW_PEOPLE = [
  { name: 'Sander K.', city: 'Utrecht', color: '#C4B5FD' },
  { name: 'Lisa V.', city: 'Amsterdam', color: '#FCA5A5' },
  { name: 'Tom B.', city: 'Rotterdam', color: '#6EE7B7' },
  { name: 'Emma R.', city: 'Den Haag', color: '#FDE68A' },
  { name: 'Joris M.', city: 'Eindhoven', color: '#93C5FD' },
  { name: 'Rosa P.', city: 'Groningen', color: '#F9A8D4' },
  { name: 'Tim H.', city: 'Breda', color: '#A7F3D0' },
  { name: 'Sarah W.', city: 'Tilburg', color: '#DDD6FE' }
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
    translatedNote: '',
    reviews: [
      'Eindelijk geen discussies meer over wie wat schuldig is! Super handig app.',
      'Mijn vrienden en ik gebruiken dit al maanden. Nooit meer vergeten wie wat heeft.',
      'Perfecte app voor onze vriendengroep. Altijd bijgehouden wie wat heeft. Aanrader!',
      'Geweldig concept! Nu weet ik altijd wie ik nog een anytimer mag geven. Love it.',
      'Eenvoudig, snel en precies wat we nodig hadden. Beste app voor challenges met vrienden.',
      'Zo handig! Ik weet altijd wie er nog op mijn anytimer heeft. We hadden dit al jaren nodig.',
      'Onze hele vriendengroep gebruikt het. Leuke manier om challenges bij te houden!',
      'Nooit meer discussie over anytimers. De app houdt alles eerlijk bij. Top!'
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
    reviewsLabel: 'Real stories',
    reviewsTitle: 'What friends say',
    // The reviews were written in Dutch; say so on the English site.
    translatedNote: 'Translated from Dutch',
    reviews: [
      'Finally no more arguing about who owes what! Super handy app.',
      'My friends and I have used this for months. Never forget who has what again.',
      'Perfect app for our group of friends. Always clear who has what. Recommended!',
      'Great idea! Now I always know who I can still give an anytimer. Love it.',
      'Simple, fast and exactly what we needed. Best app for challenges with friends.',
      'So handy! I always know who still owes me an anytimer. We needed this for years.',
      'Our whole group uses it. Fun way to keep track of challenges!',
      'No more arguing about anytimers. The app keeps everything fair. Top!'
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
  private readonly text = TEXT[inject(LanguageService).lang()];

  readonly t = {
    ...this.text,
    reviews: this.text.reviews.map((text, i) => ({ text, ...REVIEW_PEOPLE[i] }))
  };
}
