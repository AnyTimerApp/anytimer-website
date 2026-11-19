import { AboutComponent, FaqItem } from '../../../../home/about/about.component';
import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../../components/download-cta/download-cta.component';
import { BlogCardComponent } from '../../../../../components/blog-card/blog-card.component';
import { currentCategory, revealButton } from '../../../../../components/never-cards/category-spy';
import { NeverCardsComponent } from '../../../../../components/never-cards/never-cards.component';
import { BreadcrumbItem } from '../../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../../shared/article-seo';
import { UI } from '../../../../../i18n/ui';
import { BLOG_POSTS_EN } from '../../../../blog/blog-posts.en.data';
import { getSimilarGames, getRecommendedGames } from '../../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../../components/slider-nav/slider-nav.component';
import { NEVER_CATEGORIES_EN } from './never-have-i-ever.en.data';

// English version of blogs/drankspelletjes/never-have-i-ever. Styles are shared with the Dutch page.
@Component({
  selector: 'app-never-have-i-ever-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent, NeverCardsComponent],
  templateUrl: 'never-have-i-ever.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/never-have-i-ever/never-have-i-ever.component.scss']
})
export class NeverHaveIEverEnComponent {
  readonly categories = NEVER_CATEGORIES_EN;
  readonly questionCount = this.categories.reduce((n, c) => n + c.questions.length, 0);

  readonly faqTitle = 'Everything about Never have I ever';
  readonly faqs: FaqItem[] = [
    { question: 'What is Never have I ever?', answer: 'A game where you take turns naming something you have never done. Anyone who has done it puts a finger down. At parties and house nights it is often played as a drinking game.' },
    { question: 'Can you play Never have I ever online?', answer: 'Yes, on this page. Tap the card at the top or New card for a new question. You pick which categories are in, and there is nothing to download.' },
    { question: 'What is Never have I ever called in Dutch?', answer: 'Ik heb nog nooit. Some people say Nooit heb ik ooit, a literal translation of the English name. The rules are the same.' },
    { question: 'Who wins Never have I ever?', answer: 'Everyone starts with ten fingers up. If you have done what someone says, you put a finger down. With no fingers left you are out, and the last one with fingers up wins. In the drinking game version nobody is out, so there is no winner.' },
    { question: 'Which questions work best in Never have I ever?', answer: 'Questions about one specific moment that about half the group has been through. Then someone has to tell the story. A question that is too tame gets nothing, and one that is too heavy can spoil the mood, so start light.' },
    { question: 'How do you play Never have I ever as a drinking game?', answer: 'You take a sip instead of putting a finger down. Nobody is out, so you play as long as you like. If you keep the fingers too, the first person with none left downs their drink.' },
    { question: 'How many players do you need for Never have I ever?', answer: 'Two is enough, but it is best with four to ten. With a bigger group a round takes longer. More games for a big group? Try [Vikings](/en/blog/drinking-games/vikings).' }
  ];
  readonly faqPromoTitle = 'More drinking games?';
  readonly faqPromoText = 'See all drinking games and their rules';
  readonly faqPromoLink = '/en/blog/drinking-games';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'never-have-i-ever')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];
  readonly whatIsAnytimer = this.ui.paths.whatIsAnytimer;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
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
      id: 'en-never-have-i-ever',
      lang: 'en',
      title: 'Never have I ever questions: 150 juicy picks + online game',
      description: '150 never have I ever questions: funny, spicy and dirty 18+. Play the online card game or read the rules, drinking game included, Dutch student style.',
      url: 'https://anytimer.app/en/blog/drinking-games/never-have-i-ever/',
      image: 'https://anytimer.app/assets/blogs/drankspel/Never%20Have%20I%20Ever%20Party.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-19',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Never have I ever', alternateName: ['Ik heb nog nooit', 'Nooit heb ik ooit'] }
    });
  }
}
