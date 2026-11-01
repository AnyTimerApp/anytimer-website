import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { DownloadCtaComponent } from '../../../../components/download-cta/download-cta.component';
import { BreadcrumbItem } from '../../../../shared/breadcrumb-schema';
import { applyArticleSeo } from '../../../../shared/article-seo';
import { BLOG_POSTS, CATEGORY_SLUGS, getRecommendedPosts } from '../../../blog/blog-posts.data';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-drankspellen-voor-2-personen',
  standalone: true,
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'drankspellen-voor-2-personen.component.html',
  styleUrls: ['../../../juridisch/juridisch.component.scss', '../../blog-article-shared.scss', '../drankspellen/drankspellen.component.scss']
})
export class DrankspellenVoor2PersonenComponent {
  readonly recommendedPosts = getRecommendedPosts(BLOG_POSTS.find(p => p.slug === 'drankspellen-voor-2-personen')!);
  readonly category = BLOG_POSTS.find(p => p.slug === 'drankspellen-voor-2-personen')!.category;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: 'Drankspellen voor 2 personen' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyArticleSeo(meta, document, {
      id: 'drankspellen-voor-2-personen',
      lang: 'nl',
      title: 'Drankspellen voor 2 personen: 10 spellen met z\'n tweeën',
      description: 'Deze 10 drankspellen speel je al met 2 personen. Van Zeeslag en Mexen tot Hoger lager. Per spel het aantal spelers, wat je nodig hebt en hoe het werkt.',
      url: 'https://anytimer.app/blog/inspiratie/drankspellen-voor-2-personen/',
      image: 'https://anytimer.app/assets/blogs/drankspel/zeeslag.png',
      imageAlt: 'Zeeslag drankspel met het Zeeslag bord en pionnen',
      published: '2026-10-20',
      breadcrumbs: this.breadcrumbs
    });
  }
}
