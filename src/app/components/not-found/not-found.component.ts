import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container not-found">
      <h1>404</h1>
      <h3>Dit rondje is van niemand.</h3>
      <p>De pagina die je zoekt bestaat niet of is verplaatst.</p>
      <a routerLink="/" class="btn btn-primary">Terug naar home</a>
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
      padding-top: calc(var(--header-height) + 40px);
    }
    h1 {
      font-size: 6rem;
      color: var(--primary-light);
      opacity: 0.5;
    }
    h3 { margin: 16px 0 8px; }
    p { margin-bottom: 32px; }
  `]
})
export class NotFoundComponent {}
