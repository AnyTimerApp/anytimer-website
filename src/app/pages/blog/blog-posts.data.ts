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

// Finer-grained classification used only within the Drankspelletjes category (the
// "Categorie" stat shown on each single-game post's info card). Stored here — not
// hardcoded per-post — so a future filter (by game type, e.g. only Kaartspel) can read
// it the same way BLOG_CATEGORIES/CATEGORY_DISPLAY_ORDER already drive the top-level
// category filtering.
export const DRANKSPEL_SUBCATEGORIES = ['Kaartspel', 'Dobbelspel', 'Behendigheid', 'Overig'] as const;

export type DrankspelSubCategory = typeof DRANKSPEL_SUBCATEGORIES[number];

export interface BlogPost {
  slug: string;
  // The exact route path as registered in app.routes.ts (no leading/trailing slash).
  // Not derived from slug/category — most existing posts intentionally keep their
  // legacy flat path (e.g. 'huisavondideeen'), only posts published under the newer
  // convention use the nested 'blog/<category-slug>/<slug>' scheme.
  path: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  variant?: 'light' | 'blue' | 'dark' | 'accent';
  // Only set for Drankspelletjes posts — the game-type stat shown on the info card.
  subCategory?: DrankspelSubCategory;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'wat-is-een-anytimer',
    path: 'wat-is-een-anytimer',
    category: 'Begrippen',
    title: 'Wat is een anytimer?',
    excerpt: 'Een anytimer is een tegoed tussen vrienden. Je verdient hem na een verloren weddenschap, een domme actie of een challenge. Je kan hem inzetten wanneer je maar wilt.',
    date: '2026-03-27',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'Wat is een anytimer uitleg',
    variant: 'light'
  },
  {
    slug: 'drankspellen',
    path: 'drankspellen',
    category: 'Inspiratie',
    title: 'Top 10 leukste drankspellen voor een gezellige avond',
    excerpt: 'Van Mario Barf tot Kingsen en Mexen. Onze top 10 drankspellen voor een gezellige avond met vrienden. Met alle regels en tips.',
    date: '2026-04-10',
    image: 'assets/blogs/drankspellen/mario barf.webp',
    imageAlt: 'Mario Barf drankspel',
    variant: 'blue'
  },
  {
    slug: 'wat-is-een-adtje',
    path: 'wat-is-een-adtje',
    category: 'Begrippen',
    title: 'Wat is een adtje?',
    excerpt: 'Een adtje betekent dat je een drankje in één keer leegdrinkt. Leer tips voor atten, het verschil met een shotgun en wat een rietbak is.',
    date: '2026-04-12',
    image: 'assets/blogs/wat is een adtje/wat is een adtje.webp',
    imageAlt: 'Wat is een adtje',
    variant: 'light'
  },
  {
    slug: 'wat-is-de-beste-adt-timer',
    path: 'wat-is-de-beste-adt-timer',
    category: 'Inspiratie',
    title: 'Wat is de beste adt timer?',
    excerpt: 'Welke adt timer moet je kiezen. App timer, stopwatch, AdtMeister of Rubiks cube timer. Vergelijking en tips voor eerlijke atten.',
    date: '2026-04-17',
    image: 'assets/blogs/beste timer/Any-timer in de club.webp',
    imageAlt: 'Any-timer in de club',
    variant: 'light'
  },
  {
    slug: 'mag-je-een-anytimer-weigeren',
    path: 'mag-je-een-anytimer-weigeren',
    category: 'Weetjes',
    title: 'Mag je een anytimer weigeren?',
    excerpt: 'Mag je een anytimer weigeren? Lees de regels en gevolgen. Wanneer mag je nee zeggen en wat zijn de straffen.',
    date: '2026-04-21',
    image: 'assets/blogs/anytimer weigeren/maatje adt een biertje cartoon.webp',
    imageAlt: 'Anytimer weigeren cartoon',
    variant: 'light'
  },
  {
    slug: 'anytimers-bijhouden-whatsapp-notities',
    path: 'anytimers-bijhouden-whatsapp-notities',
    category: 'Weetjes',
    title: 'Waarom je anytimers niet in WhatsApp of notities moet bijhouden',
    excerpt: 'WhatsApp en notities lijken handig, maar je mist het belangrijkste: versiebeheer. Lees waarom dit voor discussie zorgt en hoe je anytimers beter bijhoudt.',
    date: '2026-05-21',
    image: 'assets/blogs/whatsapp en notities/Whatsapp phones.webp',
    imageAlt: 'Anytimers bijhouden in WhatsApp werkt niet door gebrek aan versiebeheer',
    variant: 'light'
  },
  {
    slug: 'huisavondideeen',
    path: 'huisavondideeen',
    category: 'Inspiratie',
    title: 'Top 10 leuke huisavondideeën',
    excerpt: 'Van de Zwarte Piste tot een kerstdiner midden in juli. Onze top 10 leuke huisavondideeën voor als je met je huisgenoten thuis blijft.',
    date: '2026-07-21',
    image: 'assets/blogs/huisavond/Huisavond cover.webp',
    imageAlt: 'Top 10 huisavondideeën',
    variant: 'light'
  },
  {
    slug: 'jeu-de-bier',
    path: 'blog/drankspelletjes/jeu-de-bier',
    category: 'Drankspelletjes',
    subCategory: 'Behendigheid',
    title: 'Jeu de bier',
    excerpt: 'Jeu de bier is jeu de boules voor aan tafel met bierdopjes. Simpel behendigheidsspel, perfect voor het begin van de avond.',
    date: '2026-07-22',
    image: 'assets/blogs/drankspel/jeu de bier.webp',
    imageAlt: 'Jeu de bier drankspel met bierdopjes',
    variant: 'light'
  },
  {
    slug: 'mario-barf',
    path: 'blog/drankspelletjes/mario-barf',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Mario Barf',
    excerpt: 'Mario Barf is Mario Kart met een drankje naast je controller. Je moet je drankje op hebben voor je over de finish komt.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/mario barf.webp',
    imageAlt: 'Mario Barf drankspel met Mario Kart en drankjes naast de controller',
    variant: 'light'
  },
  {
    slug: 'trek-je-bak-mania',
    path: 'blog/drankspelletjes/trek-je-bak-mania',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Trek je Bak Mania',
    excerpt: 'Trek je Bak Mania is Trackmania met een simpele straf. De slechtste coureur van de ronde trekt een bak.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspellen/trek je bak mania.webp',
    imageAlt: 'Trek je Bak Mania drankspel met Trackmania in hotseat mode',
    variant: 'light'
  },
  {
    slug: '30-seconds',
    path: 'blog/drankspelletjes/30-seconds',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: '30 Seconds',
    excerpt: 'Raad binnen 30 seconden zoveel mogelijk woorden. Als drankspel wordt elke mislukte ronde een kleine straf voor je team.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/30 seconds.webp',
    imageAlt: '30 Seconds drankspel met het bordspel en een timer',
    variant: 'light'
  },
  {
    slug: 'kingsen',
    path: 'blog/drankspelletjes/kingsen',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Kingsen',
    excerpt: 'Kingsen is een kaartspel waarbij elke kaart een opdracht geeft. Probeer niet degene te zijn die de laatste koning pakt.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/kingsen.webp',
    imageAlt: 'Kingsen drankspel met kaarten in een cirkel rond een shotglas',
    variant: 'light'
  },
  {
    slug: 'stress-pong',
    path: 'blog/drankspelletjes/stress-pong',
    category: 'Drankspelletjes',
    subCategory: 'Behendigheid',
    title: 'Stress Pong',
    excerpt: 'Stress Pong is een snelle variant op pong waarbij twee bekers tegelijk rondgaan. Wordt je ingehaald? Dan moet je drinken.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/stress pong.webp',
    imageAlt: 'Stress Pong drankspel met bekers en pingpongballen',
    variant: 'light'
  },
  {
    slug: 'fuck-the-dealer',
    path: 'blog/drankspelletjes/fuck-the-dealer',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Fuck the Dealer',
    excerpt: 'Fuck the Dealer is een kaartspel waarin iedereen de dealer probeert te pakken door de waarde van kaarten te raden.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/fuck the dealer.webp',
    imageAlt: 'Fuck the Dealer kaartspel als drankspel',
    variant: 'light'
  },
  {
    slug: 'mexen',
    path: 'blog/drankspelletjes/mexen',
    category: 'Drankspelletjes',
    subCategory: 'Dobbelspel',
    title: 'Mexen',
    excerpt: 'Mexen is een dobbelspel met twee stenen. Voorkom de laagste worp van de ronde en let op voor de Mex.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/mexen.webp',
    imageAlt: 'Mexen dobbelspel als drankspel',
    variant: 'light'
  },
  {
    slug: 'bakplaten',
    path: 'blog/drankspelletjes/bakplaten',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Bakplaten',
    excerpt: 'Bakplaten is een heel simpel kaartspel. Trek een plaatje en jij bent aan de beurt om te drinken.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/bakplaten.webp',
    imageAlt: 'Bakplaten kaartspel als simpel drankspel',
    variant: 'light'
  },
  {
    slug: 'de-paardenrace',
    path: 'blog/drankspelletjes/de-paardenrace',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'De Paardenrace',
    excerpt: 'De Paardenrace is een kaartspel waarin de vier azen tegen elkaar racen. Zet slokken in en hoop dat jouw paard wint.',
    date: '2026-07-24',
    image: 'assets/blogs/drankspellen/paardenrace.webp',
    imageAlt: 'De Paardenrace drankspel met azen als paarden',
    variant: 'light'
  },
  {
    slug: 'ring-of-fire',
    path: 'blog/drankspelletjes/ring-of-fire',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Ring of fire',
    excerpt: 'Ring of fire is de internationale variant van Kingsen. Trek een kaart uit de ring en voer meteen de bijpassende opdracht uit.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/ring of fire.webp',
    imageAlt: 'Ring of fire drankspel met kaarten in een ring rond een glas',
    variant: 'light'
  },
  {
    slug: 'mijnenveld',
    path: 'blog/drankspelletjes/mijnenveld',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Mijnenveld',
    excerpt: 'Mijnenveld is een kaartspel waarin je een route door kaarten kiest. Stap je op een plaatje of aas, dan begin je opnieuw.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/mijnenveld.webp',
    imageAlt: 'Mijnenveld kaartspel met kaarten in een ruitvormig veld',
    variant: 'light'
  },
  {
    slug: 'stef-stuntpiloot',
    path: 'blog/drankspelletjes/stef-stuntpiloot',
    category: 'Drankspelletjes',
    subCategory: 'Behendigheid',
    title: 'Stef stuntpiloot',
    excerpt: 'Stef stuntpiloot is een behendigheidsspel met een vliegtuigje. Verdedig je kippen en stuur Stef naar de kippen van de rest.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/stef stuntpiloot.webp',
    imageAlt: 'Stef Stuntpiloot drankspel met het vliegtuigje dat rondjes vliegt boven de kippenhokken',
    variant: 'light'
  },
  {
    slug: 'vingeren',
    path: 'blog/drankspelletjes/vingeren',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Vingeren',
    excerpt: 'Vingeren is een snel raadspel met vingers op een glas. Raad hoeveel vingers blijven liggen en kom zo uit het spel.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/vingeren.webp',
    imageAlt: 'Vingeren drankspel met vingers op de rand van een glas',
    variant: 'light'
  },
  {
    slug: 'vikingen',
    path: 'blog/drankspelletjes/vikingen',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Vikingen',
    excerpt: 'Vikingen is een spel waarbij iedereen tegelijk moet opletten. Eén speler is Viking, de buren roeien en de rest maakt de zee.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/vikingen.webp',
    imageAlt: 'Vikingen drankspel met een speler als Viking en twee spelers die roeien',
    variant: 'light'
  },
  {
    slug: 'zeeslag',
    path: 'blog/drankspelletjes/zeeslag',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Zeeslag',
    excerpt: 'Zeeslag is het bekende bordspel met een drankregel erbij. Raak je een schip van de ander, dan moet die persoon drinken.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/zeeslag.webp',
    imageAlt: 'Zeeslag drankspel met het Zeeslag bord en pionnen',
    variant: 'light'
  },
  {
    slug: 'kusje-geven',
    path: 'blog/drankspelletjes/kusje-geven',
    category: 'Drankspelletjes',
    subCategory: 'Behendigheid',
    title: 'Kusje geven',
    excerpt: 'Kusje geven is een behendigheidsspel met een speelkaart. Geef de kaart door met je mond en laat hem vooral niet vallen.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/kusje geven.webp',
    imageAlt: 'Kusje geven drankspel met een speelkaart die van mond tot mond gaat',
    variant: 'light'
  },
  {
    slug: 'bussen',
    path: 'blog/drankspelletjes/bussen',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Bussen',
    excerpt: 'Bussen is een kaartspel met meerdere rondes. Eerst verzamel je kaarten, daarna beslist de piramide wie de bus in moet.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/bussen.webp',
    imageAlt: 'Bussen kaartspel met de piramide en de kaarten voor de bus',
    variant: 'light'
  },
  {
    slug: 'hoger-lager',
    path: 'blog/drankspelletjes/hoger-lager',
    category: 'Drankspelletjes',
    subCategory: 'Kaartspel',
    title: 'Hoger lager',
    excerpt: 'Hoger lager is een simpel kaartspel waarin je steeds moet gokken. Komt de volgende kaart hoger of lager uit?',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/hoger lager.webp',
    imageAlt: 'Hoger lager kaartspel met een rij opengedraaide kaarten',
    variant: 'light'
  },
  {
    slug: 'krokodillenspel',
    path: 'blog/drankspelletjes/krokodillenspel',
    category: 'Drankspelletjes',
    subCategory: 'Overig',
    title: 'Krokodillenspel',
    excerpt: 'Krokodillenspel is Krokodil met Kiespijn als drankspel. Iedereen drukt om de beurt een tand in en hoopt dat de bek open blijft.',
    date: '2026-07-28',
    image: 'assets/blogs/drankspel/krokodil.webp',
    imageAlt: 'Krokodillenspel met het spel Krokodil met Kiespijn en shotglazen',
    variant: 'light'
  }
];

