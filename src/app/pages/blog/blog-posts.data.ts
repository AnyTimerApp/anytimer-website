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
  // Optional shorter display title, used only on the /blog/begrippen index (hero +
  // cards + alphabetical grouping) so a post's own page/title stays untouched.
  shortTitle?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'wat-is-een-anytimer',
    path: 'wat-is-een-anytimer',
    category: 'Begrippen',
    title: 'Wat is een anytimer?',
    shortTitle: 'Anytimer',
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
  },
  {
    slug: 'ab-actis',
    path: 'blog/begrippen/ab-actis',
    category: 'Begrippen',
    title: 'Ab actis',
    excerpt: 'Ab actis is de secretaris in het bestuur van een studentenvereniging, dispuut of commissie.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'abbo',
    path: 'blog/begrippen/abbo',
    category: 'Begrippen',
    title: 'Abbo',
    excerpt: 'Abbo is studentenslang voor abonnement, meestal op een sportschool, krant of streamingdienst.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'adten',
    path: 'blog/begrippen/adten',
    category: 'Begrippen',
    title: 'Adten',
    excerpt: 'Adten (of atten) is een drankje in één keer achterover slaan, meestal als iemand een anytimer of adtje inzet.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'adtje-des',
    path: 'blog/begrippen/adtje-des',
    category: 'Begrippen',
    title: 'Adtje des',
    excerpt: 'Een adtje des is een adtje dat je uitdeelt bij een onoplettende of misplaatste opmerking.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'adtje-herhaling',
    path: 'blog/begrippen/adtje-herhaling',
    category: 'Begrippen',
    title: 'Adtje herhaling',
    excerpt: 'Een adtje herhaling deel je uit als iemand letterlijk iets herhaalt wat al eerder is gezegd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'adtje-kratje',
    path: 'blog/begrippen/adtje-kratje',
    category: 'Begrippen',
    title: 'Adtje kratje',
    excerpt: 'Adtje kratje, ook wel kratzitten, is een drankspel waarbij je in je eentje een heel krat bier leegdrinkt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'adtje-solidair',
    path: 'blog/begrippen/adtje-solidair',
    category: 'Begrippen',
    title: 'Adtje solidair',
    excerpt: 'Een adtje solidair neem je vrijwillig mee om iemand anders te steunen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'afko',
    path: 'blog/begrippen/afko',
    category: 'Begrippen',
    title: 'Afko',
    excerpt: 'Afko is de verkorte vorm van afkorting, iets waar studenten in overvloed gebruik van maken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'afpilsen',
    path: 'blog/begrippen/afpilsen',
    category: 'Begrippen',
    title: 'Afpilsen',
    excerpt: 'Afpilsen is het allerlaatste biertje (of de laatste biertjes) van de avond.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'afstubo',
    path: 'blog/begrippen/afstubo',
    category: 'Begrippen',
    title: 'Afstubo',
    excerpt: 'Afstubo is de afkorting voor afstudeerborrel, het feestje bij het afronden van je studie.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'airfryer',
    path: 'blog/begrippen/airfryer',
    category: 'Begrippen',
    title: 'Airfryer',
    excerpt: 'Airfryer is een grapcodewoord voor een Satisfyer Pro, zodat omstanders niet doorhebben waar het gesprek echt over gaat.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'al',
    path: 'blog/begrippen/al',
    category: 'Begrippen',
    title: 'AL',
    excerpt: 'AL staat voor aspirant-lid, iemand die nog moet toetreden tot een studentenvereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'almanak',
    path: 'blog/begrippen/almanak',
    category: 'Begrippen',
    title: 'Almanak',
    excerpt: 'Een almanak is het jaarboek dat een studentenvereniging elk jaar uitgeeft over haar leden en activiteiten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'alv',
    path: 'blog/begrippen/alv',
    category: 'Begrippen',
    title: 'ALV',
    excerpt: 'Een ALV (Algemene Ledenvergadering) is de jaarlijkse vergadering waarin leden meebeslissen over hun vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ambu',
    path: 'blog/begrippen/ambu',
    category: 'Begrippen',
    title: 'Ambu',
    excerpt: 'Ambu is studentenslang voor de ambulance, meestal na een avond die uit de hand is gelopen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'amice',
    path: 'blog/begrippen/amice',
    category: 'Begrippen',
    title: 'Amice',
    excerpt: 'Amice is een ouderwetse, ceremoniële aanspreekvorm voor vriend, vaak gebruikt bij studentenverenigingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'arbeider',
    path: 'blog/begrippen/arbeider',
    category: 'Begrippen',
    title: 'Arbeider',
    excerpt: 'Arbeider is de studentikoze term voor het bestaan dat na het afstuderen wacht: fulltime werken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'assessor',
    path: 'blog/begrippen/assessor',
    category: 'Begrippen',
    title: 'Assessor',
    excerpt: 'De assessor is een bestuurslid van een studentenvereniging met een brede, ondersteunende taak.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'baco',
    path: 'blog/begrippen/baco',
    category: 'Begrippen',
    title: 'Baco',
    excerpt: 'Baco is de afkorting voor Bacardi-cola, een populaire longdrink op studentenfeestjes.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bak-trekken',
    path: 'blog/begrippen/bak-trekken',
    category: 'Begrippen',
    title: 'Bak trekken',
    excerpt: 'Bak trekken is synoniem voor adten: een drankje in één keer achterover slaan, vaak als straf.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bakken-vouwen',
    path: 'blog/begrippen/bakken-vouwen',
    category: 'Begrippen',
    title: 'Bakken vouwen',
    excerpt: 'Bakken vouwen betekent veel biertjes achter elkaar drinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bal',
    path: 'blog/begrippen/bal',
    category: 'Begrippen',
    title: 'Bal',
    excerpt: 'Een bal, of corpsbal, is de studentikoze term voor een mannelijk lid van een corporale studentenvereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'barco',
    path: 'blog/begrippen/barco',
    category: 'Begrippen',
    title: 'Barco',
    excerpt: 'Barco is de afkorting voor barcommissie, de commissie die de biertjes tapt binnen een vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'barf',
    path: 'blog/begrippen/barf',
    category: 'Begrippen',
    title: 'Barf',
    excerpt: 'Barf is studententaal voor overgeven, meestal na te veel of te snel drinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'batsen',
    path: 'blog/begrippen/batsen',
    category: 'Begrippen',
    title: 'Batsen',
    excerpt: 'Batsen is studentenslang voor seks hebben.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'berig',
    path: 'blog/begrippen/berig',
    category: 'Begrippen',
    title: 'Berig',
    excerpt: 'Berig betekent dat iemand duidelijk op zoek is naar romantisch of seksueel contact.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bestuur',
    path: 'blog/begrippen/bestuur',
    category: 'Begrippen',
    title: 'Bestuur',
    excerpt: 'Het bestuur is de groep leden die een studentenvereniging aanstuurt en de ALV organiseert.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bij',
    path: 'blog/begrippen/bij',
    category: 'Begrippen',
    title: 'Bij',
    excerpt: 'Bij (of de bij-emoji) is de manier waarop studenten laten weten dat ze ergens aanwezig zijn.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bits',
    path: 'blog/begrippen/bits',
    category: 'Begrippen',
    title: 'Bits',
    excerpt: 'Bits betekent zoiets als klote of heel vervelend.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bodem-leggen',
    path: 'blog/begrippen/bodem-leggen',
    category: 'Begrippen',
    title: 'Bodem leggen',
    excerpt: 'Een bodem leggen betekent goed eten voordat je gaat drinken, zodat je minder snel dronken wordt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'brak',
    path: 'blog/begrippen/brak',
    category: 'Begrippen',
    title: 'Brak',
    excerpt: 'Brak is de studententerm voor een kater, meestal de mentale variant: futloos en tot niets in staat.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'braken',
    path: 'blog/begrippen/braken',
    category: 'Begrippen',
    title: 'Braken',
    excerpt: 'Braken is een ander woord voor overgeven, vaak veroorzaakt door te veel alcohol.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'brassen',
    path: 'blog/begrippen/brassen',
    category: 'Begrippen',
    title: 'Brassen',
    excerpt: 'Brassen is een ritueel waarbij twee leden elkaar bij de kraag grijpen om een meningsverschil te beslechten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bs',
    path: 'blog/begrippen/bs',
    category: 'Begrippen',
    title: 'Bs',
    excerpt: 'Bs heeft meerdere betekenissen: van boodschappen tot Brightspace, de digitale leeromgeving van je opleiding.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bueno',
    path: 'blog/begrippen/bueno',
    category: 'Begrippen',
    title: 'Bueno',
    excerpt: 'Bueno is Spaans voor oké of goed, en wordt door studenten gebruikt om iets goed te keuren.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'burger',
    path: 'blog/begrippen/burger',
    category: 'Begrippen',
    title: 'Burger',
    excerpt: 'Een burger is de studententerm voor iemand die niet meer studeert en fulltime werkt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'burgerrups',
    path: 'blog/begrippen/burgerrups',
    category: 'Begrippen',
    title: 'Burgerrups',
    excerpt: 'Burgerrups is studentenslang voor de trein die arbeiders elke dag naar hun werk neemt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bv',
    path: 'blog/begrippen/bv',
    category: 'Begrippen',
    title: 'Bv',
    excerpt: 'Bv staat voor bestuursvergadering, het overleg waarin een bestuur alle lopende zaken bespreekt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bvo',
    path: 'blog/begrippen/bvo',
    category: 'Begrippen',
    title: 'Bvo',
    excerpt: 'Een bvo, of bvo\'tje, is een biertje voor onderweg naar een feestje of de soos.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'byob',
    path: 'blog/begrippen/byob',
    category: 'Begrippen',
    title: 'BYOB',
    excerpt: 'BYOB staat voor Bring Your Own Bottle (of Beer): neem je eigen drank mee naar het feestje.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'bsa',
    path: 'blog/begrippen/bsa',
    category: 'Begrippen',
    title: 'BSA',
    excerpt: 'Het BSA (bindend studieadvies) bepaalt of je met je studie mag doorgaan na het eerste jaar.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'cappu',
    path: 'blog/begrippen/cappu',
    category: 'Begrippen',
    title: 'Cappu',
    excerpt: 'Cappu is de studentikoze afkorting voor cappuccino, met tegenwoordig ook plantaardige varianten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'chlam',
    path: 'blog/begrippen/chlam',
    category: 'Begrippen',
    title: 'Chlam',
    excerpt: 'Chlam is de afkorting voor chlamydia, een veelvoorkomende soa onder studenten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'condo',
    path: 'blog/begrippen/condo',
    category: 'Begrippen',
    title: 'Condo',
    excerpt: 'Condo, ook wel regenjas, is de studententerm voor een condoom.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'connie',
    path: 'blog/begrippen/connie',
    category: 'Begrippen',
    title: 'Connie',
    excerpt: 'Connie is een ander woord voor condoom.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'constitutieborrel',
    path: 'blog/begrippen/constitutieborrel',
    category: 'Begrippen',
    title: 'Constitutieborrel',
    excerpt: 'Een constitutieborrel (cobo) is de borrel waarop een nieuw bestuur wordt gefeliciteerd met zijn aantreden.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'corps',
    path: 'blog/begrippen/corps',
    category: 'Begrippen',
    title: 'Corps',
    excerpt: 'Het corps is doorgaans de oudste studentenvereniging van een stad, gebouwd op oude tradities.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'cursist',
    path: 'blog/begrippen/cursist',
    category: 'Begrippen',
    title: 'Cursist',
    excerpt: 'Cursist is de term die wo-studenten weleens gebruiken voor een hbo-student.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'cursus',
    path: 'blog/begrippen/cursus',
    category: 'Begrippen',
    title: 'Cursus',
    excerpt: 'Cursus is de term die wo-studenten weleens gebruiken voor een hbo-opleiding.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'commissie',
    path: 'blog/begrippen/commissie',
    category: 'Begrippen',
    title: 'Commissie',
    excerpt: 'Een commissie is een groep leden die het bestuur van een vereniging op een specifiek onderdeel ondersteunt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dapri',
    path: 'blog/begrippen/dapri',
    category: 'Begrippen',
    title: 'Dapri',
    excerpt: 'Dapri is de afkorting voor datumprikker, een onmisbare tool om met je dispuut of huis een datum te plannen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'das',
    path: 'blog/begrippen/das',
    category: 'Begrippen',
    title: 'Das',
    excerpt: 'Das is studentenslang voor de stropdas, vaak gedragen als dispuutskleding bij officiële gelegenheden.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'datediner',
    path: 'blog/begrippen/datediner',
    category: 'Begrippen',
    title: 'Datediner',
    excerpt: 'Een datediner is een etentje met een date, vaak georganiseerd via je dispuut, huis of vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'despo',
    path: 'blog/begrippen/despo',
    category: 'Begrippen',
    title: 'Despo',
    excerpt: 'Despo is de bijnaam voor het biermerk Desperados, bekend om de tequilasmaak.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'deur-verdienen',
    path: 'blog/begrippen/deur-verdienen',
    category: 'Begrippen',
    title: 'Deur verdienen',
    excerpt: 'Deur verdienen is een traditie in sommige studentenhuizen waarbij een nieuwe huisgenoot zijn kamerdeur nog moet verdienen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dibs',
    path: 'blog/begrippen/dibs',
    category: 'Begrippen',
    title: 'Dibs',
    excerpt: 'Dibs roepen is het claimen van een object of plek voordat iemand anders het pakt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dichtgetikt',
    path: 'blog/begrippen/dichtgetikt',
    category: 'Begrippen',
    title: 'Dichtgetikt',
    excerpt: 'Dichtgetikt ben je als je alleen nog maar over je studentenvereniging en het bijbehorende jargon kunt praten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dies',
    path: 'blog/begrippen/dies',
    category: 'Begrippen',
    title: 'Dies',
    excerpt: 'Dies (Dies Natalis) is de verjaardag van een studentenvereniging, studievereniging of universiteit.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dispuut',
    path: 'blog/begrippen/dispuut',
    category: 'Begrippen',
    title: 'Dispuut',
    excerpt: 'Een dispuut is een hechte groep binnen een studentenvereniging, vaak met leden uit meerdere jaarlagen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'doorhalen',
    path: 'blog/begrippen/doorhalen',
    category: 'Begrippen',
    title: 'Doorhalen',
    excerpt: 'De avond doorhalen betekent doorgaan met uitgaan tot de volgende ochtend, zonder te slapen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'driesecondenregel',
    path: 'blog/begrippen/driesecondenregel',
    category: 'Begrippen',
    title: 'Driesecondenregel',
    excerpt: 'De driesecondenregel zegt dat je gevallen eten binnen drie seconden mag oprapen en alsnog opeten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'dubbel-gemengd',
    path: 'blog/begrippen/dubbel-gemengd',
    category: 'Begrippen',
    title: 'Dubbel gemengd',
    excerpt: 'Een dubbel gemengd studentenhuis is een huis met zowel mannen als vrouwen uit verschillende verenigingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'duft',
    path: 'blog/begrippen/duft',
    category: 'Begrippen',
    title: 'Duft',
    excerpt: 'Duft is de bijnaam voor een student uit Delft, ook wel fietsenmaker genoemd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'duo',
    path: 'blog/begrippen/duo',
    category: 'Begrippen',
    title: 'DUO',
    excerpt: 'DUO (Dienst Uitvoering Onderwijs) is de overheidsinstantie die studiefinanciering en studieleningen regelt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'droog-staan',
    path: 'blog/begrippen/droog-staan',
    category: 'Begrippen',
    title: 'Droog staan',
    excerpt: 'Droog staan betekent dat je een avond bewust niet drinkt, bijvoorbeeld omdat je moet rijden of oppassen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'el-cid',
    path: 'blog/begrippen/el-cid',
    category: 'Begrippen',
    title: 'EL CID',
    excerpt: 'EL CID is de introductieweek voor nieuwe studenten in Leiden.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'esca',
    path: 'blog/begrippen/esca',
    category: 'Begrippen',
    title: 'Esca',
    excerpt: 'Esca is de verkorte vorm van escaleren, gebruikt als een avond of feestje heel gezellig was.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'escaleren',
    path: 'blog/begrippen/escaleren',
    category: 'Begrippen',
    title: 'Escaleren',
    excerpt: 'Een avond laten escaleren betekent dat het een geslaagde, gezellige avond is geworden.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'esma',
    path: 'blog/begrippen/esma',
    category: 'Begrippen',
    title: 'Esma',
    excerpt: 'Esma is de studentikoze afkorting voor de cocktail espresso martini.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'eventuela',
    path: 'blog/begrippen/eventuela',
    category: 'Begrippen',
    title: 'Eventuela',
    excerpt: 'Een eventuela is iemand waarmee je eventueel een relatie zou willen, maar waar je nog niet zeker van bent.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'exclu',
    path: 'blog/begrippen/exclu',
    category: 'Begrippen',
    title: 'Exclu',
    excerpt: 'Exclu is de afkorting van exclusief, een fase in een relatie waarin je alleen met elkaar afspreekt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'exclusief',
    path: 'blog/begrippen/exclusief',
    category: 'Begrippen',
    title: 'Exclusief',
    excerpt: 'Exclusief betekent dat je alleen met je date of scharrel seks hebt, zonder verdere verplichtingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'extern',
    path: 'blog/begrippen/extern',
    category: 'Begrippen',
    title: 'Extern',
    excerpt: 'Extern is iemand of iets van buiten je eigen vereniging of studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'feut',
    path: 'blog/begrippen/feut',
    category: 'Begrippen',
    title: 'Feut',
    excerpt: 'Een feut is een aspirant-lid van een studentenvereniging dat de KMT of ontgroening nog moet doorstaan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'flaneren',
    path: 'blog/begrippen/flaneren',
    category: 'Begrippen',
    title: 'Flaneren',
    excerpt: 'Flaneren is een rondje lopen om gezien te worden, bijvoorbeeld op de sociëteit of in de stad.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'fomo',
    path: 'blog/begrippen/fomo',
    category: 'Begrippen',
    title: 'FOMO',
    excerpt: 'FOMO (fear of missing out) is de angst om iets leuks te missen, waardoor je toch naar elk feestje gaat.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'fuif',
    path: 'blog/begrippen/fuif',
    category: 'Begrippen',
    title: 'Fuif',
    excerpt: 'Een fuif is een feestje met een gezellige, huiselijke sfeer.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'fusie',
    path: 'blog/begrippen/fusie',
    category: 'Begrippen',
    title: 'Fusie',
    excerpt: 'Fusie is studentenslang voor de gemeenschappelijke ruimte (GR) of woonkamer van een studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'fwb',
    path: 'blog/begrippen/fwb',
    category: 'Begrippen',
    title: 'FWB',
    excerpt: 'FWB (friends with benefits) is een seksuele relatie tussen vrienden zonder verdere verplichtingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'galaplicht',
    path: 'blog/begrippen/galaplicht',
    category: 'Begrippen',
    title: 'Galaplicht',
    excerpt: 'Galaplicht is het ongeschreven (en betwiste) idee dat een galadate verplicht tot meer dan alleen dansen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'gefeli',
    path: 'blog/begrippen/gefeli',
    category: 'Begrippen',
    title: 'Gefeli',
    excerpt: 'Gefeli is de studentikoze afkorting voor gefeliciteerd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'geru',
    path: 'blog/begrippen/geru',
    category: 'Begrippen',
    title: 'Geru',
    excerpt: 'Geru is de afkorting voor gemeenschappelijke ruimte, de woonkamer van een studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'gezel',
    path: 'blog/begrippen/gezel',
    category: 'Begrippen',
    title: 'Gezel',
    excerpt: 'Gezel is de verkorte vorm van gezellig, veelvuldig gebruikt in studentenkringen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ginto',
    path: 'blog/begrippen/ginto',
    category: 'Begrippen',
    title: 'GinTo',
    excerpt: 'GinTo is de studentikoze afkorting voor gin-tonic.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'gk',
    path: 'blog/begrippen/gk',
    category: 'Begrippen',
    title: 'GK',
    excerpt: 'GK staat voor gemeenschappelijke kamer, hetzelfde als een GR of fusie.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'goos',
    path: 'blog/begrippen/goos',
    category: 'Begrippen',
    title: 'Goos',
    excerpt: 'Goos is een andere naam voor gozer: een vriend, of soms juist een sukkel.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'gozer',
    path: 'blog/begrippen/gozer',
    category: 'Begrippen',
    title: 'Gozer',
    excerpt: 'Gozer is studentenslang voor een vriend, of juist een sukkel, afhankelijk van de context.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'gr',
    path: 'blog/begrippen/gr',
    category: 'Begrippen',
    title: 'GR',
    excerpt: 'GR staat voor gemeenschappelijke ruimte, de gedeelde huiskamer van een studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'grondpannenkoek',
    path: 'blog/begrippen/grondpannenkoek',
    category: 'Begrippen',
    title: 'Grondpannenkoek',
    excerpt: 'Grondpannenkoek, ook wel straatpannenkoek, is een ander woord voor een grondpizza.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'grondpizza',
    path: 'blog/begrippen/grondpizza',
    category: 'Begrippen',
    title: 'Grondpizza',
    excerpt: 'Een grondpizza is braaksel op de grond, vaak in een min of meer ronde vorm.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'guac',
    path: 'blog/begrippen/guac',
    category: 'Begrippen',
    title: 'Guac',
    excerpt: 'Guac is de afkorting voor guacamole, de Mexicaanse avocadodip.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'haasje',
    path: 'blog/begrippen/haasje',
    category: 'Begrippen',
    title: 'Haasje',
    excerpt: 'Haasje is de mannelijke tegenhanger van het hertje, gebruikt binnen corporale kringen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'halve-leo',
    path: 'blog/begrippen/halve-leo',
    category: 'Begrippen',
    title: 'Halve leo',
    excerpt: 'Een halve leo is een blikje bier van een halve liter.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'her',
    path: 'blog/begrippen/her',
    category: 'Begrippen',
    title: 'Her',
    excerpt: 'Her is de afkorting voor hertentamen, voor als het niet in één keer lukt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hertje',
    path: 'blog/begrippen/hertje',
    category: 'Begrippen',
    title: 'Hertje',
    excerpt: 'Een hertje is de studententerm voor een vrouwelijke verschijning, vooral gebruikt binnen corporale kringen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hg',
    path: 'blog/begrippen/hg',
    category: 'Begrippen',
    title: 'HG',
    excerpt: 'HG is de afkorting voor huisgenoot, iemand met wie je een studentenhuis deelt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hila',
    path: 'blog/begrippen/hila',
    category: 'Begrippen',
    title: 'Hila',
    excerpt: 'Hila is de afkorting voor hilarisch, gebruikt voor alles wat lachwekkend is.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hj',
    path: 'blog/begrippen/hj',
    category: 'Begrippen',
    title: 'HJ',
    excerpt: 'HJ heeft twee betekenissen: huisjongste, of het biermerk Hertog Jan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'honk',
    path: 'blog/begrippen/honk',
    category: 'Begrippen',
    title: 'Honk',
    excerpt: 'Honk is een schaal die aangeeft hoever je fysiek met iemand bent gegaan, vergelijkbaar met het Engelse \'bases\'-systeem.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hospi',
    path: 'blog/begrippen/hospi',
    category: 'Begrippen',
    title: 'Hospi',
    excerpt: 'Hospi is de afkorting voor hospiteren: het kennismakingsproces voor een kamer in een studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hospiteren',
    path: 'blog/begrippen/hospiteren',
    category: 'Begrippen',
    title: 'Hospiteren',
    excerpt: 'Hospiteren is het kennismakingsgesprek waarmee huisgenoten een nieuwe bewoner voor hun studentenhuis kiezen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'houdini',
    path: 'blog/begrippen/houdini',
    category: 'Begrippen',
    title: 'Houdini',
    excerpt: 'Een houdini is het stiekem verdwijnen van een avondje stappen zonder gedag te zeggen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'huig-hockeyen',
    path: 'blog/begrippen/huig-hockeyen',
    category: 'Begrippen',
    title: 'Huig hockeyen',
    excerpt: 'Huig hockeyen is studentikoze slang voor tongzoenen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'huisjongste',
    path: 'blog/begrippen/huisjongste',
    category: 'Begrippen',
    title: 'Huisjongste',
    excerpt: 'De huisjongste (HJ) is degene die het laatst is ingetrokken in het studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'huispanda',
    path: 'blog/begrippen/huispanda',
    category: 'Begrippen',
    title: 'Huispanda',
    excerpt: 'De huispanda is de huisgenoot die het langst geleden nog seks heeft gehad.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'huisparasiet',
    path: 'blog/begrippen/huisparasiet',
    category: 'Begrippen',
    title: 'Huisparasiet',
    excerpt: 'Een huisparasiet is iemand die vaak in een studentenhuis rondhangt, zonder er zelf te wonen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'hv',
    path: 'blog/begrippen/hv',
    category: 'Begrippen',
    title: 'HV',
    excerpt: 'HV staat voor huisvergadering, waarin huisgenoten samen beslissingen nemen over het huis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'herstelbiertje',
    path: 'blog/begrippen/herstelbiertje',
    category: 'Begrippen',
    title: 'Herstelbiertje',
    excerpt: 'Een herstelbiertje is een biertje dat je drinkt om van een kater af te komen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ibu',
    path: 'blog/begrippen/ibu',
    category: 'Begrippen',
    title: 'Ibu',
    excerpt: 'Ibu is de afkorting voor ibuprofen, vaak nodig na een avondje doorzakken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'icen',
    path: 'blog/begrippen/icen',
    category: 'Begrippen',
    title: 'Icen',
    excerpt: 'Icen is een drankspel waarbij je een verstopte fles Smirnoff Ice moet vinden en in één keer leegdrinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ijskast',
    path: 'blog/begrippen/ijskast',
    category: 'Begrippen',
    title: 'IJskast',
    excerpt: 'IJskast is studententaal voor de koelkast.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'inauguratie',
    path: 'blog/begrippen/inauguratie',
    category: 'Begrippen',
    title: 'Inauguratie',
    excerpt: 'Een inauguratie is de plechtige ceremonie waarmee iemand lid wordt van een studentenvereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'indikken',
    path: 'blog/begrippen/indikken',
    category: 'Begrippen',
    title: 'Indikken',
    excerpt: 'Indikken is een kreet om een groep te vragen dichter op elkaar te gaan zitten of staan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'indrinken',
    path: 'blog/begrippen/indrinken',
    category: 'Begrippen',
    title: 'Indrinken',
    excerpt: 'Indrinken is thuis alvast drinken voordat je uitgaat, omdat drank in de kroeg duurder is.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'influ',
    path: 'blog/begrippen/influ',
    category: 'Begrippen',
    title: 'Influ',
    excerpt: 'Influ is de afkorting voor influencer, iemand die online veel volgers heeft.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'inkakken',
    path: 'blog/begrippen/inkakken',
    category: 'Begrippen',
    title: 'Inkakken',
    excerpt: 'Inkakken is het gevoel dat je moe en suf wordt tijdens het uitgaan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'instemmen',
    path: 'blog/begrippen/instemmen',
    category: 'Begrippen',
    title: 'Instemmen',
    excerpt: 'Instemmen is het moment waarop een studentenhuis of dispuut nieuwe sjaars kiest.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'internacho',
    path: 'blog/begrippen/internacho',
    category: 'Begrippen',
    title: 'Internacho',
    excerpt: 'Internacho is de studentikoze bijnaam voor een internationale student.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'introductieweek',
    path: 'blog/begrippen/introductieweek',
    category: 'Begrippen',
    title: 'Introductieweek',
    excerpt: 'De introductieweek is de eerste week waarin nieuwe studenten kennismaken met hun stad, studie en verenigingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'italiaans-afscheid',
    path: 'blog/begrippen/italiaans-afscheid',
    category: 'Begrippen',
    title: 'Italiaans afscheid',
    excerpt: 'Een Italiaans afscheid is een afscheid waarbij je minstens drie keer terugkomt om nog een keer gedag te zeggen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'jaarclub',
    path: 'blog/begrippen/jaarclub',
    category: 'Begrippen',
    title: 'Jaarclub',
    excerpt: 'Een jaarclub is een groep binnen een vereniging die vooral bestaat uit leden van hetzelfde jaar.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'jasje-dasje',
    path: 'blog/begrippen/jasje-dasje',
    category: 'Begrippen',
    title: 'Jasje dasje',
    excerpt: 'Jasje dasje is een semi-officiële dresscode met een colbert, das en spijkerbroek.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'jc',
    path: 'blog/begrippen/jc',
    category: 'Begrippen',
    title: 'JC',
    excerpt: 'JC is de afkorting voor jaarclub.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'jagerbomb',
    path: 'blog/begrippen/jagerbomb',
    category: 'Begrippen',
    title: 'Jägerbomb',
    excerpt: 'Een Jägerbomb is een populair studentendrankje van energydrink met een shotje Jägermeister erin.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kaasschaaf',
    path: 'blog/begrippen/kaasschaaf',
    category: 'Begrippen',
    title: 'Kaasschaaf',
    excerpt: 'Kaasschaaf is een minder vleiende studententerm voor iemand die onhandig is op seksueel gebied.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kantelen',
    path: 'blog/begrippen/kantelen',
    category: 'Begrippen',
    title: 'Kantelen',
    excerpt: 'Kantelen betekent dat een avond geweldig verloopt, of dat je een drankje in één keer leegdrinkt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kapstokhertje',
    path: 'blog/begrippen/kapstokhertje',
    category: 'Begrippen',
    title: 'Kapstokhertje',
    excerpt: 'Een kapstokhertje wacht aan het einde van een feestje bij de kapstok in de hoop de avond gezellig af te sluiten met iemand.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kater',
    path: 'blog/begrippen/kater',
    category: 'Begrippen',
    title: 'Kater',
    excerpt: 'Een kater is het vervelende gevoel de dag na het drinken van te veel alcohol.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kmt',
    path: 'blog/begrippen/kmt',
    category: 'Begrippen',
    title: 'KMT',
    excerpt: 'KMT (kennismakingstijd) is de officiële naam voor de periode waarin een feut kennismaakt met de vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'knor',
    path: 'blog/begrippen/knor',
    category: 'Begrippen',
    title: 'Knor',
    excerpt: 'Knor is de term die corpsleden gebruiken voor iemand die geen lid is van het corps.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kompaan',
    path: 'blog/begrippen/kompaan',
    category: 'Begrippen',
    title: 'Kompaan',
    excerpt: 'Kompaan is een ander woord voor vriend.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kot',
    path: 'blog/begrippen/kot',
    category: 'Begrippen',
    title: 'Kot',
    excerpt: 'Kot is de Belgische term voor een studentenkamer, vergelijkbaar met het Nederlandse \'thuis\'.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'krokant',
    path: 'blog/begrippen/krokant',
    category: 'Begrippen',
    title: 'Krokant',
    excerpt: 'Krokant beschrijft een ongemakkelijke sfeer, of het gevoel dat je daarna zelf overhoudt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kruipafstand',
    path: 'blog/begrippen/kruipafstand',
    category: 'Begrippen',
    title: 'Kruipafstand',
    excerpt: 'Kruipafstand is de studententerm voor een locatie die nog dichterbij is dan op steenworp afstand.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'kwarrel',
    path: 'blog/begrippen/kwarrel',
    category: 'Begrippen',
    title: 'Kwarrel',
    excerpt: 'Een kwarrel (kwaliteitscharrel) is een scharrel waarbij ook een emotionele klik is.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'labo',
    path: 'blog/begrippen/labo',
    category: 'Begrippen',
    title: 'Labo',
    excerpt: 'Labo heeft twee betekenissen: een laffe borrelaar, of de lange kassabon van de supermarkt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'leenstelsel',
    path: 'blog/begrippen/leenstelsel',
    category: 'Begrippen',
    title: 'Leenstelsel',
    excerpt: 'Het leenstelsel is het systeem waarbij studenten sinds 2015 hun studie via een lening bij DUO betalen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'loca',
    path: 'blog/begrippen/loca',
    category: 'Begrippen',
    title: 'Loca',
    excerpt: 'Loca is de afkorting voor locatie.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'louter',
    path: 'blog/begrippen/louter',
    category: 'Begrippen',
    title: 'Louter',
    excerpt: 'Louter is een ander woord voor alleen maar, niets meer en niets minder.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ludiek',
    path: 'blog/begrippen/ludiek',
    category: 'Begrippen',
    title: 'Ludiek',
    excerpt: 'Ludiek betekent grappig, speels of origineel, en wordt vaak gebruikt tijdens een KMT of borrel.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'lullepot',
    path: 'blog/begrippen/lullepot',
    category: 'Begrippen',
    title: 'Lullepot',
    excerpt: 'Een lullepot is een geïmproviseerd, verzonnen verhaal, vaak verteld tijdens een KMT.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'lustrum',
    path: 'blog/begrippen/lustrum',
    category: 'Begrippen',
    title: 'Lustrum',
    excerpt: 'Een lustrum is het vijfjarig bestaan van een vereniging, vaak gevierd met een lustrumreis of -gala.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'lapswans',
    path: 'blog/begrippen/lapswans',
    category: 'Begrippen',
    title: 'Lapswans',
    excerpt: 'Lapswans is een informele manier om gedag te zeggen, vergelijkbaar met \'tot ziens\' of \'dag\'.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'm',
    path: 'blog/begrippen/m',
    category: 'Begrippen',
    title: 'M',
    excerpt: 'M is de studentikoze afkorting voor de drug MDMA, de werkzame stof in xtc.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'maat',
    path: 'blog/begrippen/maat',
    category: 'Begrippen',
    title: 'Maat',
    excerpt: 'Maat is een ander woord voor vriend.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'matras',
    path: 'blog/begrippen/matras',
    category: 'Begrippen',
    title: 'Matras',
    excerpt: 'Matras is de (weinig vleiende) studententerm voor iemand die met veel verschillende mensen naar bed gaat.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'mc',
    path: 'blog/begrippen/mc',
    category: 'Begrippen',
    title: 'MC',
    excerpt: 'MC (Marie-Claire) is de stereotiepe corpsstudente: flared jeans, haarclip en een fles wijn.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'mdm',
    path: 'blog/begrippen/mdm',
    category: 'Begrippen',
    title: 'MDM',
    excerpt: 'MDM staat voor \'met de meiden\' of \'met de mannen\', gebruikt voor een avondje met een klein, vertrouwd groepje.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'medium',
    path: 'blog/begrippen/medium',
    category: 'Begrippen',
    title: 'Medium',
    excerpt: 'Medium betekent \'wel oké, maar ook weer niet geweldig\'.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'meter-bier',
    path: 'blog/begrippen/meter-bier',
    category: 'Begrippen',
    title: 'Meter',
    excerpt: 'Een meter bier is een houten plank met precies elf biertjes erin, te bestellen in sommige kroegen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'miemelen',
    path: 'blog/begrippen/miemelen',
    category: 'Begrippen',
    title: 'Miemelen',
    excerpt: 'Miemelen is een ander woord voor zeuren of janken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'mores',
    path: 'blog/begrippen/mores',
    category: 'Begrippen',
    title: 'Mores',
    excerpt: 'Mores zijn de ongeschreven regels binnen een studentenvereniging of dispuut.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'mattie',
    path: 'blog/begrippen/mattie',
    category: 'Begrippen',
    title: 'Mattie',
    excerpt: 'Mattie is brede jongerentaal voor vriend, niet alleen onder studenten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'nakkie',
    path: 'blog/begrippen/nakkie',
    category: 'Begrippen',
    title: 'Nakkie',
    excerpt: 'Een nakkie is studentenslang voor een lijntje drugs.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'nominaal-lopen',
    path: 'blog/begrippen/nominaal-lopen',
    category: 'Begrippen',
    title: 'Nominaal lopen',
    excerpt: 'Nominaal lopen betekent dat je alle studiepunten van je studiejaar op tijd hebt gehaald.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'normi',
    path: 'blog/begrippen/normi',
    category: 'Begrippen',
    title: 'Normi',
    excerpt: 'Normi is de afkorting voor normaal.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'nul',
    path: 'blog/begrippen/nul',
    category: 'Begrippen',
    title: 'Nul',
    excerpt: 'Een nul is een eerstejaarsstudent die nog geen volwaardig lid is van een vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'nekken',
    path: 'blog/begrippen/nekken',
    category: 'Begrippen',
    title: 'Nekken',
    excerpt: 'Nekken is een drankje in één keer achterover slaan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'one-night-stand',
    path: 'blog/begrippen/one-night-stand',
    category: 'Begrippen',
    title: 'One-night stand',
    excerpt: 'Een one-night stand is seks voor één avond, zonder verdere verplichtingen of emoties.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ontgroening',
    path: 'blog/begrippen/ontgroening',
    category: 'Begrippen',
    title: 'Ontgroening',
    excerpt: 'Ontgroening is de oudere naam voor wat tegenwoordig KMT heet, de kennismakingstijd bij een vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'p',
    path: 'blog/begrippen/p',
    category: 'Begrippen',
    title: 'P',
    excerpt: 'P is de afkorting voor propedeuse, het certificaat na je eerste studiejaar.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pabo',
    path: 'blog/begrippen/pabo',
    category: 'Begrippen',
    title: 'Pabo',
    excerpt: 'Pabo verwijst naar de lerarenopleiding basisonderwijs, of studentikoos naar een parkborrel.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'paklijst',
    path: 'blog/begrippen/paklijst',
    category: 'Begrippen',
    title: 'Paklijst',
    excerpt: 'De paklijst is de lijst met (vaak willekeurige) spullen die je voor de start van je KMT moet meenemen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pandapunten',
    path: 'blog/begrippen/pandapunten',
    category: 'Begrippen',
    title: 'Pandapunten',
    excerpt: 'Pandapunten tellen hoeveel weken een student al geen seks heeft gehad.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'para',
    path: 'blog/begrippen/para',
    category: 'Begrippen',
    title: 'Para',
    excerpt: 'Para is de afkorting voor paracetamol, tegen de hoofdpijn na een avondje drinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pauper',
    path: 'blog/begrippen/pauper',
    category: 'Begrippen',
    title: 'Pauper',
    excerpt: 'Een pauper is iemand zonder manieren, gebruikt door mensen die zichzelf beter vinden.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pechgeneratie',
    path: 'blog/begrippen/pechgeneratie',
    category: 'Begrippen',
    title: 'Pechgeneratie',
    excerpt: 'De pechgeneratie is de groep studenten die onder het leenstelsel viel, zonder de oude basisbeurs.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pint',
    path: 'blog/begrippen/pint',
    category: 'Begrippen',
    title: 'Pint',
    excerpt: 'Pint is de Vlaamse term voor een biertje.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'pinten-harken',
    path: 'blog/begrippen/pinten-harken',
    category: 'Begrippen',
    title: 'Pinten harken',
    excerpt: 'Pinten harken betekent flink wat biertjes achter elkaar drinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'plafonddienst',
    path: 'blog/begrippen/plafonddienst',
    category: 'Begrippen',
    title: 'Plafonddienst',
    excerpt: 'Plafonddienst is het niet kunnen slapen na het gebruik van opwekkende middelen, met je ogen naar het plafond starend.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'praeses',
    path: 'blog/begrippen/praeses',
    category: 'Begrippen',
    title: 'Praeses',
    excerpt: 'De praeses is de voorzitter van het bestuur van een studentenvereniging, dispuut of commissie.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'prela',
    path: 'blog/begrippen/prela',
    category: 'Begrippen',
    title: 'Prela',
    excerpt: 'Een prela (pre-relatie) is de fase vlak voor een officiële relatie, waarin je exclusief bent maar nog geen rela.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'proleet',
    path: 'blog/begrippen/proleet',
    category: 'Begrippen',
    title: 'Proleet',
    excerpt: 'Proleet is de studentikoze term voor iemand die niet heeft gestudeerd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'promi',
    path: 'blog/begrippen/promi',
    category: 'Begrippen',
    title: 'Promi',
    excerpt: 'Promi is de afkorting voor prominent.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'prominent',
    path: 'blog/begrippen/prominent',
    category: 'Begrippen',
    title: 'Prominent',
    excerpt: 'Prominent beschrijft iemand die veel commissies doet en belangrijk is binnen de vereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'propedeuse',
    path: 'blog/begrippen/propedeuse',
    category: 'Begrippen',
    title: 'Propedeuse',
    excerpt: 'De propedeuse is het certificaat dat bevestigt dat je in je eerste studiejaar alle studiepunten hebt gehaald.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'quaestor-quaestrix',
    path: 'blog/begrippen/quaestor-quaestrix',
    category: 'Begrippen',
    title: 'Quaestor / Quaestrix',
    excerpt: 'De quaestor (of quaestrix) is de penningmeester van het bestuur van een studentenvereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'rattentaxi',
    path: 'blog/begrippen/rattentaxi',
    category: 'Begrippen',
    title: 'Rattentaxi',
    excerpt: 'De rattentaxi nemen betekent dat je stiekem weggaat van een avondje stappen zonder gedag te zeggen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'regelen',
    path: 'blog/begrippen/regelen',
    category: 'Begrippen',
    title: 'Regelen',
    excerpt: 'Regelen is studentenslang voor zoenen of seks hebben met iemand.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'regenjas',
    path: 'blog/begrippen/regenjas',
    category: 'Begrippen',
    title: 'Regenjas',
    excerpt: 'Regenjas is een ander woord voor condoom.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'rela',
    path: 'blog/begrippen/rela',
    category: 'Begrippen',
    title: 'Rela',
    excerpt: 'Rela is de afkorting voor relatie, de fase na de prela.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'reparadler',
    path: 'blog/begrippen/reparadler',
    category: 'Begrippen',
    title: 'Reparadler',
    excerpt: 'Een reparadler is een radler die je drinkt om je kater te verlichten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'reunist',
    path: 'blog/begrippen/reunist',
    category: 'Begrippen',
    title: 'Reünist',
    excerpt: 'Een reünist is een oud-lid van een studentenvereniging of dispuut.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'riet',
    path: 'blog/begrippen/riet',
    category: 'Begrippen',
    title: 'Riet',
    excerpt: 'Riet is de studententerm voor een rietje, gebruikt om een rietadt te trekken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'rietadt',
    path: 'blog/begrippen/rietadt',
    category: 'Begrippen',
    title: 'Rietadt',
    excerpt: 'Een rietadt is een adtje via een rietje, een snellere manier om een drankje leeg te drinken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'rietbak',
    path: 'blog/begrippen/rietbak',
    category: 'Begrippen',
    title: 'Rietbak',
    excerpt: 'Rietbak is een ander woord voor rietadt: een biertje adten met een rietje.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'safedate',
    path: 'blog/begrippen/safedate',
    category: 'Begrippen',
    title: 'Safedate',
    excerpt: 'Een safedate is een date zonder romantische bijbedoelingen, vaak gebruikt als back-up voor een datediner.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'scharrel',
    path: 'blog/begrippen/scharrel',
    category: 'Begrippen',
    title: 'Scharrel',
    excerpt: 'Een scharrel is een relatiestadium waarbij het vooral om seks draait, met daarnaast een ontspannen band.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'semester',
    path: 'blog/begrippen/semester',
    category: 'Begrippen',
    title: 'Semester',
    excerpt: 'Een semester is de helft van een collegejaar, bestaande uit twee blokken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'sensa',
    path: 'blog/begrippen/sensa',
    category: 'Begrippen',
    title: 'Sensa',
    excerpt: 'Sensa is de afkorting voor sensatie, gebruikt als er iets spannends of geks gebeurt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'sg',
    path: 'blog/begrippen/sg',
    category: 'Begrippen',
    title: 'SG',
    excerpt: 'SG is de afkorting voor shotgun, specifiek de drankvariant waarbij je jezelf een shotgun moet inschenken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'sharken',
    path: 'blog/begrippen/sharken',
    category: 'Begrippen',
    title: 'Sharken',
    excerpt: 'Sharken is het inpikken van iemands date, meestal op een gala of datediner.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'sjaars',
    path: 'blog/begrippen/sjaars',
    category: 'Begrippen',
    title: 'Sjaars',
    excerpt: 'Een sjaars is een eerstejaarsstudent, vaak lid van een vereniging of wonend in een studentenhuis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'skeer',
    path: 'blog/begrippen/skeer',
    category: 'Begrippen',
    title: 'Skeer',
    excerpt: 'Skeer betekent dat iemand weinig geld heeft, een bekende toestand onder studenten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'smoelen',
    path: 'blog/begrippen/smoelen',
    category: 'Begrippen',
    title: 'Smoelen',
    excerpt: 'Smoelen is een kreet om een groep tot stilte te manen, vaak gehoord bij studentenverenigingen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'societeit',
    path: 'blog/begrippen/societeit',
    category: 'Begrippen',
    title: 'Sociëteit',
    excerpt: 'De sociëteit is het gebouw waar leden van een studentenvereniging samenkomen om te borrelen en feesten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'soos',
    path: 'blog/begrippen/soos',
    category: 'Begrippen',
    title: 'Soos',
    excerpt: 'Soos is de afkorting voor sociëteit.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'spa-goud',
    path: 'blog/begrippen/spa-goud',
    category: 'Begrippen',
    title: 'Spa goud',
    excerpt: 'Spa goud is een grappige omschrijving voor een biertje, verwijzend naar de gouden kleur.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'spannie',
    path: 'blog/begrippen/spannie',
    category: 'Begrippen',
    title: 'Spannie',
    excerpt: 'Spannie is de afkorting voor spannend.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'spiegelen',
    path: 'blog/begrippen/spiegelen',
    category: 'Begrippen',
    title: 'Spiegelen',
    excerpt: 'Spiegelen is met iemand afspreken om precies hetzelfde te drinken, om te zien wie het langst volhoudt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'spijtknor',
    path: 'blog/begrippen/spijtknor',
    category: 'Begrippen',
    title: 'Spijtknor',
    excerpt: 'Een spijtknor is iemand die er spijt van heeft geen lid te zijn geworden van een corporale studentenvereniging.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'spoorknor',
    path: 'blog/begrippen/spoorknor',
    category: 'Begrippen',
    title: 'Spoorknor',
    excerpt: 'Een spoorknor is een knor die met de trein (burgerrups) reist.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'stiften',
    path: 'blog/begrippen/stiften',
    category: 'Begrippen',
    title: 'Stiften',
    excerpt: 'Stiften is een fictief studentenspel waarbij de regels ter plekke worden verzonnen om anderen in de war te brengen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'strepen',
    path: 'blog/begrippen/strepen',
    category: 'Begrippen',
    title: 'Strepen',
    excerpt: 'Strepen is een traditie waarbij iemand als straf wordt natgegooid met bier of water.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'student',
    path: 'blog/begrippen/student',
    category: 'Begrippen',
    title: 'Student',
    excerpt: 'Een student is iemand die een opleiding volgt aan een hogeschool of universiteit.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studentenhuis',
    path: 'blog/begrippen/studentenhuis',
    category: 'Begrippen',
    title: 'Studentenhuis',
    excerpt: 'Een studentenhuis is de woning waar je samen met huisgenoten woont tijdens je studietijd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studentenreisproduct',
    path: 'blog/begrippen/studentenreisproduct',
    category: 'Begrippen',
    title: 'Studentenreisproduct',
    excerpt: 'Het studentenreisproduct is het gratis ov-abonnement dat je als student via DUO krijgt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studententien',
    path: 'blog/begrippen/studententien',
    category: 'Begrippen',
    title: 'Studententien',
    excerpt: 'Een studententien is een 5,5 voor een tentamen: niet cum laude, maar wel voldoende.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studentenvereniging',
    path: 'blog/begrippen/studentenvereniging',
    category: 'Begrippen',
    title: 'Studentenvereniging',
    excerpt: 'Een studentenvereniging is een club door en voor studenten, met eigen disputen, jaarclubs en tradities.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studentikoos',
    path: 'blog/begrippen/studentikoos',
    category: 'Begrippen',
    title: 'Studentikoos',
    excerpt: 'Studentikoos betekent dat iets typisch studentikoos is, precies zoals dit woordenboek.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'studievereniging',
    path: 'blog/begrippen/studievereniging',
    category: 'Begrippen',
    title: 'Studievereniging',
    excerpt: 'Een studievereniging organiseert activiteiten voor studenten van een specifieke studierichting.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'stufi',
    path: 'blog/begrippen/stufi',
    category: 'Begrippen',
    title: 'Stufi',
    excerpt: 'Stufi is de afkorting voor studiefinanciering.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'stuko',
    path: 'blog/begrippen/stuko',
    category: 'Begrippen',
    title: 'Stuko',
    excerpt: 'Stuko is de studentikoze afkorting voor studentikoos.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'super',
    path: 'blog/begrippen/super',
    category: 'Begrippen',
    title: 'De super',
    excerpt: 'De super is studentikoze taal voor de supermarkt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'sws',
    path: 'blog/begrippen/sws',
    category: 'Begrippen',
    title: 'SWS',
    excerpt: 'SWS is de afkorting voor sowieso.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tea',
    path: 'blog/begrippen/tea',
    category: 'Begrippen',
    title: 'Tea',
    excerpt: 'Tea betekent dat je juicy nieuws of roddels hebt om te delen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tellie',
    path: 'blog/begrippen/tellie',
    category: 'Begrippen',
    title: 'Tellie',
    excerpt: 'Tellie is de afkorting voor telefoon.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tenta',
    path: 'blog/begrippen/tenta',
    category: 'Begrippen',
    title: 'Tenta',
    excerpt: 'Tenta is de afkorting voor tentamen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'thth',
    path: 'blog/begrippen/thth',
    category: 'Begrippen',
    title: 'THTH',
    excerpt: 'THTH is de afkorting voor thuisthuis, het ouderlijk huis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'thuis',
    path: 'blog/begrippen/thuis',
    category: 'Begrippen',
    title: 'Thuis',
    excerpt: 'Thuis is de studententerm voor je studentenhuis, niet te verwarren met je ouderlijk huis.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'thuisthuis',
    path: 'blog/begrippen/thuisthuis',
    category: 'Begrippen',
    title: 'Thuisthuis',
    excerpt: 'Thuisthuis is het ouderlijk huis, om het te onderscheiden van je studentenhuis (thuis).',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tijgerpunten',
    path: 'blog/begrippen/tijgerpunten',
    category: 'Begrippen',
    title: 'Tijgerpunten',
    excerpt: 'Tijgerpunten zijn een puntensysteem waarmee studenten seksuele ervaringen met elkaar vergelijken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tjak',
    path: 'blog/begrippen/tjak',
    category: 'Begrippen',
    title: 'Tjak',
    excerpt: 'Tjak is studentenslang voor viezigheid, zoals schimmel of etensresten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tmi',
    path: 'blog/begrippen/tmi',
    category: 'Begrippen',
    title: 'TMI',
    excerpt: 'TMI (too much information) roep je als iemand meer vertelt dan je eigenlijk wilde weten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'toko',
    path: 'blog/begrippen/toko',
    category: 'Begrippen',
    title: 'Toko',
    excerpt: 'Toko is een verzamelnaam voor een eettentje waarvan je de naam niet kent, zoals een kebabzaak.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tranqi',
    path: 'blog/begrippen/tranqi',
    category: 'Begrippen',
    title: 'Tranqi',
    excerpt: 'Tranqi is de afkorting van tranquilo: Spaans voor rustig of chill.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tranquilo',
    path: 'blog/begrippen/tranquilo',
    category: 'Begrippen',
    title: 'Tranquilo',
    excerpt: 'Tranquilo is Spaans voor rustig of chill, gebruikt om iemand tot bedaren te manen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'trekken',
    path: 'blog/begrippen/trekken',
    category: 'Begrippen',
    title: 'Trekken',
    excerpt: 'Trekken is studentenslang voor een drankje in één keer leegdrinken, zoals bij bak trekken.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'turflijst',
    path: 'blog/begrippen/turflijst',
    category: 'Begrippen',
    title: 'Turflijst',
    excerpt: 'Een turflijst, ook wel streeplijst, houdt bij hoeveel drankjes iedere huisgenoot heeft gehad.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'tetteren',
    path: 'blog/begrippen/tetteren',
    category: 'Begrippen',
    title: 'Tetteren',
    excerpt: 'Tetteren betekent stevig doorzakken en veel drinken tijdens het uitgaan.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'ub',
    path: 'blog/begrippen/ub',
    category: 'Begrippen',
    title: 'UB',
    excerpt: 'De UB (universiteitsbibliotheek) is de plek waar studenten studeren en boeken lenen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'uf',
    path: 'blog/begrippen/uf',
    category: 'Begrippen',
    title: 'Uf',
    excerpt: 'Een uf (of ufje) is een vrouwelijk lid van de Utrechtse Vrouwelijke Studenten Vereniging (UVSV).',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vanaaf',
    path: 'blog/begrippen/vanaaf',
    category: 'Begrippen',
    title: 'Vanaaf',
    excerpt: 'Vanaaf is de afkorting voor vanavond.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vestjeslikker',
    path: 'blog/begrippen/vestjeslikker',
    category: 'Begrippen',
    title: 'Vestjeslikker',
    excerpt: 'Een vestjeslikker is iemand die vooral geïnteresseerd is in bestuursleden of prominente leden vanwege hun status.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'veto',
    path: 'blog/begrippen/veto',
    category: 'Begrippen',
    title: 'Veto',
    excerpt: 'Een veto uitspreken betekent dat je een voorstel tegenhoudt, bijvoorbeeld tijdens een ALV.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vino',
    path: 'blog/begrippen/vino',
    category: 'Begrippen',
    title: 'Vino',
    excerpt: 'Vino is Spaans voor wijn, en wordt door studenten voor bijna elke gelegenheid gebruikt.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vo',
    path: 'blog/begrippen/vo',
    category: 'Begrippen',
    title: 'Vo',
    excerpt: 'Vo is studentikoze afkorting voor bravo, gebruikt in plaats van applaudisseren.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vozen',
    path: 'blog/begrippen/vozen',
    category: 'Begrippen',
    title: 'Vozen',
    excerpt: 'Vozen is studentenslang voor zoenen en strelen.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vrijmibo',
    path: 'blog/begrippen/vrijmibo',
    category: 'Begrippen',
    title: 'Vrijmibo',
    excerpt: 'Vrijmibo (vrijdagmiddagborrel) is de borrel waarmee studenten of arbeiders de week afsluiten.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'vvv',
    path: 'blog/begrippen/vvv',
    category: 'Begrippen',
    title: 'VVV\'tje',
    excerpt: 'Een VVV\'tje (vriendje van vroeger) is een vriendschap van voor je studententijd.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'wegtikken',
    path: 'blog/begrippen/wegtikken',
    category: 'Begrippen',
    title: 'Wegtikken',
    excerpt: 'Wegtikken is het in hoog tempo wegwerken van biertjes.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'wingman',
    path: 'blog/begrippen/wingman',
    category: 'Begrippen',
    title: 'Wingman',
    excerpt: 'Een wingman helpt je tijdens het uitgaan aan een goed gesprek met iemand.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'x',
    path: 'blog/begrippen/x',
    category: 'Begrippen',
    title: 'X',
    excerpt: 'X betekent een digitaal kusje, of is de afkorting voor de drug xtc.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
  {
    slug: 'zeester',
    path: 'blog/begrippen/zeester',
    category: 'Begrippen',
    title: 'Zeester',
    excerpt: 'Zeester is een studententerm voor de passieve partij tijdens seks.',
    date: '2025-06-01',
    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',
    imageAlt: 'AnyTimerApp',
    variant: 'light'
  },
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

// Single source of truth for the A-Z letter used to group/filter a Begrippen
// post — used by both the /blog/begrippen index (grouping + filter pills)
// and each individual term page (the letter nav bar back to that filter).
export function firstLetterOf(post: BlogPost): string {
  const display = post.shortTitle || post.title;
  const letter = display.match(/[a-zA-Z]/);
  return letter ? letter[0].toUpperCase() : display.charAt(0).toUpperCase();
}

export const BEGRIPPEN_LETTERS: string[] = [...new Set(
  BLOG_POSTS.filter(p => p.category === 'Begrippen').map(firstLetterOf)
)].sort((a, b) => a.localeCompare(b, 'nl'));
