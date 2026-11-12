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
  selector: 'app-beerpong',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'beerpong.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './beerpong.component.scss']
})
export class BeerpongComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'beerpong')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Beerpong' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'beerpong',
      lang: 'nl',
      title: 'Beerpong regels: zo speel je het drankspel',
      description: 'Beerpong regels uitgelegd: de opstelling van de bekers, gooien, rerack, bouncen en eilandjes. Plus varianten zoals flip cup en Stress Pong.',
      url: 'https://anytimer.app/blog/drankspelletjes/beerpong/',
      image: 'https://anytimer.app/assets/blogs/drankspel/beerpong.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Beerpong', alternateName: ['Beer pong', 'Bier pong', 'Beruit'] }
    });
  }
}
