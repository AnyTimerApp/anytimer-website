import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  featured?: boolean;
  variant?: 'light' | 'blue' | 'dark' | 'accent';
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  posts: BlogPost[] = [
    {
      slug: 'wat-is-een-anytimer',
      category: 'Begrippen',
      title: 'Wat is een anytimer?',
      excerpt: 'Een anytimer is een tegoed tussen vrienden. Je verdient hem na een verloren weddenschap, een domme actie of een challenge. Je kan hem inzetten wanneer je maar wilt.',
      featured: true,
      variant: 'light'
    }
  ];
}
