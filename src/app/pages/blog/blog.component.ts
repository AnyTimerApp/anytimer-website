import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';

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
    },
    {
      slug: 'drankspellen',
      category: 'Ideeën',
      title: 'Top 10 drankspellen voor een gezellige avond',
      excerpt: 'Van Mario Barf tot Kingsen en Mexen — onze top 10 drankspellen voor een gezellige avond met vrienden. Met alle regels en tips.',
      variant: 'blue'
    },
    {
      slug: 'wat-is-een-adtje',
      category: 'Begrippen',
      title: 'Wat is een adtje?',
      excerpt: 'Een adtje betekent dat je een drankje in één keer leegdrinkt. Leer tips voor atten, het verschil met een shotgun en wat een rietbak is.',
      variant: 'light'
    }
  ];

  constructor(meta: Meta) {
    const title = 'Anytimer Blog - Tips, Ideeën & Gidsen | Anytimer App';
    const description = 'Lees onze blog met tips, ideeën en gidsen voor anytimers. Ontdek hoe je het meest uit je anytimers haalt en creëer meer plezier met je vrienden.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/blog/';

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
