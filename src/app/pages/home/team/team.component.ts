import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'team.component.html',
  styleUrl: 'team.component.scss'
})
export class TeamComponent {
  members = [
    {
      name: 'Martijn',
      role: 'Developer',
      webp: 'assets/team/Marty.webp',
      png: 'assets/team/Marty.png'
    },
    {
      name: 'Stijn',
      role: 'Developer',
      webp: 'assets/team/Stijn.webp',
      png: 'assets/team/Stijn.png'
    },
    {
      name: 'Jilles',
      role: 'Marketing',
      webp: 'assets/team/Jill.webp',
      png: 'assets/team/Jill.png'
    }
  ];

  offsets = [0, 40, 16];
}