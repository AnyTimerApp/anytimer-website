import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
faqs = [
  {
    question: 'Wat is een anytimer?',
    answer: 'Een anytimer is eigenlijk gewoon een tegoed dat je van je vrienden kunt krijgen of aan iemand kunt geven. Bijvoorbeeld na een verloren challenge, domme actie of weddenschap. En het leuke is: die kan op elk moment ingezet worden. Dus ja, ook op een brak moment of precies wanneer het het minst uitkomt.',
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
    question: 'Wat als iemand een anytimer niet accepteerd?',
    answer: 'In eerste instantie blijft die zichtbaar als openstaand. Als de ander niet accepteerd krijg je je any terug. Zo blijft het voor iedereen duidelijk wat er nog staat en krijg je geen eindeloze discussies over wie wat nog tegoed heeft. Als de ontvanger niet accepteerd mag je zelf uitvechten wat de consequenties zijn.',
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
