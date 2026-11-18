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

// English version of blogs/drankspelletjes/flunkyball. Styles are shared with the Dutch page.
@Component({
  selector: 'app-flunkyball-en',
  standalone: true,
  imports: [AboutComponent, SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'flunkyball.component.html',
  styleUrls: ['../../../../juridisch/juridisch.component.scss', '../../../../blogs/blog-article-shared.scss', '../../../../blogs/drankspelletjes/flunkyball/flunkyball.component.scss']
})
export class FlunkyballEnComponent {
  readonly faqTitle = 'Everything about Flunkyball';
  readonly faqs: FaqItem[] = [
    { question: 'How many players do you need for Flunkyball?', answer: 'Two teams of 3 to 8 players. Both teams are the same size. More players means a longer game, because there is more beer to finish.' },
    { question: 'What do you need for Flunkyball?', answer: 'An empty plastic bottle with a bit of water, a ball and a bottle or can of beer per player. Plus a patch of grass.' },
    { question: 'Can you play Flunkyball indoors?', answer: 'We wouldn\'t. You need 10 metres of space and there is running and spilling. Indoors [Beer Pong](/en/blog/drinking-games/beer-pong) works better.' },
    { question: 'What is the difference between Flunkyball and Beer Pong?', answer: 'In Beer Pong you throw a ball into cups and the other team drinks. In Flunkyball you knock over a bottle and you drink yourself. The fastest drinkers win.' }
  ];
  readonly faqPromoTitle = 'More drinking games?';
  readonly faqPromoText = 'See all drinking games and their rules';
  readonly faqPromoLink = '/en/blog/drinking-games';

  private readonly post = BLOG_POSTS_EN.find(p => p.slug === 'flunkyball')!;
  private readonly ui = UI.en;
  readonly subCategory = this.ui.subCategoryLabels[this.post.subCategory!];

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: this.ui.paths.blog },
    { label: this.ui.categoryLabels[this.post.category], url: `${this.ui.paths.blog}/${this.ui.categorySlugs[this.post.category]}` },
    { label: 'Flunkyball' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'en-flunkyball',
      lang: 'en',
      title: 'Flunkyball rules: how to play the drinking game',
      description: 'Flunkyball rules explained: two teams, a bottle in the middle and a ball. Knock the bottle over and drink your beer before the other team is back.',
      url: 'https://anytimer.app/en/blog/drinking-games/flunkyball/',
      image: 'https://anytimer.app/assets/blogs/drankspel/flunkybal.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-18',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Flunkyball', alternateName: ['Flunky ball', 'Flunkybal', 'Flanki'] },
    });
  }
}