// Fixed "always recommended" picks for every single-game Drankspelletjes post.
// On the (rare) page that IS one of these three, that slot is swapped for the
// fallback so a post never recommends itself.
const RECOMMENDED_SLUGS = ['de-paardenrace', 'mario-barf', 'ring-of-fire'];
const RECOMMENDED_FALLBACK_SLUG = 'bussen';

export function getRecommendedGames(post: BlogPost): BlogPost[] {
  return RECOMMENDED_SLUGS
    .map(slug => slug === post.slug ? RECOMMENDED_FALLBACK_SLUG : slug)
    .map(slug => BLOG_POSTS.find(p => p.slug === slug)!);
}

// 3 other single-game posts for the "Vergelijkbare drankspellen" block: same
// subCategory first (newest first), topped up from other subcategories if
// fewer than 3 exist. Excludes the post itself and whatever already appears
// in getRecommendedGames() for this post, so nothing shows up twice on a page.
export function getSimilarGames(post: BlogPost): BlogPost[] {
  const exclude = new Set([post.slug, ...getRecommendedGames(post).map(p => p.slug)]);
  const pool = BLOG_POSTS.filter(p => p.category === 'Drankspelletjes' && !exclude.has(p.slug));
  const byDateDesc = (a: BlogPost, b: BlogPost) => b.date.localeCompare(a.date);
  const sameSubCategory = pool.filter(p => p.subCategory === post.subCategory).sort(byDateDesc);
  const otherSubCategory = pool.filter(p => p.subCategory !== post.subCategory).sort(byDateDesc);
  return [...sameSubCategory, ...otherSubCategory].slice(0, 3);
}
