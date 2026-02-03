import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container not-found">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="btn btn-primary">Go back home</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
    }
    h1 { font-size: 6rem; color: var(--primary-light); margin: 0; opacity: 0.5; }
  `]
})
export class NotFoundComponent {}
