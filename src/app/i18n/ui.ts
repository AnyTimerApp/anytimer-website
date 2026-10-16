import { Lang } from './lang';
import type { BlogCategory, DrankspelSubCategory } from '../pages/blog/blog-posts.data';

// Short interface texts shared by both languages. Long article copy does not
// live here: every English article has its own component under pages/en/.
export interface UiStrings {
  lang: Lang;
  locale: string;
  // Absolute paths (leading slash, no trailing slash except home).
  paths: {
    home: string;
    blog: string;
    contact: string;
    privacy: string;
    terms: string;
    removeAccount: string;
    whatIsAnytimer: string;
    topDrinkingGames: string;
  };
  categoryLabels: Record<BlogCategory, string>;
  categorySlugs: Record<BlogCategory, string>;
  categoryBlurbs: Record<BlogCategory, string>;
  subCategoryLabels: Record<DrankspelSubCategory, string>;
  nav: {
    features: string;
    team: string;
    whatIsAnytimer: string;
    blog: string;
    showCategories: string;
    download: string;
  };
  footer: {
    brandText: string;
    followInstagram: string;
    followTiktok: string;
    features: string;
    howItWorks: string;
    faq: string;
    team: string;
    contact: string;
    blog: string;
    whatIsAnytimer: string;
    legal: string;
    privacy: string;
    terms: string;
    removeAccount: string;
    rights: string;
  };
  cookie: {
    aria: string;
    text: string;
    readMore: string;
    privacyLink: string;
    decline: string;
    accept: string;
  };
  cta: {
    free: string;
    download: string;
  };
  blog: {
    readMore: string;
    newBadge: string;
    featuredBadge: string;
    articles: string;
  };
  game: {
    type: string;
    players: string;
    duration: string;
    needs: string;
    similar: string;
    recommended: string;
  };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
}

const NL: UiStrings = {
  lang: 'nl',
  locale: 'nl_NL',
  paths: {
    home: '/',
    blog: '/blog',
    contact: '/contact',
    privacy: '/privacy',
    terms: '/terms',
    removeAccount: '/remove-account',
    whatIsAnytimer: '/wat-is-een-anytimer',
    topDrinkingGames: '/drankspellen'
  },
  categoryLabels: {
    Begrippen: 'Begrippen',
    Inspiratie: 'Inspiratie',
    Weetjes: 'Weetjes',
    Drankspelletjes: 'Drankspelletjes'
  },
  categorySlugs: {
    Begrippen: 'begrippen',
    Inspiratie: 'inspiratie',
    Weetjes: 'weetjes',
    Drankspelletjes: 'drankspelletjes'
  },
  categoryBlurbs: {
    Begrippen: 'Duidelijke uitleg van anytimer-begrippen.',
    Inspiratie: 'Ideeën voor een leuke avond met vrienden.',
    Weetjes: 'Handige tips en regels op een rij.',
    Drankspelletjes: 'Alle drankspelletjes uitgelicht.'
  },
  subCategoryLabels: {
    Kaartspel: 'Kaartspel',
    Dobbelspel: 'Dobbelspel',
    Behendigheid: 'Behendigheid',
    Overig: 'Overig'
  },
  nav: {
    features: 'Features',
    team: 'Team',
    whatIsAnytimer: 'Wat is een anytimer?',
    blog: 'Blog',
    showCategories: 'Categorieën tonen',
    download: 'Download'
  },
  footer: {
    brandText: 'De anytimer app. Houd anytimers onderling je vrienden gemakkelijk bij.',
    followInstagram: 'Volg AnyTimerApp op Instagram',
    followTiktok: 'Volg AnyTimerApp op TikTok',
    features: 'Features',
    howItWorks: 'Hoe het werkt',
    faq: 'FAQ',
    team: 'Team',
    contact: 'Contact',
    blog: 'Blog',
    whatIsAnytimer: 'Wat is een anytimer?',
    legal: 'Juridisch',
    privacy: 'Privacybeleid',
    terms: 'Gebruiksvoorwaarden',
    removeAccount: 'Account verwijderen',
    rights: 'Alle rechten voorbehouden.'
  },
  cookie: {
    aria: 'Cookiemelding',
    text: 'We gebruiken cookies om te zien hoe de site gebruikt wordt en om AnyTimerApp te verbeteren.',
    readMore: 'Lees meer in ons',
    privacyLink: 'privacybeleid',
    decline: 'Weigeren',
    accept: 'Accepteren'
  },
  cta: {
    free: 'Gratis te downloaden',
    download: 'Download de app'
  },
  blog: {
    readMore: 'Lees meer →',
    newBadge: 'Nieuw',
    featuredBadge: 'Uitgelicht',
    articles: 'artikelen'
  },
  game: {
    type: 'Categorie',
    players: 'Spelers',
    duration: 'Speelduur',
    needs: 'Benodigdheden',
    similar: 'Vergelijkbare drankspellen',
    recommended: 'Aanbevolen drankspellen'
  },
  notFound: {
    title: 'Dit rondje is van niemand.',
    text: 'De pagina die je zoekt bestaat niet of is verplaatst.',
    back: 'Terug naar home'
  }
};

