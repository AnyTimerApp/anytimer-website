import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements AfterViewInit, OnDestroy {
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
