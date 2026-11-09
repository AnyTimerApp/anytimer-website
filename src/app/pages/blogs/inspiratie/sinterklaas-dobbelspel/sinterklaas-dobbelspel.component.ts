import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, DrankspelSubCategory, getRecommendedPosts } from '../../../blog/blog-posts.data';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-sinterklaas-dobbelspel',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'sinterklaas-dobbelspel.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', '../drankspellen/drankspellen.component.scss', '../../drankspelletjes/beerpong/beerpong.component.scss']
})
export class SinterklaasDobbelspelComponent {
  readonly recommendedPosts = getRecommendedPosts(BLOG_POSTS.find(p => p.slug === 'sinterklaas-dobbelspel')!);
  readonly category = BLOG_POSTS.find(p => p.slug === 'sinterklaas-dobbelspel')!.category;
  // Game type for the info card. Not stored in BLOG_POSTS: a subCategory there would
  // replace the Inspiratie label on the blog cards.
  readonly subCategory: DrankspelSubCategory = 'Dobbelspel';

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Sinterklaas dobbelspel' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'sinterklaas-dobbelspel',
      lang: 'nl',
      title: 'Sinterklaas dobbelspel: regels en opdrachten voor volwassenen',
      description: 'Zo speel je het Sinterklaas dobbelspel met cadeautjes. Regels per worp, opdrachten voor volwassenen en een studentenhuisversie met anytimers.',
      url: 'https://anytimer.app/blog/inspiratie/sinterklaas-dobbelspel/',
      image: 'https://anytimer.app/assets/blogs/sinterklaas%20dobbelspel/sinterklaas.png',
      imageAlt: 'Vrienden gooien een dobbelsteen naast een stapel cadeautjes bij het Sinterklaas dobbelspel',
      published: '2026-11-09',
      breadcrumbs: this.breadcrumbs
    });
  }
}
