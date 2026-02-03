import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'team.component.html',
  styleUrl: 'team.component.scss'
})
export class TeamComponent {
  members = [
    { name: 'Marty', role: 'Developer', color: '#C4B5FD' },
    { name: 'Stijn', role: 'Developer', color: '#FCA5A5' },
    { name: 'Jilles', role: 'Marketing', color: '#93C5FD' }
  ];

  offsets = [0, 40, 16];
}
