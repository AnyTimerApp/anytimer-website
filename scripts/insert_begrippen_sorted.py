#!/usr/bin/env python3
"""
Voegt één of meer nieuwe begrippen-batches (JSON, zie scripts/begrippen_batches/)
alfabetisch in op de 4 plekken die voor elke Begrippen-pagina moeten kloppen:

  1. BLOG_POSTS        (src/app/pages/blog/blog-posts.data.ts)
  2. BEGRIPPEN_CONTENT (src/app/pages/blog-term/begrippen-content.data.ts)
  3. routes            (src/app/app.routes.ts)
  4. sitemap           (src/sitemap.xml)

Anders dan generate_begrippen_batch.py (dat achteraan toevoegt) zet dit script
elk begrip op zijn alfabetische plek, en legt het meteen inline links naar
andere begrippen (zelfde logica als inline_link_begrippen.py). Bestaande
begrippen worden niet aangeraakt.

Gebruik:
  python3 scripts/insert_begrippen_sorted.py --preview batch.json [...]   # alleen links tonen
  python3 scripts/insert_begrippen_sorted.py batch.json [...]             # echt invoegen
"""
import json
import re
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate_begrippen_batch as G  # noqa: E402
import inline_link_begrippen as L  # noqa: E402

# Begrip-titels die ook als gewoon woord in lopende tekst voorkomen en dan
# naar het verkeerde begrip zouden linken (bv. "X" het platform -> begrip xtc).
L.AUTO_LINK_BLOCKLIST |= {
    "trekken", "x", "thuis", "bal",
    "sober", "wild", "ratio", "her", "fire", "bits", "matras",
}

SITEMAP_DATE = date.today().isoformat()


def content_block(e, targets):
    related = e.get("relatedTerms", []) + e.get("relatedPosts", [])
    paragraphs = L.linkify(e["slug"], e["paragraphs"], related, targets)
    return (
        "  " + G.ts_string(e["slug"]) + ": {\n    paragraphs: [\n      "
        + ",\n      ".join(G.ts_string(p) for p in paragraphs)
        + "\n    ]\n  },\n"
    )


def route_block(e):
    return (
        f"  {{ path: {G.ts_string('blog/begrippen/' + e['slug'])}, component: BlogTermComponent, "
        f"title: {G.ts_string('Wat betekent: ' + e['title'] + '?')}, data: {{ slug: {G.ts_string(e['slug'])} }} }},\n"
    )


def sitemap_block(e):
    return G.build_sitemap_entry(e).replace(G.TODAY_BACKDATE, SITEMAP_DATE)


def insert_sorted(path, entry_re, entries, block_for, end_marker):
    text = path.read_text(encoding="utf-8")
    for e in entries:
        slug = e["slug"]
        if re.search(entry_re(re.escape(slug)), text):
            raise SystemExit(f"{slug} staat al in {path}")
        pos = next((m.start() for m in re.finditer(entry_re(r"([a-z0-9-]+)"), text) if m.group(1) > slug), None)
        if pos is None:
            # Komt alfabetisch na het laatste begrip: achteraan, vlak voor de
            # eindmarker (dezelfde markers als generate_begrippen_batch.py).
            pos = text.rindex(end_marker)
        text = text[:pos] + block_for(e) + text[pos:]
    path.write_text(text, encoding="utf-8")


def main():
    args = sys.argv[1:]
    preview = "--preview" in args
    files = [a for a in args if a != "--preview"]
    if not files:
        raise SystemExit(__doc__)

    targets = L.build_all_targets(L.load_entries())
    new = [e for f in files for e in json.loads(Path(f).read_text(encoding="utf-8"))]

    if preview:
        for e in new:
            block = content_block(e, targets)
            print(e["slug"], "=>", re.findall(r'<a href="([^"]+)">([^<]+)</a>', block))
        return

    insert_sorted(G.BLOG_POSTS_PATH, lambda s: r"  \{\n    slug: '" + s + r"',\n    path: 'blog/begrippen/", new, G.build_blog_post_entry, '];\n\n// Fixed "always recommended" picks')
    insert_sorted(G.CONTENT_PATH, lambda s: r"  '" + s + r"': \{\n", new, lambda e: content_block(e, targets), "};")
    insert_sorted(G.ROUTES_PATH, lambda s: r"  \{ path: 'blog/begrippen/" + s + r"', component: BlogTermComponent", new, route_block, "  { path: '**',")
    insert_sorted(G.SITEMAP_PATH, lambda s: r"  <url>\n    <loc>https://anytimer\.app/blog/begrippen/" + s + r"/</loc>", new, sitemap_block, "</urlset>")
    print(f"Ingevoegd: {len(new)} begrippen")


if __name__ == "__main__":
    main()
