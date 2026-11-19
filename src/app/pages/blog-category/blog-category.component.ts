import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { BlogCategory, BlogPost, DRANKSPEL_SUBCATEGORIES, DrankspelSubCategory, firstLetterOf, postsFor } from '../blog/blog-posts.data';
import { Lang } from '../../i18n/lang';
import { UI, UiStrings } from '../../i18n/ui';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';
import { AboutComponent, FaqItem } from '../home/about/about.component';

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
    title: 'Drankspelletjes: alle drankspellen met spelregels op een rij',
    description: 'Alle drankspelletjes met spelregels op een rij. Kaartspellen als Kingsen en Bussen, dobbelspellen als Mexen en meer. Per spel wat je nodig hebt en tips.',
    heading: 'Alle drankspelletjes met spelregels',
    intro: 'Op zoek naar leuke drankspelletjes voor een avond met vrienden? Hier vind je al onze drankspellen met kaarten, dobbelstenen en meer. Niet elk drankspel dat bestaat. Alleen de leuke. Bij elk spel vind je de regels, benodigdheden en tips.'
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
    heading: 'All drinking games and their rules',
    intro: 'Looking for fun drinking games for a night with friends? These are our favourites. You won\'t find every drinking game in the world here. Just the fun ones. For every game you get the rules, what you need and some tips.'
  }
};

