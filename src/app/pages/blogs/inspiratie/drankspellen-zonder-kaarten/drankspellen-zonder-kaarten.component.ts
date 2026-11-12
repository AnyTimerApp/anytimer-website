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
  selector: 'app-drankspellen-zonder-kaarten',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drankspellen-zonder-kaarten.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', '../drankspellen/drankspellen.component.scss']
})
export class DrankspellenZonderKaartenComponent {
  readonly recommendedPosts = getRecommendedPosts(BLOG_POSTS.find(p => p.slug === 'drankspellen-zonder-kaarten')!);
  readonly recommendedGames = getRecommendedGamesForPost(BLOG_POSTS.find(p => p.slug === 'drankspellen-zonder-kaarten')!);
  readonly category = BLOG_POSTS.find(p => p.slug === 'drankspellen-zonder-kaarten')!.category;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Drankspellen zonder kaarten' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'drankspellen-zonder-kaarten',
      lang: 'nl',
      title: 'Drankspellen zonder kaarten: 10 spellen voor elke avond',
      description: 'Deze 10 drankspellen speel je zonder kaarten. Met dobbelstenen, bekers, een glas of je telefoon. Per spel het aantal spelers en hoe het werkt.',
      url: 'https://anytimer.app/blog/inspiratie/drankspellen-zonder-kaarten/',
      image: 'https://anytimer.app/assets/blogs/drankspellen/mexen.png',
      imageAlt: 'Mexen dobbelspel als drankspel',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
