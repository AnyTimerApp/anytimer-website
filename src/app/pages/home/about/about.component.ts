import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';

// English FAQ. Also used for the FAQPage JSON-LD on the English home page,
// so the structured data always matches what is on screen.
export const FAQS_EN: { question: string; answer: string; link?: string; linkText?: string }[] = [
  {
    question: 'What is an anytimer?',
    answer: 'An anytimer is basically a free pass you can get from your friends or give to someone. For example after a lost challenge, a silly move or a bet. And the fun part: it can be used at any moment. So yes, also when you are hungover or when it suits you the least.',
    link: '/en/blog/dictionary/what-is-an-anytimer',
    linkText: 'Read what an anytimer is'
  },
  {
    question: 'Is AnyTimerApp free to use?',
    answer: 'Yes, the app is completely free to use.'
  },
  {
    question: 'How do I add an anytimer?',
    answer: 'Go to your friends list, pick the right person and add an anytimer there. You can also add something extra, like a photo, video or message as proof. After that it is saved in your overview.'
  },
  {
    question: 'How do I use an anytimer?',
    answer: 'Go to your friends list, pick the right person and use an anytimer. Your friend gets a notification right away. That anytimer is then taken off your score.'
  },
  {
    question: 'What if someone doesn\'t accept an anytimer?',
    answer: 'At first it stays visible as open. If the other person doesn\'t accept, you get your any back. That way it stays clear for everyone what is still open, and you skip the endless arguments about who owes what. If they still refuse, you get to fight out the consequences yourselves.'
  }
];

const TEXT = {
  nl: {
    label: 'Veelgestelde vragen',
    title: 'Alles wat je wil weten',
    other: 'Heb je een andere vraag? Neem contact met ons op via',
    form: 'het contactformulier',
    ready: 'Klaar om te starten?',
    download: 'Download de app en begin vandaag'
  },
  en: {
    label: 'FAQ',
    title: 'Everything you want to know',
    other: 'Got another question? Get in touch through',
    form: 'the contact form',
    ready: 'Ready to start?',
    download: 'Download the app and start today'
  }
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private readonly language = inject(LanguageService);
  readonly t = TEXT[this.language.lang()];
  readonly ui = this.language.ui();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.language.lang() === 'en') {
      this.faqs = FAQS_EN.map((faq, i) => ({ ...faq, open: i === 0 }));
    }
  }

faqs: { question: string; answer: string; link?: string; linkText?: string; open: boolean }[] = [
  {
    question: 'Wat is een anytimer?',
    answer: 'Een anytimer is eigenlijk gewoon een tegoed dat je van je vrienden kunt krijgen of aan iemand kunt geven. Bijvoorbeeld na een verloren challenge, domme actie of weddenschap. En het leuke is: die kan op elk moment ingezet worden. Dus ja, ook op een brak moment of precies wanneer het het minst uitkomt.',
    link: '/wat-is-een-anytimer',
    linkText: 'Lees wat een anytimer is',
    open: true
  },
  {
    question: 'Is de AnyTimerApp gratis te gebruiken?',
    answer: 'Ja, de app is gewoon gratis te gebruiken.',
    open: false
  },
  {
    question: 'Hoe voeg ik een Anytimer toe?',
    answer: 'Ga naar je vriendenlijst, kies de juiste persoon en voeg daar een anytimer toe. Je kunt er ook nog iets bij zetten, zoals een foto, video of berichtje als bewijs. Daarna wordt die gewoon opgeslagen in jullie overzicht.',
    open: false
  },
  {
    question: 'Hoe zet ik een Anytimer in?',
    answer: 'Ga naar je vriendenlijst, kies de juiste persoon en zet een anytimer in. Als je een anytimer inzet, krijgt je vriend daar meteen een melding van. Die anytimer gaat dan van je score af.',
    open: false
  },
  {
    question: 'Wat als iemand een anytimer niet accepteert?',
    answer: 'In eerste instantie blijft die zichtbaar als openstaand. Als de ander niet accepteert krijg je je any terug. Zo blijft het voor iedereen duidelijk wat er nog staat en krijg je geen eindeloze discussies over wie wat nog tegoed heeft. Als de ontvanger niet accepteert mag je zelf uitvechten wat de consequenties zijn.',
    open: false
  }
];

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
