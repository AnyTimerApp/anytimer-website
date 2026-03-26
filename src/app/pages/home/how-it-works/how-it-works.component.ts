import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements AfterViewInit, OnDestroy {
  activeStep = 0;
  private observer!: IntersectionObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const cards = document.querySelectorAll<HTMLElement>('.p-card-wrap .p-card');
    if (!cards.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(cards).indexOf(entry.target as HTMLElement);
            if (idx !== -1) {
              this.activeStep = idx;
              this.cdr.detectChanges();
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: `-72px 0px -30% 0px`
      }
    );

    cards.forEach(card => this.observer.observe(card));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
