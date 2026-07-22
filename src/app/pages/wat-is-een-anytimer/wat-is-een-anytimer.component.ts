import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-wat-is-een-anytimer',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'wat-is-een-anytimer.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './wat-is-een-anytimer.component.scss']
})
export class WatIsEenAnytimer {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: 'Begrippen', url: '/blog/begrippen' },
    { label: 'Wat is een anytimer?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Wat is een Anytimer? - Gids & Uitleg | Anytimer App';
    const description = 'Wat is een anytimer? Ontdek alles over dit concept: een tegoed in te zetten op elk moment. Lees hoe je het verdient, inzet en waarom je het nodig hebt.';
    const image = 'https://anytimer.app/assets/blogs/wat%20is%20een%20anytimer/Wat%20is%20een%20anytimer%20cover.png';
    const url = 'https://anytimer.app/wat-is-een-anytimer/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-wat-is-een-anytimer', this.breadcrumbs);

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
