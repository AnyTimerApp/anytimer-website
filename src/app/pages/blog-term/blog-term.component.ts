import { Component, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BlogPost, firstLetterOf, postsFor } from '../blog/blog-posts.data';
import { BEGRIPPEN_CONTENT, BegripContent } from './begrippen-content.data';
import { BEGRIPPEN_CONTENT_EN } from './begrippen-content.en.data';
import { Lang } from '../../i18n/lang';
import { UI, UiStrings } from '../../i18n/ui';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../components/download-cta/download-cta.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';
import { termSeoTitle } from '../../shared/term-seo-title';

// Label + note for English dictionary entries that stay Dutch (or Flemish).
const ORIGIN_TEXT = {
  dutch: {
    label: 'Dutch student slang',
    note: 'This is a Dutch word. You will hear it a lot at Dutch universities, student associations and in student houses.'
  },
  flemish: {
    label: 'Flemish student slang',
    note: 'This is a Flemish word. You mostly hear it from Belgian students, but plenty of Dutch students know it too.'
  }
};

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
  letters: string[];
  lang: Lang;
  ui: UiStrings;
  // Path of the dictionary hub, used by the letter bar.
  hubPath: string;
  heading: string;
  origin: { label: string; note: string } | null;

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    const slug = route.snapshot.data['slug'] as string;
    this.lang = (route.snapshot.data['lang'] as Lang) ?? 'nl';
    this.ui = UI[this.lang];
    const en = this.lang === 'en';
    const terms = postsFor(this.lang).filter(p => p.category === 'Begrippen');

    this.post = terms.find(p => p.slug === slug)!;
    this.content = (en ? BEGRIPPEN_CONTENT_EN : BEGRIPPEN_CONTENT)[slug];
    this.letters = [...new Set(terms.map(firstLetterOf))].sort((a, b) => a.localeCompare(b, this.lang));
    this.hubPath = `${this.ui.paths.blog}/${this.ui.categorySlugs.Begrippen}`;
    this.heading = en ? `What does ${this.post.title} mean?` : `Wat betekent: ${this.post.title}?`;
    this.origin = this.post.termOrigin ? ORIGIN_TEXT[this.post.termOrigin] : null;

    this.breadcrumbs = [
      { label: 'Blog', url: this.ui.paths.blog },
      { label: this.ui.categoryLabels[this.post.category], url: this.hubPath },
      { label: this.post.title }
    ];

    const title = termSeoTitle(this.post.title, this.lang, this.post.termOrigin);
    const description = this.post.excerpt;
    const url = `https://anytimer.app/${this.post.path}/`;

    injectBreadcrumbSchema(document, `schema-breadcrumbs-${slug}`, this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    meta.updateTag({ property: 'og:image:width', content: '1536' });
    meta.updateTag({ property: 'og:image:height', content: '1024' });
    meta.updateTag({ property: 'og:image:alt', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });

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
        'inLanguage': this.lang,
        'inDefinedTermSet': `https://anytimer.app${this.hubPath}/`
      });
      document.head.appendChild(script);
    }
  }
}
