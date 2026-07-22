import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS } from '../blog/blog-posts.data';

@Component({
  selector: 'app-wat-is-een-adtje',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'wat-is-een-adtje.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './wat-is-een-adtje.component.scss']
})
export class WatIsEenAdtjeComponent {
  readonly category = BLOG_POSTS.find(p => p.slug === 'wat-is-een-adtje')!.category;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Wat is een adtje?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Wat is een Adtje? - Gids & Uitleg | AnyTimerApp';
    const description = 'Wat is een adtje? Lees alles over atten, shotgun en rietbak. Tips voor snel drinken, de oorsprong en alle drankspel tradities uit Nederland.';
    const image = 'https://anytimer.app/assets/blogs/wat%20is%20een%20adtje/wat%20is%20een%20adtje.png';
    const url = 'https://anytimer.app/wat-is-een-adtje/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-wat-is-een-adtje', this.breadcrumbs);

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
