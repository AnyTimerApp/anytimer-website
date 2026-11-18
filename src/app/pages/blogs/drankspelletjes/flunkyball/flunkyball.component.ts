import { AboutComponent, FaqItem } from '../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, getSimilarGames, getRecommendedGames } from '../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';

@Component({
  selector: 'app-flunkyball',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'flunkyball.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './flunkyball.component.scss']
})
export class FlunkyballComponent {
  readonly faqTitle = 'Alles over flunkyball';
  readonly faqs: FaqItem[] = [
    { question: 'Met hoeveel spelers speel je flunkyball?', answer: 'Met twee teams van 3 tot 8 spelers. Beide teams zijn even groot. Met meer spelers duurt het langer, omdat er meer bier op moet.' },
    { question: 'Wat heb je nodig voor flunkyball?', answer: 'Een lege plastic fles met een beetje water, een bal en per speler een flesje of blikje bier. Verder alleen een grasveld.' },
    { question: 'Kun je flunkyball binnen spelen?', answer: 'Dat raden we af. Je hebt 10 meter ruimte nodig en er wordt gerend en gemorst. Binnen werkt [Beerpong](/blog/drankspelletjes/beerpong) beter.' },
    { question: 'Wat is het verschil tussen flunkyball en beerpong?', answer: 'Bij beerpong gooi je een balletje in bekers en drinkt de tegenstander. Bij flunkyball gooi je een fles om en drink je zelf. Wie het snelst drinkt, wint.' }
  ];
  readonly faqPromoTitle = 'Meer drankspelletjes?';
  readonly faqPromoText = 'Bekijk alle drankspellen met spelregels';
  readonly faqPromoLink = '/blog/drankspelletjes';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'flunkyball')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Flunkyball' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'flunkyball',
      lang: 'nl',
      title: 'Flunkyball regels: zo speel je het drankspel',
      description: 'Flunkyball regels uitgelegd: twee teams, een fles in het midden en een bal. Gooi de fles om en drink je bier leeg voordat het andere team terug is.',
      url: 'https://anytimer.app/blog/drankspelletjes/flunkyball/',
      image: 'https://anytimer.app/assets/blogs/drankspel/flunkybal.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Flunkyball', alternateName: ['Flunkybal', 'Flunky ball', 'Flanki'] }
    });
  }
}
