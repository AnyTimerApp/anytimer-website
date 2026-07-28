import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../pages/blog/blog-posts.data';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;
}