// FAQ under the Drankspelletjes hub, in the FAQ block of the home page.
// Questions come from "People also ask" in Google and from Keyword Planner
// (analysis 2026-11-17, seo-reports/data/2026-11-17/hub/). Most asked first.
const DRANKSPEL_FAQ: Record<Lang, { title: string; items: FaqItem[] }> = {
  nl: {
    title: 'Alles over drankspelletjes',
    items: [
      {
        question: 'Wat zijn de leukste drankspelletjes?',
        answer: '[Kingsen](/blog/drankspelletjes/kingsen), [Bussen](/blog/drankspelletjes/bussen), [Mexen](/blog/drankspelletjes/mexen) en [De Paardenrace](/blog/drankspelletjes/de-paardenrace) zijn de klassiekers die bijna elke student kent. Je hebt er alleen kaarten of dobbelstenen voor nodig. Zin in iets anders? Probeer dan [Mario Barf](/blog/drankspelletjes/mario-barf) of [Stress Pong](/blog/drankspelletjes/stress-pong). Onze persoonlijke favorieten vind je in [de top 10 leukste drankspellen](/drankspellen).'
      },
      {
        question: 'Welke drankspelletjes speel je met kaarten?',
        answer: 'De meeste drankspelletjes speel je met een gewoon pak kaarten. [Kingsen](/blog/drankspelletjes/kingsen) is het bekendste. Je legt de kaarten in een cirkel rond een glas en elke kaart is een opdracht. [Bussen](/blog/drankspelletjes/bussen), [Fuck the Dealer](/blog/drankspelletjes/fuck-the-dealer), [Hoger lager](/blog/drankspelletjes/hoger-lager) en [Mijnenveld](/blog/drankspelletjes/mijnenveld) zijn ook kaartspellen.',
        link: '/blog/inspiratie/drankspellen-met-kaarten',
        linkText: 'Bekijk alle drankspellen met kaarten'
      },
      {
        question: 'Welke drankspelletjes speel je zonder kaarten of materiaal?',
        answer: 'Voor [Vikingen](/blog/drankspelletjes/vikingen) heb je helemaal niks nodig, alleen een groep die oplet. [Vingeren](/blog/drankspelletjes/vingeren) speel je met één glas. En met een telefoon speel je [Finger roulette](/blog/drankspelletjes/finger-roulette), [Boze bak](/blog/drankspelletjes/boze-bak) of [Imposter](/blog/drankspelletjes/imposter). Voor [Never have I ever](/blog/drankspelletjes/never-have-i-ever) heb je alleen een drankje en een goede vraag nodig.',
        link: '/blog/inspiratie/drankspellen-zonder-kaarten',
        linkText: 'Bekijk alle drankspellen zonder kaarten'
      },
      {
        question: 'Wat zijn leuke drankspelletjes voor 2 personen?',
        answer: 'Ook met z\'n tweeën speel je prima een drankspel. [Hoger lager](/blog/drankspelletjes/hoger-lager), [Zeeslag](/blog/drankspelletjes/zeeslag) en [Jeu de bier](/blog/drankspelletjes/jeu-de-bier) werken goed met twee spelers. Ook [Mexen](/blog/drankspelletjes/mexen) en [De Paardenrace](/blog/drankspelletjes/de-paardenrace) speel je prima met twee spelers. En [Shut the box](/blog/drankspelletjes/shut-the-box) kun je zelfs alleen spelen.',
        link: '/blog/inspiratie/drankspellen-voor-2-personen',
        linkText: 'Bekijk alle drankspellen voor 2 personen'
      },
      {
        question: 'Wat zijn leuke drankspellen voor een grote groep?',
        answer: 'Kies een spel waarbij iedereen tegelijk meedoet. [Kingsen](/blog/drankspelletjes/kingsen) en [De Paardenrace](/blog/drankspelletjes/de-paardenrace) speel je met maximaal 12 man. [Vikingen](/blog/drankspelletjes/vikingen) zelfs met 16, en dan moet de hele groep tegelijk opletten. En bij [Bussen](/blog/drankspelletjes/bussen) gaat aan het eind één iemand de bus in. Is het mooi weer? Speel dan [Flunkyball](/blog/drankspelletjes/flunkyball) buiten, met twee teams van maximaal 8. Binnen werkt [Imposter](/blog/drankspelletjes/imposter) met maximaal 16 spelers.',
        link: '/blog/drankspelletjes/de-paardenrace',
        linkText: 'Bekijk de regels van De Paardenrace'
      },
      {
        question: 'Welke drankspelletjes speel je met dobbelstenen?',
        answer: '[Mexen](/blog/drankspelletjes/mexen) is het bekendste dobbelspel. Je gooit met twee stenen onder een beker en probeert niet de laagste worp van de ronde te hebben. Bij [Shut the box](/blog/drankspelletjes/shut-the-box) klap je cijfers dicht die samen je worp vormen. Rond Sinterklaas is het [Sinterklaas dobbelspel](/blog/inspiratie/sinterklaas-dobbelspel) populair. Daarbij hoort bij elk getal een opdracht.',
        link: '/blog/inspiratie/sinterklaas-dobbelspel',
        linkText: 'Bekijk het Sinterklaas dobbelspel'
      },
      {
        question: 'Wat zijn makkelijke drankspelletjes?',
        answer: '[Bakplaten](/blog/drankspelletjes/bakplaten) is het simpelste kaartspel dat er is. Trek je een plaatje, dan drink je. [Hoger lager](/blog/drankspelletjes/hoger-lager) en [Jeu de bier](/blog/drankspelletjes/jeu-de-bier) leg je ook in één minuut uit. Fijn voor het begin van de avond, of als niet iedereen de regels kent.',
        link: '/blog/drankspelletjes/bakplaten',
        linkText: 'Bekijk de regels van Bakplaten'
      },
      {
        question: 'Wat zijn leuke opdrachten voor een drankspel?',
        answer: 'Bij [Kingsen](/blog/drankspelletjes/kingsen) en [Ring of fire](/blog/drankspelletjes/ring-of-fire) hoort bij elke kaart een opdracht. Denk aan een regel verzinnen, een drinking buddy kiezen of om de beurt iets uit een categorie noemen. Bij [Jenga drankspel](/blog/drankspelletjes/jenga) schrijf je de opdrachten op de blokjes.',
        link: '/blog/drankspelletjes/kingsen',
        linkText: 'Bekijk de opdrachten van Kingsen'
      },
      {
        question: 'Wat is een grappig drankspel?',
        answer: 'Bij [Kusje geven](/blog/drankspelletjes/kusje-geven) geef je een speelkaart door met je mond, en die mag niet vallen. Bij [Vikingen](/blog/drankspelletjes/vikingen) zit iedereen te roeien en golven te maken. En bij [Krokodillenspel](/blog/drankspelletjes/krokodillenspel) wacht je tot de bek dichtklapt. Gelach gegarandeerd.',
        link: '/blog/drankspelletjes/kusje-geven',
        linkText: 'Bekijk de regels van Kusje geven'
      },
      {
        question: 'Zijn er drankspelletjes voor je telefoon?',
        answer: 'Ja. [Boze bak](/blog/drankspelletjes/boze-bak) en [Finger roulette](/blog/drankspelletjes/finger-roulette) speel je op je telefoon. Bij Boze bak druk je op blije bakken en hoop je dat de boze bak niet verschijnt. Bij Finger roulette kiest de telefoon wie er drinkt. Bij [Bakmachine](/blog/drankspelletjes/bakmachine) draai je aan een gokkast voor bakken. Bij [Imposter](/blog/drankspelletjes/imposter) krijgt iedereen een geheim woord, behalve de bluffer. Ook [Zeeslag](/blog/drankspelletjes/zeeslag), het [Krokodillenspel](/blog/drankspelletjes/krokodillenspel), [Mexen](/blog/drankspelletjes/mexen) en [Bakplaten](/blog/drankspelletjes/bakplaten) kun je op je telefoon spelen, zonder dobbelstenen of kaarten. En met een [adt timer](/adt-timer) meet je wie zijn bier het snelst op heeft.',
        link: '/blog/drankspelletjes/boze-bak',
        linkText: 'Bekijk de regels van Boze bak'
      }
    ]
  },
  en: {
    title: 'Everything about drinking games',
    items: [
      {
        question: 'What are the best drinking games?',
        answer: '[Ring of Fire](/en/blog/drinking-games/ring-of-fire), [Ride the Bus](/en/blog/drinking-games/ride-the-bus), [Mexico](/en/blog/drinking-games/mexico) and [Horse Race](/en/blog/drinking-games/horse-race) are the classics most students know. All you need is a deck of cards or some dice. Fancy something different? Try [Beerio Kart](/en/blog/drinking-games/beerio-kart) or [Rage Cage](/en/blog/drinking-games/rage-cage). Our personal favourites are in [the top 10 best drinking games](/en/blog/inspiration/best-drinking-games).'
      },
      {
        question: 'Which drinking games can you play with cards?',
        answer: 'Most drinking games only need a normal deck of cards. [Ring of Fire](/en/blog/drinking-games/ring-of-fire) is the best known. You put the cards in a circle around a glass and every card is a task. [Ride the Bus](/en/blog/drinking-games/ride-the-bus), [Fuck the Dealer](/en/blog/drinking-games/fuck-the-dealer), [Higher or Lower](/en/blog/drinking-games/higher-or-lower) and [Mijnenveld](/en/blog/drinking-games/mijnenveld) are card games too.',
        link: '/en/blog/inspiration/card-drinking-games',
        linkText: 'See all card drinking games'
      },
      {
        question: 'Which drinking games can you play without cards or anything else?',
        answer: 'For [Vikings](/en/blog/drinking-games/vikings) you need nothing at all, just a group that pays attention. [Fingers](/en/blog/drinking-games/fingers) only needs one glass. And with a phone you can play [Finger Roulette](/en/blog/drinking-games/finger-roulette), [Angry Mug](/en/blog/drinking-games/angry-mug) or [Imposter](/en/blog/drinking-games/imposter). For [Never have I ever](/en/blog/drinking-games/never-have-i-ever) you only need a drink and a good question.',
        link: '/en/blog/inspiration/drinking-games-without-cards',
        linkText: 'See all drinking games without cards'
      },
      {
        question: 'What are good drinking games for two people?',
        answer: 'You can easily play a drinking game with just the two of you. [Higher or Lower](/en/blog/drinking-games/higher-or-lower), [Battleship](/en/blog/drinking-games/battleship) and [Jeu de bier](/en/blog/drinking-games/jeu-de-bier) work well with two players. [Mexico](/en/blog/drinking-games/mexico) and [Horse Race](/en/blog/drinking-games/horse-race) are fine with two as well. And you can even play [Shut the Box](/en/blog/drinking-games/shut-the-box) on your own.',
        link: '/en/blog/inspiration/drinking-games-for-two',
        linkText: 'See all drinking games for two'
      },
      {
        question: 'What are good drinking games for a big group?',
        answer: 'Pick a game where everyone plays at the same time. [Kingsen](/en/blog/drinking-games/kingsen) and [Horse Race](/en/blog/drinking-games/horse-race) work with up to 12 players. [Vikings](/en/blog/drinking-games/vikings) even with 16, and then the whole group has to pay attention at once. And in [Ride the Bus](/en/blog/drinking-games/ride-the-bus) one person ends up on the bus. Nice weather? Then play [Flunkyball](/en/blog/drinking-games/flunkyball) outside, with two teams of up to 8. Indoors [Imposter](/en/blog/drinking-games/imposter) works with up to 16 players.',
        link: '/en/blog/drinking-games/horse-race',
        linkText: 'See the rules of Horse Race'
      },
      {
        question: 'Which drinking games can you play with dice?',
        answer: '[Mexico](/en/blog/drinking-games/mexico) is the best known dice game. You roll two dice under a cup and try not to have the lowest roll of the round. In [Shut the Box](/en/blog/drinking-games/shut-the-box) you flip down numbers that add up to your roll. Around Sinterklaas the [Sinterklaas dice game](/en/blog/inspiration/sinterklaas-dice-game) is popular. Every number comes with a task.',
        link: '/en/blog/inspiration/sinterklaas-dice-game',
        linkText: 'See the Sinterklaas dice game'
      },
      {
        question: 'What are easy drinking games?',
        answer: '[Bakplaten](/en/blog/drinking-games/bakplaten) is the simplest card game there is. Draw a face card and you drink. [Higher or Lower](/en/blog/drinking-games/higher-or-lower) and [Jeu de bier](/en/blog/drinking-games/jeu-de-bier) take a minute to explain too. Great for the start of the night, or when not everyone knows the rules.',
        link: '/en/blog/drinking-games/bakplaten',
        linkText: 'See the rules of Bakplaten'
      },
      {
        question: 'What are good tasks for a drinking game?',
        answer: 'In [Kingsen](/en/blog/drinking-games/kingsen) and [Ring of Fire](/en/blog/drinking-games/ring-of-fire) every card comes with a task. Think of making up a rule, picking a drinking buddy or taking turns naming something from a category. In [Drunk Jenga](/en/blog/drinking-games/drunk-jenga) you write the tasks on the blocks.',
        link: '/en/blog/drinking-games/ring-of-fire',
        linkText: 'See the tasks of Ring of Fire'
      },
      {
        question: 'What is a funny drinking game?',
        answer: 'In [Suck and Blow](/en/blog/drinking-games/suck-and-blow) you pass a playing card around with your mouth, and it must not fall. In [Vikings](/en/blog/drinking-games/vikings) everyone is rowing and making waves. And in [Crocodile Dentist](/en/blog/drinking-games/crocodile-dentist) you wait for the jaws to snap shut. Laughs guaranteed.',
        link: '/en/blog/drinking-games/suck-and-blow',
        linkText: 'See the rules of Suck and Blow'
      },
      {
        question: 'Are there drinking games for your phone?',
        answer: 'Yes. [Angry Mug](/en/blog/drinking-games/angry-mug) and [Finger Roulette](/en/blog/drinking-games/finger-roulette) are played on your phone. In Angry Mug you tap the happy mugs and hope the angry mug does not show up. In Finger Roulette the phone picks who drinks. In [Chug Machine](/en/blog/drinking-games/chug-machine) you spin a slot machine for chugs. In [Imposter](/en/blog/drinking-games/imposter) everyone gets a secret word, except the bluffer. You can also play [Battleship](/en/blog/drinking-games/battleship), [Crocodile Dentist](/en/blog/drinking-games/crocodile-dentist), [Mexico](/en/blog/drinking-games/mexico) and [Bakplaten](/en/blog/drinking-games/bakplaten) on your phone, without dice or cards. And with a [chug timer](/en/chug-timer) you find out who finishes their beer the fastest.',
        link: '/en/blog/drinking-games/angry-mug',
        linkText: 'See the rules of Angry Mug'
      }
    ]
  }
};

