import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container page-content">
      <h1>Terms of Use</h1>
      <p class="date">Last updated: October 2024</p>

      <div class="content-block">
        <h3>1. Acceptance of Terms</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullamis eget est a dui feugiat suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>

        <h3>2. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Mindify's website for personal, non-commercial transitory viewing only.</p>

        <h3>3. Disclaimer</h3>
        <p>The materials on Mindify's website are provided on an 'as is' basis. Mindify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-content { padding: 60px 24px; max-width: 800px; }
    .date { color: var(--neutral-light-dark); margin-bottom: 40px; }
    .content-block h3 { color: var(--primary); margin-top: 32px; }
  `]
})
export class TermsComponent {}
