#!/usr/bin/env python3
"""
Neemt één batch begrippen (JSON, zie scripts/begrippen_batches/*.json) en
schrijft ze mechanisch weg naar de 4 plekken die voor elke Begrippen-pagina
moeten kloppen:

  1. BLOG_POSTS       (src/app/pages/blog/blog-posts.data.ts)
  2. BEGRIPPEN_CONTENT (src/app/pages/blog-term/begrippen-content.data.ts)
  3. routes           (src/app/app.routes.ts)
  4. sitemap          (src/sitemap.xml)

Zo hoeft het eigenlijke schrijfwerk (titel, korte uitleg, alinea's,
gerelateerde begrippen) maar op één plek (het batch-JSON-bestand) te
gebeuren; dit script houdt de 4 gegenereerde bestanden in sync.

Gebruik: python3 scripts/generate_begrippen_batch.py scripts/begrippen_batches/batch-01.json
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_POSTS_PATH = ROOT / "src/app/pages/blog/blog-posts.data.ts"
CONTENT_PATH = ROOT / "src/app/pages/blog-term/begrippen-content.data.ts"
ROUTES_PATH = ROOT / "src/app/app.routes.ts"
SITEMAP_PATH = ROOT / "src/sitemap.xml"

TODAY_BACKDATE = "2025-06-01"


def ts_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def build_blog_post_entry(term: dict) -> str:
    return (
        "  {\n"
        f"    slug: {ts_string(term['slug'])},\n"
        f"    path: {ts_string('blog/begrippen/' + term['slug'])},\n"
        "    category: 'Begrippen',\n"
        f"    title: {ts_string(term['title'])},\n"
        f"    excerpt: {ts_string(term['excerpt'])},\n"
        f"    date: {ts_string(TODAY_BACKDATE)},\n"
        "    image: 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp',\n"
        "    imageAlt: 'AnyTimerApp',\n"
        "    variant: 'light'\n"
        "  },\n"
    )


def build_content_entry(term: dict) -> str:
    paragraphs = ",\n      ".join(ts_string(p) for p in term["paragraphs"])
    related_terms = ", ".join(ts_string(s) for s in term.get("relatedTerms", []))
    related_posts = ", ".join(ts_string(s) for s in term.get("relatedPosts", []))
    lines = [f"  {ts_string(term['slug'])}: {{", "    paragraphs: [", f"      {paragraphs}", "    ]"]
    if related_terms:
        lines[-1] += ","
        lines.append(f"    relatedTerms: [{related_terms}]")
    if related_posts:
        if not related_terms:
            lines[-1] += ","
        else:
            lines[-1] += ","
        lines.append(f"    relatedPosts: [{related_posts}]")
    lines.append("  },\n")
    return "\n".join(lines)


def build_route_entry(term: dict) -> str:
    title = f"Wat betekent: {term['title']}? | AnyTimerApp"
    return (
        f"  {{ path: {ts_string('blog/begrippen/' + term['slug'])}, component: BlogTermComponent, "
        f"title: {ts_string(title)}, data: {{ slug: {ts_string(term['slug'])} }} }},\n"
    )


def build_sitemap_entry(term: dict) -> str:
    return (
        "  <url>\n"
        f"    <loc>https://anytimer.app/blog/begrippen/{term['slug']}/</loc>\n"
        f"    <lastmod>{TODAY_BACKDATE}</lastmod>\n"
        "    <changefreq>yearly</changefreq>\n"
        "    <priority>0.5</priority>\n"
        "  </url>\n"
    )


def insert_before(path: Path, marker: str, block: str):
    text = path.read_text(encoding="utf-8")
    if marker not in text:
        raise SystemExit(f"Marker not found in {path}: {marker!r}")
    text = text.replace(marker, block + marker, 1)
    path.write_text(text, encoding="utf-8")


def main():
    if len(sys.argv) != 2:
        raise SystemExit("Gebruik: generate_begrippen_batch.py <batch.json>")

    batch = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))

    blog_posts_block = "".join(build_blog_post_entry(t) for t in batch)
    content_block = "".join(build_content_entry(t) for t in batch)
    routes_block = "".join(build_route_entry(t) for t in batch)
    sitemap_block = "".join(build_sitemap_entry(t) for t in batch)

    # NOTE: these markers must stay unique within their file — "];" alone
    # also matches earlier const arrays in blog-posts.data.ts, so anchor on
    # the distinctive comment that immediately follows the BLOG_POSTS array.
    insert_before(BLOG_POSTS_PATH, '];\n\n// Fixed "always recommended" picks', blog_posts_block)
    insert_before(CONTENT_PATH, "};", content_block)
    insert_before(ROUTES_PATH, "  { path: '**',", routes_block)
    insert_before(SITEMAP_PATH, "</urlset>", sitemap_block)

    print(f"Verwerkt: {len(batch)} begrippen uit {sys.argv[1]}")


if __name__ == "__main__":
    main()
