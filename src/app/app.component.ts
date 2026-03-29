import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const BASE_URL = 'https://anytimer.app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'anytimer-website';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit() {
    this.setHreflang(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.setHreflang(e.urlAfterRedirects));
  }

  private setHreflang(url: string) {
    const path = url.split('#')[0].split('?')[0];
    const href = BASE_URL + (path === '/' || path === '' ? '/' : path);

    let link = this.document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="nl"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', 'nl');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    let xDefault = this.document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = this.document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      this.document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', href);
  }
}
