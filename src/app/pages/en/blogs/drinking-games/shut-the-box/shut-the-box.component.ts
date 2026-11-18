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
import { BLOG_POSTS_EN } from '../../../../blog/blog-posts.en.data';
import { getSimilarGames, getRecommendedGames } from '../../../../blog/blog-posts.data';
import { SliderNavComponent } from '../../../../../components/slider-nav/slider-nav.component';

// English version of blogs/drankspelletjes/shut-the-box. Styles are shared with the Dutch page.
@Component({
  selector: 'app-shut-the-box-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'shut-the-box.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/shut-the-box/shut-the-box.component.scss']
})
export class ShutTheBoxEnComponent {
  readonly faqTitle = 'Everything about Shut the Box';
  readonly faqs: FaqItem[] = [
    { question: 'How many players can play Shut the Box?', answer: 'You can play on your own, or with 2 to 6 players. With a normal box you take turns. There are also boxes for 4 or 6 players, where everyone plays at the same time.' },
    { question: 'What happens if you flip down every number?', answer: 'Then you have shut the box. You score 0 and win the round. Some groups give you the whole game straight away.' },
    { question: 'When can you roll just one die?', answer: 'Usually once the 7, 8 and 9 are down. With two dice you would roll too high too often. Agree beforehand which rule you use.' },
    { question: 'Can you play Shut the Box without a box?', answer: 'Yes. Write the numbers 1 to 9 on paper and cross them out as you flip them down. Then all you need is two dice.' }
  ];
  readonly faqPromoTitle = 'More drinking games?';
  readonly faqPromoText = 'See all drinking games and their rules';
  readonly faqPromoLink = '/en/blog/drinking-games';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'shut-the-box')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Shut the Box' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-shut-the-box',
      lang: 'en',
      title: 'Shut the Box rules: how to play the drinking game',
      description: 'Shut the Box rules: roll two dice and flip down the numbers. How to keep score, the version up to 12 and how to turn it into a drinking game.',
      url: 'https://anytimer.app/en/blog/drinking-games/shut-the-box/',
      image: 'https://anytimer.app/assets/blogs/drankspel/shut%20the%20box.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Shut the Box', alternateName: ['Shut the Box dice game', 'Canoga'] },
    });
  }
}
