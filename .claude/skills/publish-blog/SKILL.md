---
name: publish-blog
description: >
  Use this skill whenever the user gives you a blog article/text and asks to publish it,
  add it to the site, or put it on the blog. Trigger phrases include "publish this blog",
  "add this article", "put this on the blog", "here's a new blog post", or when the user
  pastes/attaches blog content for the AnyTimerApp website and wants it live. This skill
  wires a raw article into the Angular site (component, route, blog list, SEO, sitemap,
  internal links) following this project's established conventions. It does NOT run any
  git commands — the user always reviews and commits/pushes themselves.
---

# Publish Blog (AnyTimerApp website)

Turns a raw blog article the user gives you into a fully wired-up page on this Angular
SSR site, following the exact conventions already used across the codebase. Stops before
any git action — the user commits and pushes manually.

## 0. Before starting

- Never rewrite, reorganize, shorten, or "improve" the article text the user provides.
  Use it exactly as given. Only generate *new* supporting text where none exists (meta
  title/description, image alt text, internal-link anchor text).
- Any new text you do write follows this project's writing style: no em-dashes, short
  punctual sentences, few commas.
- Use "AnyTimerApp" (not "Anytimer") in official branding text. Never end a meta title, route title or og:title with "| AnyTimerApp".

## 1. Pick a slug and inspect an existing blog component first

Before writing anything, open one or two existing components under `src/app/pages/`
(e.g. an existing blog article page) and copy their HTML/CSS structure and the
`.scss` conventions. Do not invent new styles or layout patterns — reuse what's there.

Every blog `.scss` file needs `h3` styles and a `.game-image` style for visual
consistency with the rest of the blog.

## 2. Images

Put any images in `src/assets/blogs/<folder-name>/`. Reference them with `<picture>`
tags, `style="display: contents"` on the `<picture>`, and `class="game-image"` on the
`<img>`.

### Image checklist (new post, or an image added later to an existing post)

The user usually drops only a `.png` into `src/assets/blogs/<folder>/`. Then do all of:

1. **WebP**: `cwebp -quiet -q 80 "<name>.png" -o "<name>.webp"` next to the png
   (gives ~100-220 KB, same as the existing images). If the user added several
   variants, use the newest one and mention the others.
2. **Top image** in the post: `<picture>` with the `.webp` `<source>` and the `.png`
   `<img class="game-image" loading="eager" fetchpriority="high">`, directly under the
   first `<h2>`.
3. **SEO image** in the component: `og:image` / `twitter:image` / JSON-LD `image` use
   the absolute `.png` URL; set `og:image:width`/`height` to the real size
   (`sips -g pixelWidth -g pixelHeight`) and `og:image:alt`.
4. **Blog cards**: `image` (the `.webp`) and `imageAlt` on the post's `BLOG_POSTS`
   entry. Every card (/blog, category page, Vergelijkbare/Aanbevolen sliders, home
   blog rows) reads from there.
5. **Home "Drankspellen in de app" grid**: if the game is one of the app games in
   `src/app/pages/home/games/games.component.ts`, set its `image`/`imageAlt` there too.
6. Remove any temporary placeholder image (e.g. `assets/Together.*`) the post used.

Every `<img>` needs a descriptive, keyword-relevant `alt` attribute (never empty, never
generic like "image1"). Write it as new supporting text: short, describes what's
actually in the image, and naturally includes the topic keyword where honest — no
keyword stuffing.

## 3. Create the component and maximize on-page SEO

New component under `src/app/pages/blogs/<category-folder>/<slug>/` (e.g.
`src/app/pages/blogs/drankspelletjes/<slug>/` — the folder groups by category, matching
`CATEGORY_SLUGS`). SEO is not optional polish — every blog
page gets the full treatment below, in the constructor, matching the pattern already
used in e.g. `drankspellen.component.ts` and `wat-is-de-beste-adt-timer.component.ts`
(inject `Meta`, and `DOCUMENT` for the JSON-LD script):

