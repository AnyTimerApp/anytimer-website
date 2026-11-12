import { Component, ElementRef, HostListener, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Lang } from '../../i18n/lang';

// Web copy of the Any-timer in the app: frontend/hooks/useHoldTimer.js and
// frontend/components/games/timer/TimerOverlay.js in the app repo. Keep the
// behaviour, texts and look in sync with those files.

const COOLDOWN_SECONDS = 3;

// Based on screens.timer in the app's i18n/locales/<lang>/common.json. The title
// differs on purpose: on the web the timer is called after the page keyword
// (adt timer / chug timer), and desktop gets click and space bar instructions.
const TEXT = {
  nl: {
    title: 'Adt timer',
    touchScreen: 'Tik op het scherm om timer te stoppen',
    letGo: 'Loslaten om timer te starten',
    touchAndLetGo: 'Tik en laat los op het scherm om timer te starten',
    desktopStop: 'Klik of druk op de spatiebalk om timer te stoppen',
    desktopStart: 'Klik en laat los of druk op de spatiebalk om timer te starten',
    pleaseWait: (n: number) => `Even wachten ${n} ${n === 1 ? 'seconde' : 'seconden'}...`,
    aria: 'Adt timer. Tik en laat los om te starten, tik opnieuw om te stoppen. De spatiebalk werkt ook.'
  },
  en: {
    title: 'Chug timer',
    touchScreen: 'Tap the screen to stop the timer',
    letGo: 'Release to start the timer',
    touchAndLetGo: 'Tap and release the screen to start the timer',
    desktopStop: 'Click or press the space bar to stop the timer',
    desktopStart: 'Click and release or press the space bar to start the timer',
    pleaseWait: (n: number) => `Hang on ${n} ${n === 1 ? 'second' : 'seconds'}...`,
    aria: 'Chug timer. Tap and release to start, tap again to stop. The space bar works too.'
  }
};

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
}

@Component({
  selector: 'app-adt-timer',
  standalone: true,
  templateUrl: './adt-timer.component.html',
  styleUrl: './adt-timer.component.scss'
})
export class AdtTimerComponent implements OnDestroy {
  @Input() lang: Lang = 'nl';

