import { AboutComponent, FaqItem } from '../../../../home/about/about.component';
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { getPostsBySlug, getRecommendedGamesForPost, getRecommendedPosts } from '../../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../../components/slider-nav/slider-nav.component';

// English version of blogs/begrippen/wat-is-een-anytimer.
@Component({
  selector: 'app-what-is-an-anytimer',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'what-is-an-anytimer.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/begrippen/wat-is-een-anytimer/wat-is-een-anytimer.component.scss']
})
export class WhatIsAnAnytimerComponent {
  readonly faqTitle = 'Everything about anytimers';
  readonly faqs: FaqItem[] = [
    { question: 'Can I transfer an anytimer to someone else?', answer: 'No. An anytimer only works between the two people who agreed on it. You can\'t pass it on or sell it to someone else.' },
    { question: 'How many anytimers can I have at the same time?', answer: 'There is no hard limit. In practice it works best if you don\'t stack too many anys on one person at once, because that leads to fights.' },
    { question: 'Is an anytimer the same as an adtje?', answer: 'No. An [adtje](/en/blog/dictionary/what-is-an-adtje) is the action: downing a drink in one go. An anytimer is the credit you earn and can use at any moment. Often it ends in an adtje.' },
    { question: 'Is there a difference between an anytimer and an "any"?', answer: 'No. "Any" is just the short, spoken version of anytimer. Students use both words all the time.' },
    { question: 'Can an anytimer expire?', answer: 'Officially not. You could agree on it though. Just make sure you use the any before the friendship ends. Agree on rules like this together beforehand.' },
    { question: 'Can I track anytimers in WhatsApp or a notes app?', answer: 'You can, but in practice it quickly leads to arguments because you have no version control. Read why in our article about [tracking anytimers](/en/blog/good-to-know/tracking-anytimers-in-whatsapp).' }
  ];

  private readonly ui = UI.en;
  readonly recommendedPosts = getRecommendedPosts(getPostsBySlug(['what-is-an-anytimer'], 'en')[0]);
  readonly recommendedGames = getRecommendedGamesForPost(getPostsBySlug(['what-is-an-anytimer'], 'en')[0]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels.Begrippen, url: `${this.ui.paths.blog}/${this.ui.categorySlugs.Begrippen}` },
    { label: 'What is an anytimer?' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-what-is-an-anytimer',
      lang: 'en',
      title: 'What is an anytimer? Meaning and rules',
      description: 'What is an anytimer? A free pass between friends that you can use at any moment. Learn how to earn one, how to use it and the unwritten rules.',
      url: 'https://anytimer.app/en/blog/dictionary/what-is-an-anytimer/',
      image: 'https://anytimer.app/assets/blogs/wat%20is%20een%20anytimer/Wat%20is%20een%20anytimer%20cover.png',
      imageAlt: 'What is an anytimer explained',
      published: '2026-04-12',
      breadcrumbs: this.breadcrumbs
    });
  }
}