@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbsComponent, AboutComponent],
  templateUrl: './blog-category.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', '../blog/blog-shared.component.scss', './letter-nav.component.scss']
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
  // Only set for the Drankspelletjes category.
  faqs: FaqItem[] | null = null;
  faqTitle = '';

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
    // Picked from the stuck bar: jump back to the top of the list, otherwise
    // the shorter list leaves you scrolled past it.
    const nav = this.letterNav?.nativeElement;
    const list = nav?.parentElement;
    if (this.letterNavStuck && nav && list) {
      const top = list.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(nav).top);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // True once the letter bar sticks under the navbar. Only then does it get
  // its white background, border and shadow (same as on never have I ever).
  letterNavStuck = false;
  @ViewChild('letterNav') private letterNav?: ElementRef<HTMLElement>;
  private stuckFrame = 0;

  @HostListener('window:scroll')
  onScroll() {
    if (this.stuckFrame) return;
    this.stuckFrame = requestAnimationFrame(() => {
      this.stuckFrame = 0;
      const nav = this.letterNav?.nativeElement;
      if (!nav) return;
      this.letterNavStuck = nav.getBoundingClientRect().top <= parseFloat(getComputedStyle(nav).top) + 1;
    });
  }

  constructor(meta: Meta, route: ActivatedRoute, @Inject(DOCUMENT) document: Document) {
    this.category = route.snapshot.data['category'] as BlogCategory;
    this.lang = (route.snapshot.data['lang'] as Lang) ?? 'nl';
    this.ui = UI[this.lang];
    this.meta = (this.lang === 'en' ? CATEGORY_META_EN : CATEGORY_META_NL)[this.category];
    this.posts = postsFor(this.lang).filter(p => p.category === this.category);
    this.subCategories = this.category === 'Drankspelletjes' ? DRANKSPEL_SUBCATEGORIES : null;
    if (this.category === 'Drankspelletjes') {
      this.faqs = DRANKSPEL_FAQ[this.lang].items;
      this.faqTitle = DRANKSPEL_FAQ[this.lang].title;
    }
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