  time = 0;
  isRunning = false;
  isPressed = false;
  isLocked = false;
  cooldownTime = 0;
  bubbles: Bubble[] = [];
  flashKey = 0;
  height = 0;

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private cooldownId: ReturnType<typeof setInterval> | null = null;
  private spawnId: ReturnType<typeof setInterval> | null = null;
  private touchDown = false;
  private timeBeforePress = 0;
  private spaceDown = false;
  private nextBubbleId = 0;
  private width = 0;
  private readonly isBrowser: boolean;
  // Mouse or trackpad (PC/laptop). The prerendered HTML uses the touch texts;
  // the browser switches to the desktop texts on load.
  private readonly isDesktop: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object, private host: ElementRef<HTMLElement>) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isDesktop = this.isBrowser && matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  get t() {
    return TEXT[this.lang];
  }

  get dimmed(): boolean {
    return this.isLocked || (this.isPressed && !this.isRunning);
  }

  get instruction(): string {
    if (this.isLocked && this.cooldownTime > 0) return this.t.pleaseWait(this.cooldownTime);
    if (this.isRunning) return this.isDesktop ? this.t.desktopStop : this.t.touchScreen;
    if (this.isPressed && !this.isLocked) return this.t.letGo;
    return this.isDesktop ? this.t.desktopStart : this.t.touchAndLetGo;
  }

  // MM:SS:CC, same as formatTime() in the app.
  get display(): string {
    const ms = Math.max(0, Math.floor(this.time));
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
  }

  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture?.(event.pointerId);
    this.measure(el);
    this.pressIn();
  }

  onPointerUp() {
    this.pressOut();
  }

  // The browser took over the touch to scroll the page. That press was never
  // meant for the timer: don't start it, and bring back the previous time.
  onPointerCancel() {
    this.touchDown = false;
    this.isPressed = false;
    if (!this.isRunning && !this.isLocked) this.time = this.timeBeforePress;
  }

  // The space bar works anywhere on the page, wherever you scrolled or
  // clicked. Only typing fields and buttons keep their own space bar.
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.isSpaceForTimer(event)) return;
    event.preventDefault();
    if (this.spaceDown) return;
    this.spaceDown = true;
    const timer = this.host.nativeElement.firstElementChild as HTMLElement | null;
    if (timer) this.measure(timer);
    this.pressIn();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!this.isSpaceForTimer(event)) return;
    event.preventDefault();
    if (!this.spaceDown) return;
    this.spaceDown = false;
    this.pressOut();
  }

  removeBubble(id: number) {
    this.bubbles = this.bubbles.filter(b => b.id !== id);
  }

  ngOnDestroy() {
    this.clear(this.intervalId);
    this.clear(this.cooldownId);
    this.stopBubbles();
  }

  private pressIn() {
    this.touchDown = true;
    this.isPressed = true;

    if (this.isLocked) return;

    if (this.isRunning) {
      this.stop();
      return;
    }

    this.timeBeforePress = this.time;
    if (this.time > 0) {
      this.reset();
      this.isPressed = true;
      this.touchDown = true;
    }
  }

  private pressOut() {
    this.touchDown = false;
    this.isPressed = false;

    if (this.isLocked) return;
    if (!this.isRunning) this.start();
  }

  private start() {
    const startTime = Date.now() - this.time;
    this.intervalId = setInterval(() => {
      this.time = Date.now() - startTime;
    }, 10);
    this.isRunning = true;
    this.startBubbles();
  }

  private stop() {
    this.clear(this.intervalId);
    this.isRunning = false;
    this.stopBubbles();
    this.flashKey++;

    this.isLocked = true;
    let remaining = COOLDOWN_SECONDS;
    this.cooldownTime = remaining;

    this.clear(this.cooldownId);
    this.cooldownId = setInterval(() => {
      remaining -= 1;

      if (remaining <= 0) {
        this.clear(this.cooldownId);
        this.cooldownTime = 0;
        this.isLocked = false;

        if (this.touchDown) {
          this.time = 0;
          this.isRunning = false;
          this.stopBubbles();
          this.isPressed = true;
        } else {
          this.isPressed = false;
        }
        return;
      }

      this.cooldownTime = remaining;
    }, 1000);
  }

  private reset() {
    this.clear(this.intervalId);
    this.clear(this.cooldownId);
    this.time = 0;
    this.isRunning = false;
    this.isPressed = false;
    this.isLocked = false;
    this.cooldownTime = 0;
    this.stopBubbles();
  }

  private startBubbles() {
    if (!this.isBrowser || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 8; i++) this.spawnBubble();
    this.spawnId = setInterval(() => this.spawnBubble(), 100);
  }

  private stopBubbles() {
    this.clear(this.spawnId);
    this.spawnId = null;
    this.bubbles = [];
  }

  private spawnBubble() {
    this.bubbles = [...this.bubbles, {
      id: this.nextBubbleId++,
      x: Math.random() * this.width,
      size: 6 + Math.random() * 12,
      duration: 2000 + Math.random() * 3000
    }];
  }

  private isSpaceForTimer(event: KeyboardEvent): boolean {
    if (event.code !== 'Space' && event.key !== ' ') return false;
    const target = event.target as HTMLElement | null;
    return !target?.closest('input, textarea, select, button, [contenteditable]:not([contenteditable="false"])');
  }

  private measure(el: HTMLElement) {
    this.width = el.clientWidth;
    this.height = el.clientHeight;
  }

  private clear(id: ReturnType<typeof setInterval> | null) {
    if (id !== null) clearInterval(id);
  }
}
