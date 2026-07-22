import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-drankspellen',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: 'drankspellen.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', './drankspellen.component.scss']
})
export class DrankspellenComponent {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: 'Inspiratie', url: '/blog/inspiratie' },
    { label: 'Top 10 leukste drankspellen voor een gezellige avond' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Top 10 Leukste Drankspellen voor een Gezellige Avond | AnyTimerApp';
    const description = 'Ontdek de top 10 leukste drankspellen voor een gezellige avond met vrienden. Mario Barf, Kingsen, Mexen en meer. Alle spelregels en tips.';
    const image = 'https://anytimer.app/assets/blogs/drankspellen/mario%20barf.png';
    const url = 'https://anytimer.app/drankspellen/';

    injectBreadcrumbSchema(document, 'schema-breadcrumbs-drankspellen', this.breadcrumbs);

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
