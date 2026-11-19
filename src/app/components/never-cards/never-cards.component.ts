import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Lang } from '../../i18n/lang';

// One question category for the Never have I ever page. The same data feeds
// the card banner and the numbered lists on the page. The label is both the
// category button and the heading above its list, so they always match.
export interface NeverCategory {
  id: string;
  label: string;
  questions: string[];
}

interface Card {
  category: string;
  question: string;
}

const TEXT = {
  nl: {
    title: 'Never have I ever',
    newCard: 'Nieuwe kaart',
    choose: 'Kies je categorieën',
    aria: 'Trek een nieuwe never have I ever kaart'
  },
  en: {
    title: 'Never have I ever',
    newCard: 'New card',
    choose: 'Pick your categories',
    aria: 'Draw a new never have I ever card'
  }
};

// Full-screen blue banner, same look as the adt timer on /adt-timer/.
// Shows one question card at a time from the chosen categories.
@Component({
  selector: 'app-never-cards',
  standalone: true,
  templateUrl: './never-cards.component.html',
  styleUrl: './never-cards.component.scss'
})
export class NeverCardsComponent implements OnInit {
  @Input() lang: Lang = 'nl';
  @Input({ required: true }) categories: NeverCategory[] = [];

  active = new Set<string>();
  card: Card = { category: '', question: '' };
  drawKey = 0;

  private deck: Card[] = [];
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get t() {
    return TEXT[this.lang];
  }

  ngOnInit() {
    // Every category except the 18+ one is on by default.
    this.active = new Set(this.categories.filter(c => c.id !== 'pittig').map(c => c.id));
    // The prerendered page always shows the first classic question, so the
    // server and browser HTML match. Shuffling starts with the first tap.
    const first = this.categories[0];
    this.card = { category: first.label, question: first.questions[0] };
  }

  isActive(id: string) {
    return this.active.has(id);
  }

  toggle(id: string) {
    if (this.active.has(id)) {
      // At least one category stays on.
      if (this.active.size === 1) return;
      this.active.delete(id);
    } else {
      this.active.add(id);
    }
    this.deck = [];
    this.draw();
  }

  draw() {
    if (!this.isBrowser) return;
    if (this.deck.length === 0) this.deck = this.shuffle();
    // Never the same question twice in a row after a reshuffle.
    let next = this.deck.pop()!;
    if (next.question === this.card.question && this.deck.length > 0) {
      next = this.deck.pop()!;
    }
    this.card = next;
    this.drawKey++;
  }

  private shuffle(): Card[] {
    const cards = this.categories
      .filter(c => this.active.has(c.id))
      .flatMap(c => c.questions.map(question => ({ category: c.label, question })));
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
