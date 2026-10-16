import { Meta } from '@angular/platform-browser';
import { BreadcrumbItem, injectBreadcrumbSchema } from './breadcrumb-schema';

export interface ArticleSeo {
  // Unique id, used for the JSON-LD script ids.
  id: string;
  lang: 'nl' | 'en';
  title: string;
  description: string;
  // Absolute URLs.
  url: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  published?: string;
  breadcrumbs: BreadcrumbItem[];
  // For drinking games known under more than one name (e.g. Rage Cage,
  // also called Stack Cup or Stress Pong), so search engines connect them.
  game?: { name: string; alternateName?: string[] };
}

// Meta tags, Open Graph, Twitter card, BlogPosting and BreadcrumbList JSON-LD
// for one article. og:locale is set globally in app.component.ts.
export function applyArticleSeo(meta: Meta, document: Document, seo: ArticleSeo) {
  injectBreadcrumbSchema(document, `schema-breadcrumbs-${seo.id}`, seo.breadcrumbs);

  meta.updateTag({ name: 'description', content: seo.description });

  meta.updateTag({ property: 'og:type', content: 'article' });
  meta.updateTag({ property: 'og:url', content: seo.url });
  meta.updateTag({ property: 'og:title', content: seo.title });
  meta.updateTag({ property: 'og:description', content: seo.description });
  meta.updateTag({ property: 'og:image', content: seo.image });
  meta.updateTag({ property: 'og:image:width', content: String(seo.imageWidth ?? 1536) });
  meta.updateTag({ property: 'og:image:height', content: String(seo.imageHeight ?? 1024) });
  meta.updateTag({ property: 'og:image:alt', content: seo.imageAlt });
  meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
  if (seo.published) {
    meta.updateTag({ property: 'article:published_time', content: seo.published });
  }

  meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  meta.updateTag({ name: 'twitter:title', content: seo.title });
  meta.updateTag({ name: 'twitter:description', content: seo.description });
  meta.updateTag({ name: 'twitter:image', content: seo.image });

  const schemaId = `schema-${seo.id}`;
  if (!document.getElementById(schemaId)) {
    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': seo.title,
      'description': seo.description,
      'image': seo.image,
      'inLanguage': seo.lang,
      ...(seo.published ? { datePublished: seo.published } : {}),
      'author': { '@type': 'Organization', 'name': 'AnyTimerApp' },
      'mainEntityOfPage': seo.url,
      ...(seo.game ? {
        about: {
          '@type': 'Game',
          'name': seo.game.name,
          ...(seo.game.alternateName?.length ? { alternateName: seo.game.alternateName } : {})
        }
      } : {})
    });
    document.head.appendChild(script);
  }
}
