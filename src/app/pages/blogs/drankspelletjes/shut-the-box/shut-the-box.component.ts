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
  selector: 'app-shut-the-box',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'shut-the-box.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './shut-the-box.component.scss']
})
export class ShutTheBoxComponent {
  readonly faqTitle = 'Alles over shut the box';
  readonly faqs: FaqItem[] = [
    { question: 'Met hoeveel spelers speel je shut the box?', answer: 'Je kunt het alleen spelen, maar ook met 2 tot 6 spelers. Met een gewone bak speel je om de beurt. Er zijn ook bakken voor 4 of 6 spelers, waarbij iedereen tegelijk speelt.' },
    { question: 'Wat gebeurt er als je alle cijfers dichtklapt?', answer: 'Dan heb je de box gesloten. Je hebt 0 punten en wint de ronde. In sommige groepen win je dan meteen het hele spel.' },
    { question: 'Wanneer mag je met één dobbelsteen gooien?', answer: 'Meestal als de 7, 8 en 9 dicht staan. Met twee dobbelstenen gooi je dan al snel te hoog. Spreek vooraf af welke regel jullie gebruiken.' },
    { question: 'Kun je shut the box spelen zonder box?', answer: 'Ja. Schrijf de cijfers 1 tot en met 9 op papier en streep ze door als je ze dichtklapt. Je hebt dan alleen twee dobbelstenen nodig.' }
  ];
  readonly faqPromoTitle = 'Meer drankspelletjes?';
  readonly faqPromoText = 'Bekijk alle drankspellen met spelregels';
  readonly faqPromoLink = '/blog/drankspelletjes';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'shut-the-box')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Shut the box' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'shut-the-box',
      lang: 'nl',
      title: 'Shut the box spelregels: zo speel je het drankspel',
      description: 'Shut the box spelregels: gooi twee dobbelstenen en klap cijfers dicht. Met punten tellen, de variant tot 12 en hoe je er een drankspel van maakt.',
      url: 'https://anytimer.app/blog/drankspelletjes/shut-the-box/',
      image: 'https://anytimer.app/assets/blogs/drankspel/shut%20the%20box.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Shut the box', alternateName: ['Shut de box', 'Shut the box dobbelspel'] }
    });
  }
}