- **`name: 'description'`** — unique meta description per article (~150-160 chars).
- **Open Graph**: `og:type` (`article` for blog posts), `og:url` (canonical
  `https://anytimer.app/blog/<category-slug>/<slug>/` — see step 5 for the URL scheme),
  `og:title`, `og:description`, `og:image` (absolute
  URL), `og:image:alt`, `og:site_name` (`AnyTimerApp`), `og:locale` (`nl_NL`). For
  articles also set `article:published_time` (ISO date) if the user gives one.
- **Twitter Card**: `twitter:card` (`summary_large_image`), `twitter:title`,
  `twitter:description`, `twitter:image`.
- **JSON-LD structured data**: inject a `<script type="application/ld+json">` (guard
  with `document.getElementById` like the home/contact components do) using
  `@type: 'BlogPosting'` with `headline`, `description`, `image`, `datePublished` (if
  known), `author` (Organization: AnyTimerApp), `mainEntityOfPage` set to the article
  URL.
- Canonical `<link>` tags are handled globally per-route by `app.component.ts` —
  nothing to add manually for that.
- The route `title` (set in step 5) and the component's `title` (og:title, twitter:title,
  schema headline) must be the exact same string. Include the primary keyword near the front.
- **Fixed title patterns** (sentence case, `:` as separator, no ` - `, no `&`, no brand
  suffix, max 60 characters):
  - Drankspel (NL): `{Naam} regels: zo speel je het drankspel`
  - Drinking game (EN): `{Name} rules: how to play the drinking game`
  - Begrip / dictionary term: built automatically by `src/app/shared/term-seo-title.ts`
    (`{Term} betekenis: wat betekent {term}?` / `{Term} meaning: what does {term} mean?`).
    The Dutch route titles in `app.routes.ts` are static strings following that same rule.
  - Other articles: a question or topic, then `:` or `?` and a short clarification,
    e.g. `Wat is een adtje? Betekenis en regels`.
- Meta descriptions explain directly and clearly (what it is, how it works). No
  click-bait teasers. Max 160 characters.
- Watch for Angular view-encapsulation quirks when overriding global classes inside the
  component: be explicit about layout properties (width/display/etc.) rather than
  relying on inherited global styles.

## 3b. Drankspelletjes: single-game info card

This only applies when the post is about **one single drinking game** and its category
is `Drankspelletjes` (not the multi-game "Top 10 drankspellen" listicle, which stays as
plain `h3`/`ul` sections — do not retrofit this onto that article). Concrete reference
implementation: `src/app/pages/blogs/drankspelletjes/jeu-de-bier/` (component, template, and scss) — copy its
`.game-info-card` block directly rather than re-deriving it.

For a dedicated single-game post, place a "quick facts" info card right after the
opening `<picture>`, before the descriptive body text, showing **Categorie** (one of
`Kaartspel`, `Dobbelspel`, `Behendigheid`, `Overig` — see
[[drankspellen_subcategories_plan]]), **Spelers**, **Speelduur**, and **Benodigdheden**
together in one visually distinct block instead of a plain bullet list.

