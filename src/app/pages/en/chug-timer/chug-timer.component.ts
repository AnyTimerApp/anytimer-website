import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../../../components/blog-card/blog-card.component';
import { getRecommendedGamesForSlug, getRecommendedPostsForSlug } from '../../blog/blog-posts.data';
import { AdtTimerComponent } from '../../../components/adt-timer/adt-timer.component';
import { DownloadCtaComponent } from '../../../components/download-cta/download-cta.component';
import { applyAdtTimerSeo } from '../../adt-timer/adt-timer-page.component';
import { SliderNavComponent } from '../../../components/slider-nav/slider-nav.component';

// English version of /adt-timer/. Styles are shared with the Dutch page.
@Component({
  selector: 'app-chug-timer-en',
  standalone: true,
  imports: [SliderNavComponent, RouterLink, AdtTimerComponent, DownloadCtaComponent, BlogCardComponent],
  templateUrl: 'chug-timer.component.html',
  styleUrls: ['../../juridisch/juridisch.component.scss', '../../blogs/blog-article-shared.scss', '../../adt-timer/adt-timer-page.component.scss']
})
export class ChugTimerEnComponent {
  readonly recommendedGames = getRecommendedGamesForSlug('adt-timer', 'en');
  readonly recommendedPosts = getRecommendedPostsForSlug('adt-timer', 'en');

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    applyAdtTimerSeo(meta, document, 'en');
  }
}
