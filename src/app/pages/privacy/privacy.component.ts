import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container page-content">
      <h1>Privacy Policy</h1>
      <p class="date">Last updated: October 2024</p>

      <div class="content-block">
        <h3>1. Introduction</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

        <h3>2. Data Collection</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <h3>3. User Rights</h3>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-content { padding: 60px 24px; max-width: 800px; }
    .date { color: var(--neutral-light-dark); margin-bottom: 40px; }
    .content-block h3 { color: var(--primary); margin-top: 32px; }
  `]
})
export class PrivacyComponent {}
