import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: 'hero.component.html',
  styleUrl: 'hero.component.scss'
})
export class HeroComponent implements OnInit {
  // TODO: Add proper links or logic for store badges if ready

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    // Preloads the hero background image so it isn't discovered only after
    // the browser parses the <picture> element — only injected here (not in
    // index.html) since the hero, and this image, only exist on the home
    // route; a global preload would waste bandwidth on every other page.
    this.addPreload('assets/Together-mobile.webp', '(max-width: 768px)');
    this.addPreload('assets/Together.webp', '(min-width: 769px)');
  }

  private addPreload(href: string, media: string) {
    const id = `preload-hero-${media.replace(/[^a-z0-9]/gi, '')}`;
    if (this.document.getElementById(id)) return;
    const link = this.document.createElement('link');
    link.id = id;
    link.rel = 'preload';
    link.as = 'image';
    link.type = 'image/webp';
    link.media = media;
    link.href = href;
    this.document.head.appendChild(link);
  }
}
