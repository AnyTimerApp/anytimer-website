import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section" id="team">
      <div class="container">
        <h2 class="section-heading">Het team.</h2>

        <div class="team-grid">
          @for (member of members; track member.name; let i = $index) {
            <div class="member" [style.margin-top.px]="offsets[i]">
              <div class="portrait">
                <div class="portrait-placeholder" [style.background]="member.color"></div>
              </div>
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-heading {
      font-size: 2.5rem;
      margin-bottom: 60px;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    .member {
      max-width: 300px;
    }

    .portrait {
      margin-bottom: 20px;
    }
    .portrait-placeholder {
      width: 100%;
      aspect-ratio: 3 / 4;
      border-radius: 12px;
    }

    .member h3 {
      font-size: 1.15rem;
      margin-bottom: 4px;
    }
    .member p {
      font-size: 0.9rem;
      color: var(--text-tertiary);
    }

    @media (max-width: 768px) {
      .team-grid {
        grid-template-columns: 1fr;
        gap: 48px;
      }
      .member { margin-top: 0 !important; max-width: 280px; }
      .section-heading { font-size: 2rem; }
    }
  `]
})
export class TeamComponent {

  //todo these containers are placeholders for information perhaps?
  members = [
    { name: 'Marty', role: 'Developer', color: '#C4B5FD' },
    { name: 'Stijn', role: 'Developer', color: '#FCA5A5' },
    { name: 'Jilles', role: 'Marketing', color: '#93C5FD' }
  ];

  offsets = [0, 40, 16];
}
