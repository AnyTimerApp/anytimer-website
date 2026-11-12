import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, getRecommendedGamesForPost, getRecommendedPosts } from '../../../blog/blog-posts.data';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { SliderNavComponent } from '../../../../components/slider-nav/slider-nav.component';

@Component({
  selector: 'app-drankspellen-met-kaarten',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drankspellen-met-kaarten.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', '../drankspellen/drankspellen.component.scss']
})
export class DrankspellenMetKaartenComponent {
  readonly recommendedPosts = getRecommendedPosts(BLOG_POSTS.find(p => p.slug === 'drankspellen-met-kaarten')!);
  readonly recommendedGames = getRecommendedGamesForPost(BLOG_POSTS.find(p => p.slug === 'drankspellen-met-kaarten')!);
  readonly category = BLOG_POSTS.find(p => p.slug === 'drankspellen-met-kaarten')!.category;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Drankspellen met kaarten' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'drankspellen-met-kaarten',
      lang: 'nl',
      title: 'Drankspellen met kaarten: de 8 leukste kaartspellen',
      description: 'Met een stok kaarten speel je de leukste drankspellen. Kingsen, Bussen, Fuck the Dealer en meer. Per spel het aantal spelers en hoe het werkt.',
      url: 'https://anytimer.app/blog/inspiratie/drankspellen-met-kaarten/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/kingsen.png',
      imageAlt: 'Kingsen drankspel met kaarten in een cirkel rond een shotglas',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
