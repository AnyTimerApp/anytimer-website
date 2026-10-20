import { Component, Inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BlogCategory, BlogPost, DRANKSPEL_SUBCATEGORIES, DrankspelSubCategory, firstLetterOf, postsFor } from '../blog/blog-posts.data';
import { Lang } from '../../i18n/lang';
import { UI, UiStrings } from '../../i18n/ui';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

type CategoryMeta = { title: string; description: string; intro: string; heading?: string };

const CATEGORY_META_NL: Record<BlogCategory, CategoryMeta> = {
  Begrippen: {
    title: 'Studentenbegrippen: alle studententaal van A tot Z uitgelegd',
    description: 'Van adten tot zeester: alle studentenbegrippen en studententaal helder uitgelegd. Meer dan 500 woorden met duidelijke definities, van A tot Z.',
    intro: 'Studententaal zit vol eigen woorden, afkortingen en tradities. Van drinktermen tot verenigingsjargon: hier vind je duidelijke uitleg bij honderden studentenbegrippen, overzichtelijk van A tot Z.'
  },
  Inspiratie: {
    title: 'Inspiratie: ideeën voor een leuke avond',
    description: 'Op zoek naar inspiratie voor een toffe avond? Ontdek drankspellen, huisavondideeën en de beste adt timer. Alles voor een gezellige avond met vrienden.',
    intro: 'Op zoek naar inspiratie voor een toffe avond met vrienden? Ontdek onze drankspellen, huisavondideeën en tips om er samen een onvergetelijke avond van te maken.'
  },
  Weetjes: {
    title: 'Weetjes: alles over anytimers en de regels',
    description: 'Handige weetjes over anytimers: mag je een anytimer weigeren, hoe houd je ze het beste bij en welke regels gelden er? Alle tips op een rij.',
    intro: 'Praktische weetjes en regels rond anytimers. Van of je een anytimer mag weigeren tot de beste manier om ze bij te houden: hier vind je de antwoorden.'
  },
  Drankspelletjes: {
    title: 'Drankspelletjes: alle spelregels op een rij',
    description: 'Ontdek onze drankspelletjes met alle spelregels, benodigdheden en tips. Van Jeu de bier tot nieuwe toevoegingen. Altijd een leuk drankspel bij de hand.',
    heading: 'De leukste drankspellen',
    intro: 'Op zoek naar leuke drankspellen voor een avond met vrienden? Dit zijn onze favorieten. Hier vind je niet elk drankspel dat bestaat. Maar alleen de leuke spellen. Bij elk spel vind je de regels, benodigdheden en tips.'
  }
};

const CATEGORY_META_EN: Record<BlogCategory, CategoryMeta> = {
  Begrippen: {
    title: 'Dutch student slang: every word explained from A to Z',
    description: 'What does feut, adten or brak mean? 500 Dutch student slang words explained in plain English, with examples. Made for internationals in the Netherlands.',
    heading: 'Dutch student slang dictionary',
    intro: 'Just moved to the Netherlands to study? Then you will hear a lot of words that no textbook explains. Here you find Dutch student slang and the English slang everyone uses, explained in plain English. Short, clear and with examples, from A to Z.'
  },
  Inspiratie: {
    title: 'Inspiration: ideas for a fun night',
    description: 'Looking for ideas for a great night? Discover drinking games, night in ideas for housemates and the best chug timer. Everything for a fun night with friends.',
    intro: 'Looking for ideas for a great night with friends? Discover our drinking games, night in ideas and tips to make it a night to remember.'
  },
  Weetjes: {
    title: 'Good to know: all about anytimers and the rules',
    description: 'Handy facts about anytimers. Can you refuse an anytimer? What is the best way to keep track of them? And which rules apply? All the answers in one place.',
    heading: 'Good to know',
    intro: 'Practical facts and rules about anytimers. From whether you can refuse one to the best way to keep track of them. You will find the answers here.'
  },
  Drankspelletjes: {
    title: 'Drinking games: all the rules in one place',
    description: 'All our favourite drinking games with the rules, what you need and tips. From Kings Cup and Ride the Bus to Dutch classics like Kingsen and Bakplaten.',
    heading: 'The best drinking games',
    intro: 'Looking for fun drinking games for a night with friends? These are our favourites. You won\'t find every drinking game in the world here. Just the fun ones. For every game you get the rules, what you need and some tips.'
  }
};

