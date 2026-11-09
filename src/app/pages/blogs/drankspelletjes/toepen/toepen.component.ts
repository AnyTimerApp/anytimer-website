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

@Component({
  selector: 'app-toepen',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'toepen.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', './toepen.component.scss']
})
export class ToepenComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === 'toepen')!;
  readonly category = this.post.category;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Toepen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'toepen',
      lang: 'nl',
      title: 'Toepen regels: zo speel je het drankspel',
      description: 'Toepen regels uitgelegd: de kaarten, kleur bekennen, toepen, passen, vuile was en strafpunten. Plus de opties om toepen als drankspel te spelen.',
      url: 'https://anytimer.app/blog/drankspelletjes/toepen/',
      image: 'https://anytimer.app/assets/blogs/drankspel/toepen.png',
      imageAlt: this.post.imageAlt,
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs,
      game: { name: 'Toepen', alternateName: ['Toep', 'Toepen kaartspel'] }
    });
  }
}
