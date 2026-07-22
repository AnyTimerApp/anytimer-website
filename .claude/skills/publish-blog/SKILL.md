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
- Use "AnyTimerApp" (not "Anytimer") in SEO titles and any official branding text.

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

Every `<img>` needs a descriptive, keyword-relevant `alt` attribute (never empty, never
generic like "image1"). Write it as new supporting text: short, describes what's
actually in the image, and naturally includes the topic keyword where honest — no
keyword stuffing.

## 3. Create the component and maximize on-page SEO

New component under `src/app/pages/<slug>/`. SEO is not optional polish — every blog
page gets the full treatment below, in the constructor, matching the pattern already
used in e.g. `drankspellen.component.ts` and `wat-is-de-beste-adt-timer.component.ts`
(inject `Meta`, and `DOCUMENT` for the JSON-LD script):

- **`name: 'description'`** — unique meta description per article (~150-160 chars).
- **Open Graph**: `og:type` (`article` for blog posts), `og:url` (canonical
  `https://anytimer.app/<slug>/`), `og:title`, `og:description`, `og:image` (absolute
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
- The route `title` (set in step 5) and the meta description must match/reinforce each
  other and include the primary keyword near the front.
- Watch for Angular view-encapsulation quirks when overriding global classes inside the
  component: be explicit about layout properties (width/display/etc.) rather than
  relying on inherited global styles.

## 3b. Drankspelletjes: single-game info card

This only applies when the post is about **one single drinking game** and its category
is `Drankspelletjes` (not the multi-game "Top 10 drankspellen" listicle, which stays as
plain `h3`/`ul` sections — do not retrofit this onto that article). Concrete reference
implementation: `src/app/pages/jeu-de-bier/` (component, template, and scss) — copy its
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
from `src/app/pages/jeu-de-bier/jeu-de-bier.component.html` and
`jeu-de-bier.component.scss`** rather than retyping it — only swap the icon SVG paths if
a stat genuinely needs a different icon (unlikely; the same 3 icons — tag/users/clock —
cover every game's Categorie/Spelers/Speelduur).

**Never invent Categorie/Spelers/Speelduur/Benodigdheden values.** The user supplies
this data for each single-game post; if any of it is missing, ask rather than guess.

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

## 4. Internal linking

Add internal links to other relevant blog posts/pages, but link each distinct topic
only once per article — don't link the same target multiple times in one post.

## 5. Wire it into the app

- Register the route in `app.routes.ts`, with the SEO title/description data matching
  what's set in the component.
- Add an entry to the `BLOG_POSTS` array in `src/app/pages/blog/blog-posts.data.ts` so it
  shows on `/blog` — this is the single source of truth every other page reads from
  (see step 3c), so this is the ONLY place the post's category/date/image get typed in.
  The `BlogPost` shape requires:
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
- Add a `<url>` entry for the new route in `src/sitemap.xml`.

## 6. Verify

Run a build to catch template/route errors before handing back to the user:

```
npm run build
```

Fix any errors. If useful, `npm start` and check the new route renders correctly.

## 7. Stop here

Do not run `git add`, `git commit`, or `git push`. Summarize what was created/changed
(new files, routes, sitemap entry) and hand it back to the user to review, commit, and
push themselves. Pushing to `main` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yaml`) that builds and deploys to GitHub Pages
(anytimer.app) — that's their call to make.
