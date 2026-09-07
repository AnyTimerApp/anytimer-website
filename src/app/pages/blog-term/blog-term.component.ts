import { Component, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BLOG_POSTS, CATEGORY_SLUGS, BlogPost, BEGRIPPEN_LETTERS } from '../blog/blog-posts.data';
import { BEGRIPPEN_CONTENT, BegripContent } from './begrippen-content.data';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../components/download-cta/download-cta.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

const OG_IMAGE = 'https://anytimer.app/assets/blogs/wat%20is%20een%20anytimer/Wat%20is%20een%20anytimer%20cover.webp';

@Component({
  selector: 'app-blog-term',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent],
  templateUrl: './blog-term.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', '../blog/blog-shared.component.scss', '../blogs/blog-article-shared.scss']
})
export class BlogTermComponent {
  post: BlogPost;
  content: BegripContent;
  breadcrumbs: BreadcrumbItem[];
  letters = BEGRIPPEN_LETTERS;

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    const slug = route.snapshot.data['slug'] as string;
    this.post = BLOG_POSTS.find(p => p.slug === slug)!;
    this.content = BEGRIPPEN_CONTENT[slug];

    this.breadcrumbs = [
      { label: 'Blog', url: '/blog' },
      { label: this.post.category, url: `/blog/${CATEGORY_SLUGS[this.post.category]}` },
      { label: this.post.title }
    ];

    const title = `Wat betekent: ${this.post.title}?`;
    const description = this.post.excerpt;
    const url = `https://anytimer.app/${this.post.path}/`;

    injectBreadcrumbSchema(document, `schema-breadcrumbs-${slug}`, this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    meta.updateTag({ property: 'og:image:alt', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    const schemaId = `schema-defined-term-${slug}`;
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        'name': this.post.title,
        'description': description,
        'url': url,
        'inDefinedTermSet': 'https://anytimer.app/blog/begrippen/'
      });
      document.head.appendChild(script);
    }
  }
}
