export const BLOG_CATEGORIES = ['Begrippen', 'Inspiratie', 'Weetjes', 'Drankspelletjes'] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export const CATEGORY_SLUGS: Record<BlogCategory, string> = {
  Begrippen: 'begrippen',
  Inspiratie: 'inspiratie',
  Weetjes: 'weetjes',
  Drankspelletjes: 'drankspelletjes'
};

// Display order used everywhere categories are listed (blog category cards, nav dropdown).
// Independent of BLOG_CATEGORIES' declaration order above.
export const CATEGORY_DISPLAY_ORDER: BlogCategory[] = ['Drankspelletjes', 'Inspiratie', 'Begrippen', 'Weetjes'];

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  variant?: 'light' | 'blue' | 'dark' | 'accent';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'wat-is-een-anytimer',
    category: 'Begrippen',
    title: 'Wat is een anytimer?',
    excerpt: 'Een anytimer is een tegoed tussen vrienden. Je verdient hem na een verloren weddenschap, een domme actie of een challenge. Je kan hem inzetten wanneer je maar wilt.',
    date: '2026-03-27',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.png',
    imageAlt: 'Wat is een anytimer uitleg',
    variant: 'light'
  },
  {
    slug: 'drankspellen',
    category: 'Inspiratie',
    title: 'Top 10 leukste drankspellen voor een gezellige avond',
    excerpt: 'Van Mario Barf tot Kingsen en Mexen. Onze top 10 drankspellen voor een gezellige avond met vrienden. Met alle regels en tips.',
    date: '2026-04-10',
    image: 'assets/blogs/drankspellen/mario barf.png',
    imageAlt: 'Mario Barf drankspel',
    variant: 'blue'
  },
  {
    slug: 'wat-is-een-adtje',
    category: 'Begrippen',
    title: 'Wat is een adtje?',
    excerpt: 'Een adtje betekent dat je een drankje in één keer leegdrinkt. Leer tips voor atten, het verschil met een shotgun en wat een rietbak is.',
    date: '2026-04-12',
    image: 'assets/blogs/wat is een adtje/wat is een adtje.png',
    imageAlt: 'Wat is een adtje',
    variant: 'light'
  },
  {
    slug: 'wat-is-de-beste-adt-timer',
    category: 'Inspiratie',
    title: 'Wat is de beste adt timer?',
    excerpt: 'Welke adt timer moet je kiezen. App timer, stopwatch, AdtMeister of Rubiks cube timer. Vergelijking en tips voor eerlijke atten.',
    date: '2026-04-17',
    image: 'assets/blogs/beste timer/Any-timer in de club.png',
    imageAlt: 'Any-timer in de club',
    variant: 'light'
  },
  {
    slug: 'mag-je-een-anytimer-weigeren',
    category: 'Weetjes',
    title: 'Mag je een anytimer weigeren?',
    excerpt: 'Mag je een anytimer weigeren? Lees de regels en gevolgen. Wanneer mag je nee zeggen en wat zijn de straffen.',
    date: '2026-04-21',
    image: 'assets/blogs/anytimer weigeren/maatje adt een biertje cartoon.png',
    imageAlt: 'Anytimer weigeren cartoon',
    variant: 'light'
  },
  {
    slug: 'anytimers-bijhouden-whatsapp-notities',
    category: 'Weetjes',
    title: 'Waarom je anytimers niet in WhatsApp of notities moet bijhouden',
    excerpt: 'WhatsApp en notities lijken handig, maar je mist het belangrijkste: versiebeheer. Lees waarom dit voor discussie zorgt en hoe je anytimers beter bijhoudt.',
    date: '2026-05-21',
    image: 'assets/blogs/whatsapp en notities/Whatsapp phones.png',
    imageAlt: 'Anytimers bijhouden in WhatsApp werkt niet door gebrek aan versiebeheer',
    variant: 'light'
  },
  {
    slug: 'huisavondideeen',
    category: 'Inspiratie',
    title: 'Top 10 leuke huisavondideeën',
    excerpt: 'Van de Zwarte Piste tot een kerstdiner midden in juli. Onze top 10 leuke huisavondideeën voor als je met je huisgenoten thuis blijft.',
    date: '2026-07-21',
    image: 'assets/blogs/huisavond/Huisavond cover.png',
    imageAlt: 'Top 10 huisavondideeën',
    variant: 'light'
  },
  {
    slug: 'jeu-de-bier',
    category: 'Drankspelletjes',
    title: 'Jeu de bier',
    excerpt: 'Jeu de bier is jeu de boules voor aan tafel met bierdopjes. Simpel behendigheidsspel, perfect voor het begin van de avond.',
    date: '2026-07-22',
    image: 'assets/blogs/drankspel/jeu de bier.png',
    imageAlt: 'Jeu de bier drankspel met bierdopjes',
    variant: 'light'
  }
];
