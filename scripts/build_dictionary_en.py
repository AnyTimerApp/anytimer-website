#!/usr/bin/env python3
"""
Bouwt de Engelse dictionary (/en/blog/dictionary/<slug>) uit de batches in
scripts/begrippen_batches/en/*.json en schrijft:

  1. src/app/pages/blog/dictionary.en.data.ts            (DICTIONARY_POSTS_EN)
  2. src/app/pages/blog-term/begrippen-content.en.data.ts (BEGRIPPEN_CONTENT_EN)

Routes hoeven niet: app.routes.en.ts maakt ze uit DICTIONARY_POSTS_EN.
Draai daarna scripts/sitemap_alternates.py voor de sitemap.

Batch-entry (één per Nederlands begrip):
  {"nl": "feut", "slug": "feut", "title": "Feut", "origin": "dutch",
   "excerpt": "...", "example": "...", "text": "...", "related": ["sjaars"]}
  - origin: "dutch" / "flemish" voor begrippen die Nederlands blijven, anders weglaten.
  - Overslaan (geen EN-pagina, bv. kater = hangover): {"nl": "kater", "skip": "hangover"}

Links: eerst de gekozen `related` begrippen (als ze letterlijk in de tekst staan,
anders één afsluitende zin), daarna Nederlandse begrippen die letterlijk in de
tekst staan. Engelse begrippen worden niet automatisch gelinkt, want dat zijn
vaak gewone woorden (real, fire, dead). Elk begrip hooguit één keer per pagina.

Gebruik:  python3 scripts/build_dictionary_en.py
"""
import glob
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BATCH_GLOB = str(ROOT / 'scripts/begrippen_batches/en/*.json')
POSTS_OUT = ROOT / 'src/app/pages/blog/dictionary.en.data.ts'
CONTENT_OUT = ROOT / 'src/app/pages/blog-term/begrippen-content.en.data.ts'
NL_CONTENT = ROOT / 'src/app/pages/blog-term/begrippen-content.data.ts'

DATE = '2025-06-01'  # same backdate as the Dutch begrippen
IMAGE = 'assets/blogs/wat is een anytimer/Wat is een anytimer cover.webp'
MAX_AUTO_LINKS = 4

EXTRA_TARGETS = {
    'what-is-an-anytimer': ('anytimer', 'en/blog/dictionary/what-is-an-anytimer'),
    'what-is-an-adtje': ('adtje', 'en/blog/dictionary/what-is-an-adtje'),
    # Drinking game pages that dictionary entries refer to.
    'kingsen': ('Kingsen', 'en/blog/drinking-games/kingsen'),
}

# Dutch titles that are also everyday English (or too short) to auto-link.
AUTO_LINK_BLOCKLIST = {'bal', 'her', 'super', 'medium', 'das', 'bij', 'extern', 'loca', 'louter',
                       'student', 'semester', 'regenjas', 'bits', 'matras', 'riet', 'nul', 'maat'}


def ts(value):
    return "'" + value.replace('\\', '\\\\').replace("'", "\\'") + "'"


def is_acronym(text):
    letters = re.sub(r'[^a-zA-ZÀ-ÿ]', '', text)
    return bool(letters) and letters.upper() == letters and len(letters) > 1


def anchor(title):
    return title if is_acronym(title) else title[0].lower() + title[1:]


def mask(text):
    return re.sub(r'<a [^>]*>.*?</a>', lambda m: ' ' * len(m.group(0)), text)


def place(paragraphs, anchor_text, href):
    flags = 0 if is_acronym(anchor_text) else re.IGNORECASE
    pattern = re.compile(r'(?<![\w-])' + re.escape(anchor_text) + r'(?![\w-])', flags)
    for i, p in enumerate(paragraphs):
        m = pattern.search(mask(p))
        if m:
            paragraphs[i] = p[:m.start()] + f'<a href="{href}">{p[m.start():m.end()]}</a>' + p[m.end():]
            return True
    return False


def load():
    entries, skipped = [], []
    for f in sorted(glob.glob(BATCH_GLOB)):
        for e in json.loads(Path(f).read_text(encoding='utf-8')):
            (skipped if 'skip' in e else entries).append(e)
    return entries, skipped


