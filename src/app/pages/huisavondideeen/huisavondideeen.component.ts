import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-huisavondideeen',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'huisavondideeen.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './huisavondideeen.component.scss']
})
export class HuisavondideeenComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: 'Inspiratie', url: '/blog/inspiratie' },
    { label: 'Top 10 leuke huisavondideeën' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Top 10 Leuke Huisavondideeën | AnyTimerApp';
    const description = 'Op zoek naar een leuke huisavond? Ontdek 10 ideeën: Zwarte Piste, Flunkybal, Kahoot, Slabakken en meer. Met alle spelregels en tips.';
    const image = 'https://anytimer.app/assets/blogs/huisavond/Huisavond%20zwarte%20piste.png';
    const url = 'https://anytimer.app/huisavondideeen/';
    const publishedTime = '2026-07-21';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-huisavondideeen', this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'article' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:image:alt', content: 'Zwarte piste huisavond spel' });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });
    meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    meta.updateTag({ property: 'article:published_time', content: publishedTime });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-huisavondideeen')) {
      const script = document.createElement('script');
      script.id = 'schema-huisavondideeen';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': title,
        'description': description,
        'image': image,
        'datePublished': publishedTime,
        'author': { '@type': 'Organization', 'name': 'AnyTimerApp' },
        'mainEntityOfPage': url
      });
      document.head.appendChild(script);
    }
  }
}