@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbsComponent],
  templateUrl: './blog-category.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', '../blog/blog-shared.component.scss']
})
export class BlogCategoryComponent {
  category: BlogCategory;
  lang: Lang;
  ui: UiStrings;
  meta: CategoryMeta;
  posts: BlogPost[];
  breadcrumbs: BreadcrumbItem[];
  // Only shown for the Drankspelletjes category — other categories have no subCategory to filter by.
  subCategories: readonly DrankspelSubCategory[] | null = null;
  activeFilter: DrankspelSubCategory | null = null;

  // Only populated for the Begrippen category — the A-Z letter filter/index.
  letters: string[] = [];
  activeLetter: string | null = null;

  get sortedPosts(): BlogPost[] {
    return [...this.posts].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.date.localeCompare(a.date));
  }

  get featuredPost(): BlogPost {
    return this.sortedPosts[0];
  }

  get otherPosts(): BlogPost[] {
    const rest = this.sortedPosts.slice(1);
    if (this.activeFilter) {
      return rest.filter(p => p.subCategory === this.activeFilter);
    }
    return rest;
  }

  labelOf(post: BlogPost): string {
    return post.subCategory ? this.ui.subCategoryLabels[post.subCategory] : this.ui.categoryLabels[post.category];
  }

  toggleFilter(sub: DrankspelSubCategory) {
    this.activeFilter = this.activeFilter === sub ? null : sub;
  }

  // Begrippen posts, alphabetical by title (not date), grouped per first
  // letter so each group can get its own big letter heading. Unlike the
  // other 3 categories, the featured post stays in this list too — e.g.
  // "Anytimer" should still be findable under A even while it's the hero.
  get begripGroups(): { letter: string; posts: BlogPost[] }[] {
    const displayTitle = (p: BlogPost) => p.shortTitle || p.title;
    const rest = this.posts
      .filter(p => !this.activeLetter || firstLetterOf(p) === this.activeLetter)
      .sort((a, b) => displayTitle(a).localeCompare(displayTitle(b), this.lang));

    const groups: { letter: string; posts: BlogPost[] }[] = [];
    for (const post of rest) {
      const letter = firstLetterOf(post);
      const current = groups[groups.length - 1];
      if (current && current.letter === letter) {
        current.posts.push(post);
      } else {
        groups.push({ letter, posts: [post] });
      }
    }
    return groups;
  }

  toggleLetter(letter: string) {
    this.activeLetter = this.activeLetter === letter ? null : letter;
  }

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    this.category = route.snapshot.data['category'] as BlogCategory;
    this.lang = (route.snapshot.data['lang'] as Lang) ?? 'nl';
    this.ui = UI[this.lang];
    this.meta = (this.lang === 'en' ? CATEGORY_META_EN : CATEGORY_META_NL)[this.category];
    this.posts = postsFor(this.lang).filter(p => p.category === this.category);
    this.subCategories = this.category === 'Drankspelletjes' ? DRANKSPEL_SUBCATEGORIES : null;
    if (this.category === 'Begrippen') {
      this.letters = [...new Set(this.posts.map(firstLetterOf))].sort((a, b) => a.localeCompare(b, this.lang));
      const requestedLetter = route.snapshot.queryParamMap.get('letter');
      if (requestedLetter && this.letters.includes(requestedLetter)) {
        this.activeLetter = requestedLetter;
      }
    }
    this.breadcrumbs = [
      { label: 'Blog', url: this.ui.paths.blog },
      { label: this.ui.categoryLabels[this.category] }
    ];

    const firstPost = this.sortedPosts[0];
    const title = this.meta.title;
    const description = this.meta.description;
    const image = `https://anytimer.app/${encodeURI(firstPost.image)}`;
    const slug = this.ui.categorySlugs[this.category];
    const url = `https://anytimer.app${this.ui.paths.blog}/${slug}/`;

    injectBreadcrumbSchema(document, `schema-breadcrumbs-${slug}`, this.breadcrumbs);

    meta.updateTag({ name: 'description', content: description });

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    // Every current blog cover image is exported at 1536x1024 — hardcoded
    // rather than stored per-post since BlogPost has no width/height field.
    meta.updateTag({ property: 'og:image:width', content: '1536' });
    meta.updateTag({ property: 'og:image:height', content: '1024' });
    meta.updateTag({ property: 'og:image:alt', content: firstPost.imageAlt });
    meta.updateTag({ property: 'og:site_name', content: 'AnyTimerApp' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    const schemaId = `schema-collection-${slug}`;
    if (!document.getElementById(schemaId)) {
      const script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': title,
        'description': description,
        'url': url,
        'inLanguage': this.lang,
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': this.sortedPosts.map((post, i) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'url': `https://anytimer.app/${post.path}/`,
            'name': post.title
          }))
        }
      });
      document.head.appendChild(script);
    }
  }
}