def check(entries, skipped):
    errors = []
    slugs = [e['slug'] for e in entries]
    dupes = {s for s in slugs if slugs.count(s) > 1}
    if dupes:
        errors.append(f'dubbele slugs: {sorted(dupes)}')
    nl_done = [e['nl'] for e in entries] + [e['nl'] for e in skipped]
    nl_all = re.findall(r"^  '([^']+)': \{", NL_CONTENT.read_text(encoding='utf-8'), re.M)
    unknown = sorted(set(nl_done) - set(nl_all))
    if unknown:
        errors.append(f'onbekende NL-slugs: {unknown}')
    for e in entries:
        for field in ('title', 'excerpt', 'example', 'text'):
            if not e.get(field):
                errors.append(f'{e["slug"]}: {field} ontbreekt')
            elif re.search('[–—]', e[field]):
                errors.append(f'{e["slug"]}: gedachtestreepje in {field}')
        if e.get('origin') not in (None, 'dutch', 'flemish'):
            errors.append(f'{e["slug"]}: onbekende origin {e.get("origin")}')
    todo = sorted(set(nl_all) - set(nl_done))
    return errors, todo


def build(entries):
    targets = {e['slug']: (anchor(e['title']), f'en/blog/dictionary/{e["slug"]}') for e in entries}
    dutch = {e['slug'] for e in entries if e.get('origin')}
    all_targets = {**EXTRA_TARGETS, **targets}
    contents = {}
    for e in entries:
        paragraphs = [e['example'], e['text']]
        linked = set()
        related = [r for r in e.get('related', []) if r in all_targets and r != e['slug']]
        for r in related:
            a, path = all_targets[r]
            if place(paragraphs, a, f'/{path}/'):
                linked.add(r)
        candidates = [s for s in list(EXTRA_TARGETS) + sorted(dutch, key=lambda s: -len(targets[s][0]))
                      if s != e['slug'] and s not in linked and s not in related]
        auto = 0
        for s in candidates:
            if auto >= MAX_AUTO_LINKS:
                break
            a, path = all_targets[s]
            if a.lower() in AUTO_LINK_BLOCKLIST or len(a) < 4:
                continue
            if place(paragraphs, a, f'/{path}/'):
                linked.add(s)
                auto += 1
        unplaced = [r for r in related if r not in linked]
        if unplaced:
            links = [f'<a href="/{all_targets[r][1]}/">{all_targets[r][0]}</a>' for r in unplaced]
            joined = links[0] if len(links) == 1 else ', '.join(links[:-1]) + ' and ' + links[-1]
            paragraphs[-1] += f' Also read what {joined} means.' if len(links) == 1 else f' Also read about {joined}.'
        contents[e['slug']] = paragraphs
    return contents


def write(entries, contents):
    posts = []
    for e in sorted(entries, key=lambda e: e['slug']):
        lines = [
            f"    slug: {ts(e['slug'])},",
            f"    path: {ts('en/blog/dictionary/' + e['slug'])},",
            f"    alternate: {ts('blog/begrippen/' + e['nl'])},",
            "    category: 'Begrippen',",
            f"    title: {ts(e['title'])},",
            f"    excerpt: {ts(e['excerpt'])},",
            f"    date: '{DATE}',",
            f"    image: '{IMAGE}',",
            "    imageAlt: 'AnyTimerApp',",
            "    variant: 'light'",
        ]
        if e.get('origin'):
            lines[-1] += ','
            lines.append(f"    termOrigin: '{e['origin']}'")
        posts.append('  {\n' + '\n'.join(lines) + '\n  }')
    POSTS_OUT.write_text(
        "import type { BlogPost } from './blog-posts.data';\n\n"
        "// GENERATED by scripts/build_dictionary_en.py from scripts/begrippen_batches/en/*.json.\n"
        "// Edit the batches and rerun the script instead of editing this file.\n"
        "export const DICTIONARY_POSTS_EN: BlogPost[] = [\n" + ',\n'.join(posts) + '\n];\n',
        encoding='utf-8')
    blocks = []
    for slug in sorted(contents):
        paras = ',\n      '.join(ts(p) for p in contents[slug])
        blocks.append(f'  {ts(slug)}: {{\n    paragraphs: [\n      {paras}\n    ]\n  }}')
    CONTENT_OUT.write_text(
        "import type { BegripContent } from './begrippen-content.data';\n\n"
        "// GENERATED by scripts/build_dictionary_en.py. Edit the batches, not this file.\n"
        "export const BEGRIPPEN_CONTENT_EN: Record<string, BegripContent> = {\n" + ',\n'.join(blocks) + '\n};\n',
        encoding='utf-8')


def main():
    entries, skipped = load()
    errors, todo = check(entries, skipped)
    if errors:
        print('\n'.join(errors))
        sys.exit(1)
    write(entries, build(entries))
    print(f'{len(entries)} EN-begrippen geschreven, {len(skipped)} overgeslagen, {len(todo)} NL-begrippen nog te doen')


if __name__ == '__main__':
    main()
