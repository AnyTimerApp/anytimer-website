import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost, langOfPost } from '../../pages/blog/blog-posts.data';
import { UI, UiStrings } from '../../i18n/ui';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;

  // Labels follow the post's own language, so a card always matches its link.
  get ui(): UiStrings {
    return UI[langOfPost(this.post)];
  }

  get label(): string {
    return this.post.subCategory
      ? this.ui.subCategoryLabels[this.post.subCategory]
      : this.ui.categoryLabels[this.post.category];
  }
}
