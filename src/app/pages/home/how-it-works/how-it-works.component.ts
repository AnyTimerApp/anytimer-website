import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../i18n/language.service';

const TEXT = {
  nl: {
    label: 'Hoe het werkt',
    title: 'Een nieuwe app. Hoe werkt dat?',
    intro: 'Alles wat je nodig hebt om anytimers met vrienden bij te houden in slechts vier stappen.',
    steps: [
      { label: 'Spaar any\'s', title: 'Sparen of inzetten', alt: 'Anytimer toevoegen', text: 'Heb je een anytimer verdient? Open de app, selecteer je vriend en spaar een anytimer. Alles wordt automatisch opgeslagen binnen jullie vriendschap.' },
      { label: 'Foto\'s en video\'s', title: 'Media toevoegen', alt: 'Media toevoegen', text: 'Maak het moment onvergetelijk. Voeg een foto, video of berichtje toe aan elke anytimer. Zo weet je precies waarom die anytimer is verdiend of ingezet.' },
      { label: 'Post op de feed', title: 'Deel met je vrienden', alt: 'Feed plaatsen', text: 'Post de anytimer op de feed zodat al je vrienden het te zien krijgen. Je vrienden kunnen liken en reageren. Zo creëer jij je tijdlijn aan herinneringen.' },
      { label: 'Versiebeheer', title: 'Any\'s bijhouden', alt: 'Vriendenbalans', text: 'Zie in één oogopslag hoeveel anytimers jij hebt en hoeveel any\'s vrienden op jou hebben. Nooit meer discussie. De app houdt alles bij, eerlijk en transparant voor iedereen.' }
    ]
  },
  en: {
    label: 'How it works',
    title: 'A new app. How does it work?',
    intro: 'Everything you need to track anytimers with your friends. In just four steps.',
    steps: [
      { label: 'Save anys', title: 'Save or use', alt: 'Adding an anytimer', text: 'Earned an anytimer? Open the app, pick your friend and save your any. Everything is stored in your friendship automatically.' },
      { label: 'Photos and videos', title: 'Add media', alt: 'Adding media', text: 'Add a photo, video or note to every anytimer that you either save or use. That way you know exactly why it was ever earned or used.' },
      { label: 'Post on the feed', title: 'Share with your friends', alt: 'Posting to the feed', text: 'Post the anytimer on the feed or in a group so all your friends can see it. They can like and comment. That is how you build your timeline of memories.' },
      { label: 'Version control', title: 'Keep track of anys', alt: 'Balance with friends', text: 'See at a glance how many anytimers you have and how many your friends have on you. No more arguing. The app tracks everything.' }
    ]
  }
};

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements AfterViewInit, OnDestroy {
  readonly t = TEXT[inject(LanguageService).lang()];
  activeStep = 0;
  private wrappers: HTMLElement[] = [];
  private readonly STICKY_TOP = 72 + 40; // header-height + offset

  constructor(private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.wrappers = Array.from(
      document.querySelectorAll<HTMLElement>('.p-card-wrap')
    );
    this.updateActiveStep();
  }

  ngOnDestroy() {}

  @HostListener('window:scroll', [])
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveStep();
    }
  }

  private updateActiveStep() {
    if (!this.wrappers.length) return;

    // Each sticky wrapper has top ≈ STICKY_TOP when stuck.
    // A wrapper that hasn't reached the threshold yet has top > STICKY_TOP.
    // We want the highest-index wrapper that has already reached (or passed) the threshold.
    let active = 0;

    this.wrappers.forEach((wrap, idx) => {
      const top = Math.round(wrap.getBoundingClientRect().top);
      if (top <= this.STICKY_TOP + 2) {
        active = idx;
      }
    });

    if (active !== this.activeStep) {
      this.activeStep = active;
      this.cdr.detectChanges();
    }
  }
}
