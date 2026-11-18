import { AboutComponent, FaqItem } from '../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../../../shared/breadcrumb-schema';
import { BLOG_POSTS, CATEGORY_SLUGS, getRecommendedGamesForPost, getRecommendedPosts } from '../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';


@Component({
  selector: 'app-wat-is-een-anytimer',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'wat-is-een-anytimer.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './wat-is-een-anytimer.component.scss']
})
export class WatIsEenAnytimer {
  readonly faqTitle = 'Alles over anytimers';
  readonly faqs: FaqItem[] = [
    { question: 'Kan ik een anytimer overdragen aan iemand anders?', answer: 'Nee. Een anytimer werkt alleen tussen de twee mensen die hem hebben afgesproken. Je kan hem niet doorgeven of doorverkopen aan een ander.' },
    { question: 'Hoeveel anytimers mag ik tegelijk hebben staan?', answer: 'Daar zit geen harde limiet op. In de praktijk werkt het het prettigst als je niet te veel any\'s tegelijk op één persoon opstapelt omdat dit voor ruzie zorgt.' },
    { question: 'Is een anytimer hetzelfde als een adtje?', answer: 'Nee. Een [adtje](/wat-is-een-adtje) is de handeling: een drankje in één keer opdrinken. Een anytimer is het tegoed dat je verdient en op elk moment mag inzetten, vaak resulterend in een adtje.' },
    { question: 'Is er verschil tussen een anytimer en een "any"?', answer: 'Nee. "Any" is gewoon de verkorte spreektaalversie van anytimer. Studenten gebruiken beide woorden door elkaar.' },
    { question: 'Kan een anytimer verjaren?', answer: 'Officieel niet. Dit zou je kunnen afspreken. Zet de any vooral in voordat de vriendschap eindigt. Leg dit soort regels vooraf samen vast.' },
    { question: 'Kan ik anytimers bijhouden via WhatsApp of een notitie-app?', answer: 'Het kan, maar in de praktijk ontstaat er al snel discussie omdat je geen versiebeheer hebt. Lees waarom in ons artikel over [anytimers bijhouden](/anytimers-bijhouden-whatsapp-notities).' }
  ];

  readonly category = BLOG_POSTS.find(p => p.slug === 'wat-is-een-anytimer')!.category;
  readonly recommendedPosts = getRecommendedPosts(BLOG_POSTS.find(p => p.slug === 'wat-is-een-anytimer')!);
  readonly recommendedGames = getRecommendedGamesForPost(BLOG_POSTS.find(p => p.slug === 'wat-is-een-anytimer')!);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Wat is een anytimer?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Wat is een anytimer? Betekenis en regels';
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
    meta.updateTag({ property: 'og:image:width', content: '1536' });
    meta.updateTag({ property: 'og:image:height', content: '1024' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