The card is a white bordered box (`.game-info-card`) with 3 stat columns side by side
(`.game-info-card__stats` → `.game-stat`, separated by a thin vertical divider —
`border-right` on each stat except the last). Each stat has a small stroke icon
**inline with its label** on one line (`.game-stat__label-row` → svg + `.game-stat__label`,
muted/grey text), then the bold value on the line below (`.game-stat__value`, dark,
larger). Icon size, label/value font-size, and padding all use `clamp()` (not a fixed
breakpoint) so the 3 columns scale fluidly and stay side by side at every screen width
instead of stacking. Below the stats, a full-width `.game-info-card__divider`, then
`.game-info-card__requirements`: the "Benodigdheden" label gets the same inline-icon
treatment as the 3 stats above (`.game-stat__label-row` → svg + label), followed by
`.game-tags` pills — **but the pills themselves stay icon-free**, plain text only.
**Copy the exact markup and CSS straight
from `src/app/pages/blogs/drankspelletjes/jeu-de-bier/jeu-de-bier.component.html` and
`jeu-de-bier.component.scss`** rather than retyping it — only swap the icon SVG paths if
a stat genuinely needs a different icon (unlikely; the same 3 icons — tag/users/clock —
cover every game's Categorie/Spelers/Speelduur).

**Never invent Categorie/Spelers/Speelduur/Benodigdheden values.** The user supplies
this data for each single-game post; if any of it is missing, ask rather than guess.

**Store the Categorie value in `BLOG_POSTS`, not just in the template.** The game-type
stat (`Kaartspel`/`Dobbelspel`/`Behendigheid`/`Overig`) is a real data field —
`subCategory` on the post's `BlogPost` entry in
`src/app/pages/blog/blog-posts.data.ts` (type `DrankspelSubCategory`, exported list
`DRANKSPEL_SUBCATEGORIES`) — not a string typed directly into the `.html`. The
component reads it back (`readonly subCategory = this.post.subCategory!;`, see
`jeu-de-bier.component.ts`) and the template binds
`<span class="game-stat__value">{{ subCategory }}</span>`. This is the same
single-source-of-truth reasoning as step 3c's top-level `category` — it's what makes a
future "filter by game type" feature possible without hunting through every post's
template to collect the values.

## 3c. Category & breadcrumbs — single source of truth

Every post's category must be **read from `BLOG_POSTS`**, never hardcoded as a separate
string literal anywhere else in the component. This is not optional style preference —
it's fixing a real bug: the category used to be typed out independently in the
template's `<span class="section-label">` and in a `breadcrumbs` array, and 5 of the 8
existing posts drifted out of sync with stale category names (some weren't even valid
categories anymore, e.g. "Regels", "Tips", "Huisavond" left over from before the
4-category system existed). One field, sourced from one place, fixes this permanently.

Pattern (copy from any existing post, e.g. `jeu-de-bier.component.ts`/`.html`):

```ts
import { BLOG_POSTS, CATEGORY_SLUGS } from '../blog/blog-posts.data';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbItem, injectBreadcrumbSchema } from '../../shared/breadcrumb-schema';

@Component({
  ...
  imports: [RouterLink, BreadcrumbsComponent]
})
export class XComponent {
  readonly category = BLOG_POSTS.find(p => p.slug === '<slug>')!.category;

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Blog', url: '/blog' },
    { label: this.category, url: `/blog/${CATEGORY_SLUGS[this.category]}` },
    { label: '<Post title>' }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    ...
    injectBreadcrumbSchema(document, 'schema-breadcrumbs-<slug>', this.breadcrumbs);
    ...
  }
}
```

- Template: `<span class="section-label">{{ category }}</span>` — never a hardcoded
  category name — and `<app-breadcrumbs [items]="breadcrumbs"></app-breadcrumbs>` placed
  inside `.container`, right before `.legal-header`.
- This requires `DOCUMENT` injected (same as the `BlogPosting` JSON-LD in step 3, if the
  post has one — reuse the same injection, don't inject it twice).
- The category set here is what shows on the post itself AND what appears in the
  breadcrumb trail — but `BLOG_POSTS`' `category` field (in
  `src/app/pages/blog/blog-posts.data.ts`) is still the actual source of truth. If the
  category needs to change, change it there; this component reads it, it doesn't own it.

## 3d. Drankspelletjes: Vergelijkbare & Aanbevolen drankspellen

Same scope as 3b — single-game Drankspelletjes posts only, not the top-10 listicle. Every
single-game post ends with two more blocks, placed after the internal-link paragraph
("Op zoek naar meer drankspellen? ...") and before `<app-download-cta>`:

```html
      <div class="legal-section legal-section--no-divider">
        <h2>Vergelijkbare drankspellen</h2>
        <div class="related-slider">
          @for (game of similarGames; track game.slug) {
            <app-blog-card [post]="game"></app-blog-card>
          }
        </div>
      </div>

      <div class="legal-section">
        <h2>Aanbevolen drankspellen</h2>
        <div class="related-slider">
          @for (game of recommendedGames; track game.slug) {
            <app-blog-card [post]="game"></app-blog-card>
          }
        </div>

        <app-download-cta></app-download-cta>
      </div>
```

Copy this straight from `src/app/pages/blogs/drankspelletjes/jeu-de-bier/jeu-de-bier.component.html`
rather than retyping it. Note the first section carries the extra
`legal-section--no-divider` class so the two recommendation blocks flow together without a
divider line between them.

**`<app-blog-card>` is a shared component** (`src/app/components/blog-card/blog-card.component`) —
it renders a post exactly like a `.blog-card` on `/blog` (same size, same equal-height-row
behavior). Its container styling (`.related-slider`, the mobile horizontal-slider behavior,
`.legal-section--no-divider`) lives once in `src/app/pages/blogs/blog-article-shared.scss`,
already in every blog component's `styleUrls` — there is nothing to add there for a new post.

In the component, add the import and two fields (copy from `jeu-de-bier.component.ts`):

```ts
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BLOG_POSTS, CATEGORY_SLUGS, getSimilarGames, getRecommendedGames } from '../../../blog/blog-posts.data';

@Component({
  ...
  imports: [RouterLink, BreadcrumbsComponent, DownloadCtaComponent, BlogCardComponent]
})
export class XComponent {
  private readonly post = BLOG_POSTS.find(p => p.slug === '<slug>')!;
  readonly subCategory = this.post.subCategory!;

  readonly similarGames = getSimilarGames(this.post);
  readonly recommendedGames = getRecommendedGames(this.post);
  ...
```

`getSimilarGames`/`getRecommendedGames` live in `blog-posts.data.ts` — nothing to
reimplement per post:

- **`getRecommendedGames`** is a fixed, hand-picked list (currently De Paardenrace, Mario
  Barf, Ring of fire) shown identically on every single-game post. If the current post IS
  one of those three, that slot is swapped for a fallback (currently Bussen) so a post
  never recommends itself. This is intentionally hardcoded, not derived — if the "always
  recommended" set or the fallback ever needs to change, edit the `RECOMMENDED_SLUGS` /
  `RECOMMENDED_FALLBACK_SLUG` constants there, once, rather than touching every post.
- **`getSimilarGames`** picks 3 other single-game posts, same `subCategory` first
  (newest `date` first), topped up from other subcategories if fewer than 3 exist in the
  same one. It automatically excludes the post itself and whatever `getRecommendedGames`
  already returned for that post, so nothing repeats across the two blocks on one page.

A brand-new post needs no special-casing here — adding it to `BLOG_POSTS` (step 5) with the
right `subCategory` is enough for both functions to pick it up correctly on every other
post's "Vergelijkbare" block, and for it to get its own correct pair of blocks.

## 4. Internal linking

Add internal links to other relevant blog posts/pages, but link each distinct topic
only once per article — don't link the same target multiple times in one post.

## 5. Wire it into the app

- **URL scheme**: every new post's route mirrors its breadcrumb trail —
  `blog/<category-slug>/<post-slug>` (e.g. `blog/drankspelletjes/jeu-de-bier`), never a
  flat top-level path like `<post-slug>` on its own. `<category-slug>` is the value from
  `CATEGORY_SLUGS` for the post's category. This is deliberate: the URL should
  communicate the site's Blog / Category / Title structure the same way the breadcrumbs
  already do. (A handful of older posts still live at flat legacy paths from before this
  convention — leave those alone, see the note below on changing an existing URL.)
- Register the route in `app.routes.ts` with that nested path, with the SEO
  title/description data matching what's set in the component.
- Add an entry to the `BLOG_POSTS` array in `src/app/pages/blog/blog-posts.data.ts` so it
  shows on `/blog` — this is the single source of truth every other page reads from
  (see step 3c), so this is the ONLY place the post's category/date/image get typed in.
  The `BlogPost` shape requires:
  - `path` — the exact route path registered above (`blog/<category-slug>/<post-slug>`,
    no leading/trailing slash). Every internal link to a post (`blog.component.html`,
    `blog-category.component.html`, the `ItemList` JSON-LD in
    `blog-category.component.ts`) builds the link from `post.path`, not `post.slug` — so
    this field is what actually makes the post reachable/linked correctly. `slug` still
    exists separately as the component folder name / route leaf segment.
  - `date` — ISO `yyyy-mm-dd`, today's date unless the user says otherwise. The blog
    page sorts posts by this field and **automatically** gives the newest-dated post the
    full-width "Nieuw" hero treatment — there is no manual `featured` flag to set. The
    one exception: **`Drankspelletjes` posts are never featured**, no matter how new —
    `featuredPost` skips them and picks the newest non-`Drankspelletjes` post instead.
    Nothing to do for either behavior except set `date`/`category` correctly.
  - `image` / `imageAlt` — the thumbnail shown on the card and in the hero if it's
    newest. Reuse the same image/alt already chosen as the `og:image` in step 3.
  - `category` — must be one of the values in `BLOG_CATEGORIES` exported from
    `blog-posts.data.ts` (currently `Begrippen`, `Inspiratie`, `Weetjes`,
    `Drankspelletjes`). Pick the best existing fit; don't invent a new category without
    asking the user first — the type is a literal union, so a wrong value fails the
    build. This is the value step 3c's `category` field reads back — set it once here.
- Add a `<url>` entry for the new route in `src/sitemap.xml`, matching `path` above.

### Changing an existing, already-published post's URL

Do this rarely and deliberately — moving a page that already gets search traffic risks a
real (if usually temporary) ranking dip for what's often a cosmetic gain, so only do it
when the user explicitly asks for a specific post.

This site is a static prerendered Angular build on plain GitHub Pages (Porkbun DNS,
directly to GitHub's IPs — no Cloudflare/Netlify/Vercel proxy in front), which has **no
server-side redirect capability**. There is no 301, and no redirect mechanism has been
built for this (confirmed with the user directly). Moving a post's route path means its
old URL simply stops resolving. If real redirects are ever needed, that requires an
infrastructure change (e.g. putting Cloudflare in front of the domain) — flag that to the
user rather than trying to fake it with a client-side redirect unless they've explicitly
asked for one.

To move a post: update its `path` in `BLOG_POSTS`, update the route in `app.routes.ts`,
update the post component's own hardcoded `url` (og:url + JSON-LD `mainEntityOfPage`),
and update its `<loc>` in `src/sitemap.xml` — canonical/hreflang need no changes, they're
derived automatically from the live URL in `app.component.ts`.

## 6. Verify

Run a build to catch template/route errors before handing back to the user:

```
npm run build
```

Fix any errors. If useful, `npm start` and check the new route renders correctly.

## 6b. English counterpart

Every change to the Dutch site must also be made on the English site (`/en/`),
translated automatically. The English site targets internationals studying in the
Netherlands. Translate localized, not literally (e.g. "huisavond" is "a night in with
your housemates", not "housenight"), with English slugs/titles chosen for English
search intent.

**How the English site is wired** (no `@angular/localize`, one build):

- `src/app/i18n/`: `lang.ts`, `language.service.ts` (language follows the URL, sets
  `<html lang>`), `ui.ts` (short UI strings, EN category labels/slugs, paths) and
  `alternates.ts` (the NL ↔ EN page pairs, used for hreflang, the navbar switcher and
  the sitemap). Hreflang, canonical and `og:locale` are set globally in
  `app.component.ts`. Don't set `og:locale` in a component.
- English posts live in `BLOG_POSTS_EN` (`src/app/pages/blog/blog-posts.en.data.ts`),
  same shape as `BLOG_POSTS` plus `alternate` = the Dutch post's `path`. `category` and
  `subCategory` keep the Dutch keys. The English labels come from `UI.en`.
  `getSimilarGames`/`getRecommendedGames` pick the right language from the post's path.
  `getPostsBySlug(slugs, 'en')` for hand-picked lists.
- English components live under `src/app/pages/en/` (e.g.
  `src/app/pages/en/blogs/drinking-games/<slug>/`). Copy the Dutch markup, point
  `styleUrls` at the Dutch component's `.scss` (no new styles), and use
  `applyArticleSeo()` from `src/app/shared/article-seo.ts` for meta, Open Graph,
  BlogPosting (with `inLanguage: 'en'`) and breadcrumbs. Reference:
  `src/app/pages/en/blogs/drinking-games/rage-cage/`.
- Routes go in `src/app/app.routes.en.ts` with `data: EN`. EN category slugs:
  `dictionary`, `inspiration`, `good-to-know`, `drinking-games`.
- After adding the EN page run `python3 scripts/sitemap_alternates.py`. It adds the EN URL
  to `src/sitemap.xml` and writes the `xhtml:link` alternates for both pages.
- Internal links on an English page only point to English pages.

**Dictionary terms (begrippen).** Every Dutch term page has an English twin under
`/en/blog/dictionary/<slug>`. Adding a Dutch term means adding the English one too:
add an entry to a batch in `scripts/begrippen_batches/en/` and run
`python3 scripts/build_dictionary_en.py` (writes `dictionary.en.data.ts` and
`begrippen-content.en.data.ts`; routes are generated from the data), then
`python3 scripts/sitemap_alternates.py`. Rules per term:
- English term or abbreviation of an English phrase (rizz, FOMO): translate, same slug.
- Real Dutch student word (feut, adten, borrel): keep the Dutch title and slug, set
  `"origin": "dutch"` (or `"flemish"` for Belgian words like kot). The page then shows the
  "Dutch student slang" label. Write the example sentence in English with the Dutch word
  in it, and mention the English equivalent where there is one.
- Plain Dutch word that already has an English page with the same meaning (kater =
  hangover): `{"nl": "kater", "skip": "hangover"}`, no English page.
- Rewrite into natural English sentences in the house style; don't translate word by word.
- A Dutch verb phrase used inside an English sentence follows English word order:
  "you have to trek a bak", not "you have to bak trekken".

**Drinking game names.** Use the international name only when the game has the same
rules internationally (checked online): e.g. Stress Pong → Rage Cage, Mexen → Mexico,
Bussen → Ride the Bus, Paardenrace → Horse Race, Kusje geven → Suck and Blow, Stef
Stuntpiloot → Looping Louie, Mario Barf → Beerio Kart, Vingeren → Fingers. Mention the
Dutch name once in the intro ("In the Netherlands it's called ...") and add both names to
`game.alternateName` in `applyArticleSeo`. No real international equivalent? Keep the
Dutch name and call it "a Dutch drinking game" in the intro and description (Kingsen,
Bakplaten, Mijnenveld, Jeu de bier, Trek je Bak Mania). App games use the names from the
English app: Boze bak → Angry Mug, Kamelenrace → Camel Race, Dobbelen → Dice.

**Title pattern.** Always `{Name} rules: how to play the drinking game`, for international
and Dutch names alike. Fun fact sentence: "Did
you know you can play {Game} in our free app?" (links to `/en/`).

**Term base** (keep translations consistent):

| NL | EN |
|---|---|
| drankspel | drinking game |
| spelregels / speluitleg | rules / how to play |
| slok / slokken uitdelen | sip / hand out sips |
| een bak trekken | down your drink (explain "bak" where the Dutch name uses it) |
| adtje / atten | adtje, explained once as downing your drink in one go (a chug) |
| anytimer / any | anytimer / any (never translated) |
| een anytimer inzetten | use an anytimer (never "cash in") |
| huisavond | night in with your housemates |
| studentenhuis / huisgenoot | student house / housemate |
| studentenvereniging | student association |
| dispuut, jaarclub, sjaars, feut | stay Dutch, with a short explanation |
| plaatje / aas | face card / ace |
| Categorie / Spelers / Speelduur / Benodigdheden | Type / Players / Duration / What you need |
| Kaartspel / Dobbelspel / Behendigheid / Overig | Card game / Dice game / Skill game / Other |

Same writing style as Dutch: short punchy sentences mixed with a longer one, simple
words, fun to read, no em-dashes, British spelling. Copy info card values 1:1.

## 7. Stop here

Do not run `git add`, `git commit`, or `git push`. Summarize what was created/changed
(new files, routes, sitemap entry) and hand it back to the user to review, commit, and
push themselves. Pushing to `main` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yaml`) that builds and deploys to GitHub Pages
(anytimer.app) — that's their call to make.
