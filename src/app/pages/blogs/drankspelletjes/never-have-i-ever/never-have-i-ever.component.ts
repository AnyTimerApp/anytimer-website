import { AboutComponent, FaqItem } from '../../../home/about/about.component';
import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { currentCategory, revealButton } from '../../../../components/never-cards/category-spy';
import { NeverCardsComponent } from '../../../../components/never-cards/never-cards.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, getSimilarGames, getRecommendedGames } from '../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';
import { NEVER_CATEGORIES_NL } from './never-have-i-ever.data';

@Component({
  selector: 'app-never-have-i-ever',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent, NeverCardsComponent],
  templateUrl: 'never-have-i-ever.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './never-have-i-ever.component.scss']
})
export class NeverHaveIEverComponent {
  readonly categories = NEVER_CATEGORIES_NL;
  readonly questionCount = this.categories.reduce((n, c) => n + c.questions.length, 0);

  readonly faqTitle = 'Alles over never have I ever';
  readonly faqs: FaqItem[] = [
    { question: 'Wat is never have I ever?', answer: 'Een spel waarin je om de beurt iets noemt wat je nog nooit hebt gedaan. Wie het wel heeft gedaan, doet een vinger omlaag. Op feestjes en huisavonden speel je het vaak als drankspel.' },
    { question: 'Kun je never have I ever online spelen?', answer: 'Ja, op deze pagina. Tik bovenaan op de kaart of op Nieuwe kaart voor een nieuwe vraag. Je kiest zelf welke categorieën meedoen en hoeft niks te downloaden.' },
    { question: 'Is het Ik heb nog nooit of Nooit heb ik ooit?', answer: 'Allebei. Ik heb nog nooit is de gewone Nederlandse naam. Nooit heb ik ooit is een letterlijke vertaling van never have I ever en hoor je minder vaak.' },
    { question: 'Wie wint er bij never have I ever?', answer: 'Iedereen begint met tien vingers omhoog. Wie iets heeft gedaan wat genoemd wordt, doet een vinger omlaag. Zonder vingers ben je af, en de laatste met vingers omhoog wint. In de drankspelversie valt niemand af, dus daar is geen winnaar.' },
    { question: 'Welke vragen werken het best bij never have I ever?', answer: 'Vragen over één concreet moment dat ongeveer de helft van de groep heeft meegemaakt. Dan moet er iemand een verhaal vertellen. Een te brave vraag levert niks op en een te heftige kan de sfeer verpesten, dus begin licht.' },
    { question: 'Hoe speel je never have I ever als drankspel?', answer: 'Je neemt een slok in plaats van een vinger omlaag te doen. Er valt niemand af, dus je speelt zo lang als je wilt. Speel je toch met vingers, dan trekt wie als eerste geen vingers meer heeft een bak.' },
    { question: 'Met hoeveel mensen speel je never have I ever?', answer: 'Vanaf twee spelers, maar met vier tot tien is het het leukst. Met een grotere groep duurt een ronde langer. Meer spellen voor een grote groep vind je bij [Vikingen](/blog/drankspelletjes/vikingen).' }
  ];
  readonly faqPromoTitle = 'Meer drankspelletjes?';
  readonly faqPromoText = 'Bekijk alle drankspellen met spelregels';
  readonly faqPromoLink = '/blog/drankspelletjes';

  private readonly post = BLOG_POSTS.find(p => p.slug === 'never-have-i-ever')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Never have I ever' }
  ];

  // Same smooth glide as the anchor links on the home page. Only for these
  // links, so the router's scroll restoration on this page is not animated.
  scrollToCategory(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // The category in view, highlighted in the sticky filter bar.
  activeCategory: string | null = null;
  // True once the filter bar sticks under the navbar. Only then does it get
  // its white background, border and shadow.
  navStuck = false;
  @ViewChild('questionNav') private questionNav?: ElementRef<HTMLElement>;
  private spyFrame = 0;

  @HostListener('window:scroll')
  onScroll() {
    if (this.spyFrame) return;
    this.spyFrame = requestAnimationFrame(() => {
      this.spyFrame = 0;
      const bar = this.questionNav?.nativeElement;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      this.navStuck = rect.top <= parseFloat(getComputedStyle(bar).top) + 1;
      // The line just under the sticky bar.
      const offset = rect.bottom + 8;
      const active = currentCategory(this.categories.map(c => c.id), offset);
      if (active !== this.activeCategory) {
        this.activeCategory = active;
        if (active) revealButton(bar, active);
      }
    });
  }

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'never-have-i-ever',
      lang: 'nl',
      title: 'Never have I ever vragen: 150 juicy vragen en online spel',
      description: '150 never have I ever vragen: grappig, spicy en dirty 18+. Speel het online spel met kaarten of lees de regels van Ik heb nog nooit, ook als drankspel.',
      url: 'https://anytimer.app/blog/drankspelletjes/never-have-i-ever/',
      image: 'https://anytimer.app/assets/blogs/drankspel/Never%20Have%20I%20Ever%20Party.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-19',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Never have I ever', alternateName: ['Ik heb nog nooit', 'Nooit heb ik ooit'] }
    });
  }
}