const EN: UiStrings = {
  lang: 'en',
  locale: 'en_GB',
  paths: {
    home: '/en/',
    blog: '/en/blog',
    contact: '/en/contact',
    privacy: '/en/privacy',
    terms: '/en/terms',
    removeAccount: '/en/remove-account',
    whatIsAnytimer: '/en/blog/dictionary/what-is-an-anytimer',
    topDrinkingGames: '/en/blog/inspiration/best-drinking-games'
  },
  categoryLabels: {
    Begrippen: 'Dictionary',
    Inspiratie: 'Inspiration',
    Weetjes: 'Good to know',
    Drankspelletjes: 'Drinking games'
  },
  categorySlugs: {
    Begrippen: 'dictionary',
    Inspiratie: 'inspiration',
    Weetjes: 'good-to-know',
    Drankspelletjes: 'drinking-games'
  },
  categoryBlurbs: {
    Begrippen: 'Dutch student slang, explained in plain English.',
    Inspiratie: 'Ideas for a fun night with friends.',
    Weetjes: 'Handy tips and rules in one place.',
    Drankspelletjes: 'All our favourite drinking games.'
  },
  subCategoryLabels: {
    Kaartspel: 'Card game',
    Dobbelspel: 'Dice game',
    Behendigheid: 'Skill game',
    Overig: 'Other'
  },
  nav: {
    features: 'Features',
    team: 'Team',
    whatIsAnytimer: 'What is an anytimer?',
    blog: 'Blog',
    showCategories: 'Show categories',
    download: 'Download'
  },
  footer: {
    brandText: 'The anytimer app. Keep track of anytimers with your friends. Easy.',
    followInstagram: 'Follow AnyTimerApp on Instagram',
    followTiktok: 'Follow AnyTimerApp on TikTok',
    features: 'Features',
    howItWorks: 'How it works',
    faq: 'FAQ',
    team: 'Team',
    contact: 'Contact',
    blog: 'Blog',
    whatIsAnytimer: 'What is an anytimer?',
    legal: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    removeAccount: 'Delete account',
    rights: 'All rights reserved.'
  },
  cookie: {
    aria: 'Cookie notice',
    text: 'We use cookies to see how people use the site and to make AnyTimerApp better.',
    readMore: 'Read more in our',
    privacyLink: 'privacy policy',
    decline: 'Decline',
    accept: 'Accept'
  },
  cta: {
    free: 'Free to download',
    download: 'Download the app'
  },
  blog: {
    readMore: 'Read more →',
    newBadge: 'New',
    featuredBadge: 'Featured',
    articles: 'articles'
  },
  game: {
    type: 'Type',
    players: 'Players',
    duration: 'Duration',
    needs: 'What you need',
    similar: 'Similar drinking games',
    recommended: 'Recommended drinking games'
  },
  notFound: {
    title: 'Nobody ordered this round.',
    text: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home'
  }
};

export const UI: Record<Lang, UiStrings> = { nl: NL, en: EN };
