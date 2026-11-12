import { afterNextRender, Component, ElementRef, inject, NgZone, OnDestroy, signal } from '@angular/core';

// Wraps a horizontal card slider (`<div class="related-slider">`) and adds a white
// round button on each side you can still scroll to. One click moves one card.
// Desktop only (mouse or trackpad): touch screens just swipe, see the scss.
// The slider itself keeps its own markup and styles, so it stays identical to the
// home page slider. Buttons only appear in the browser, after the first render.
@Component({
  selector: 'app-slider-nav',
  standalone: true,
  templateUrl: './slider-nav.component.html',
  styleUrl: './slider-nav.component.scss'
})
export class SliderNavComponent implements OnDestroy {
  readonly canPrev = signal(false);
  readonly canNext = signal(false);
  readonly top = signal(0);
  readonly prevLeft = signal(0);
  readonly nextLeft = signal(0);
  readonly labels = signal({ prev: 'Vorige', next: 'Volgende' });

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private slider: HTMLElement | null = null;
  private observer: ResizeObserver | null = null;
  private readonly onChange = () => this.zone.run(() => this.update());

  constructor() {
    afterNextRender(() => {
      this.slider = this.host.nativeElement.querySelector('.related-slider');
      if (!this.slider) return;
      if (document.documentElement.lang.startsWith('en')) {
        this.labels.set({ prev: 'Previous', next: 'Next' });
      }
      this.zone.runOutsideAngular(() => {
        this.slider!.addEventListener('scroll', this.onChange, { passive: true });
        this.observer = new ResizeObserver(this.onChange);
        this.observer.observe(this.slider!);
      });
      this.update();
    });
  }

  scroll(direction: 1 | -1) {
    if (!this.slider) return;
    const card = this.slider.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(this.slider).columnGap) || 0;
    this.slider.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.slider?.removeEventListener('scroll', this.onChange);
    this.observer?.disconnect();
  }

  // Shows a button only when that direction can still scroll. Each button is
  // centered on the line where the cards are cut off (the slider's own edge), at
  // half the card height, so half of it hangs over the overflowing card.
  private update() {
    const slider = this.slider;
    if (!slider) return;
    const max = slider.scrollWidth - slider.clientWidth;
    this.canPrev.set(slider.scrollLeft > 2);
    this.canNext.set(slider.scrollLeft < max - 2);

    const host = this.host.nativeElement.getBoundingClientRect();
    const rect = slider.getBoundingClientRect();
    const card = (slider.firstElementChild as HTMLElement | null)?.getBoundingClientRect();
    this.top.set(card ? card.top - host.top + card.height / 2 : rect.top - host.top + rect.height / 2);
    this.prevLeft.set(rect.left - host.left);
    this.nextLeft.set(rect.right - host.left);
  }
}
