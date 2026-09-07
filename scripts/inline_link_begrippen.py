#!/usr/bin/env python3
"""
Herschrijft begrippen-content.data.ts zodat elk ander begrip dat letterlijk in
de lopende tekst wordt gebruikt automatisch een inline link wordt — niet
alleen de handmatig gekozen relatedTerms/relatedPosts, maar de volledige
woordenschat van alle 244 begrippen plus de twee bestaande "Wat is een
anytimer/adtje"-pagina's en de drankspellen-lijst.

Veiligheidsmaatregelen tegen valse positieven:
- Voor pure afkortingen (bv. "ALV", "DUO", "AL") wordt hoofdlettergevoelig
  gematcht, zodat het gewone Nederlandse woord "al" nooit per ongeluk naar
  het begrip AL linkt.
- Een kleine blocklist sluit een paar losse woorden uit die toevallig ook een
  begrip-titel zijn maar te vaak in normale zinnen voorkomen (bv. "bij").
- Langere kandidaten (meerdere woorden) worden eerst geprobeerd, en al
  ingevoegde links worden gemaskeerd zodat een latere, kortere kandidaat niet
  per ongeluk binnen een net geplaatste <a>-tag matcht (geen geneste links).
- Per pagina wordt elk begrip hooguit één keer gelinkt.

Staat een handmatig gekozen relatedTerm/relatedPost nergens letterlijk in de
tekst, dan wordt er een korte, natuurlijke zin toegevoegd — nooit een
opsomming.

Bronnen: alle scripts/begrippen_batches/*.json bestanden (slug, title,
paragraphs, relatedTerms, relatedPosts).
"""
import glob
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_PATH = ROOT / "src/app/pages/blog-term/begrippen-content.data.ts"

# Non-begrippen targets that can also be linked to.
EXTRA_TARGETS = {
    "wat-is-een-anytimer": {"title": "Wat is een anytimer?", "path": "wat-is-een-anytimer"},
    "wat-is-een-adtje": {"title": "Wat is een adtje?", "path": "wat-is-een-adtje"},
    "drankspellen": {"title": "Top 10 leukste drankspellen", "path": "drankspellen"},
}

# Anchor text overrides where the default (lowercased title) would look wrong.
ANCHOR_OVERRIDES = {
    "wat-is-een-anytimer": "anytimer",
    "wat-is-een-adtje": "adtje",
    "drankspellen": "onze favoriete drankspellen",
    "ginto": "GinTo",
    "vvv": "VVV'tje",
}

# Begrippen whose title doubles as an everyday Dutch word/preposition that
# shows up constantly in unrelated sentences — never auto-link these from
# plain body text, only via the curated relatedTerms fallback sentence.
AUTO_LINK_BLOCKLIST = {"bij", "extern", "medium", "super", "das", "loca"}


def load_entries():
    entries = {}
    for f in sorted(glob.glob(str(ROOT / "scripts/begrippen_batches/*.json"))):
        for e in json.loads(Path(f).read_text(encoding="utf-8")):
            entries[e["slug"]] = e
    return entries


def anchor_text(slug: str, title: str) -> str:
    if slug in ANCHOR_OVERRIDES:
        return ANCHOR_OVERRIDES[slug]
    letters_only = re.sub(r"[^a-zA-ZÀ-ÿ]", "", title)
    if letters_only and letters_only.upper() == letters_only:
        return title  # pure acronym, e.g. "ALV", "DUO", "KMT" — matched case-sensitively
    return title[0].lower() + title[1:]


def is_acronym(anchor: str) -> bool:
    letters_only = re.sub(r"[^a-zA-ZÀ-ÿ]", "", anchor)
    return bool(letters_only) and letters_only.upper() == letters_only


def mask_existing_links(text: str) -> str:
    """Same length as the input, but with existing <a>...</a> spans blanked
    out so a new pattern can never match inside an already-placed link."""
    return re.sub(r"<a [^>]*>.*?</a>", lambda m: " " * len(m.group(0)), text)


def build_all_targets(entries):
    targets = dict(EXTRA_TARGETS)
    for slug, e in entries.items():
        targets[slug] = {"title": e["title"], "path": f"blog/begrippen/{slug}"}
    return targets


def linkify(own_slug, paragraphs, related, all_targets):
    paragraphs = list(paragraphs)
    linked_slugs = set()

    # Related terms first (so a curated connection wins a spot even if a
    # coincidental shorter match exists elsewhere), then every other begrip,
    # longest anchor text first so multi-word phrases claim their match
    # before a shorter word inside that phrase gets a chance.
    other_slugs = [s for s in all_targets if s != own_slug and s not in related]
    ordered = related + other_slugs
    ordered = [s for s in ordered if s in all_targets]
    ordered.sort(key=lambda s: -len(anchor_text(s, all_targets[s]["title"])))

    for cand_slug in ordered:
        if cand_slug in linked_slugs or cand_slug in AUTO_LINK_BLOCKLIST:
            continue
        target = all_targets[cand_slug]
        path = target["path"]
        title = target["title"]
        anchor = anchor_text(cand_slug, title)
        href = f"/{path}/"

        flags = 0 if is_acronym(anchor) else re.IGNORECASE
        pattern = re.compile(r"\b" + re.escape(anchor) + r"\b", flags)

        for i, p in enumerate(paragraphs):
            m = pattern.search(mask_existing_links(p))
            if m:
                paragraphs[i] = p[:m.start()] + f'<a href="{href}">{p[m.start():m.end()]}</a>' + p[m.end():]
                linked_slugs.add(cand_slug)
                break

    # Curated related terms that never occurred naturally get folded into a
    # single closing sentence instead of one repetitive line each.
    unplaced = [s for s in related if s not in linked_slugs and s in all_targets]
    if unplaced:
        links = [f'<a href="/{all_targets[s]["path"]}/">{anchor_text(s, all_targets[s]["title"])}</a>' for s in unplaced]
        joined = links[0] if len(links) == 1 else ", ".join(links[:-1]) + " en " + links[-1]
        paragraphs[-1] = paragraphs[-1] + f" Lees ook de uitleg van {joined}."

    return paragraphs


def ts_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def main():
    entries = load_entries()
    all_targets = build_all_targets(entries)

    lines = [
        "export interface BegripContent {",
        "  // 1-2 short paragraphs, may contain inline <a href> links to related begrippen/posts.",
        "  paragraphs: string[];",
        "}",
        "",
        "export const BEGRIPPEN_CONTENT: Record<string, BegripContent> = {",
    ]

    for slug, e in entries.items():
        related = e.get("relatedTerms", []) + e.get("relatedPosts", [])
        linked_paragraphs = linkify(slug, e["paragraphs"], related, all_targets)
        lines.append(f"  {ts_string(slug)}: {{")
        lines.append("    paragraphs: [")
        lines.append("      " + ",\n      ".join(ts_string(p) for p in linked_paragraphs))
        lines.append("    ]")
        lines.append("  },")

    lines.append("};")
    lines.append("")

    CONTENT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Herschreven: {len(entries)} begrippen -> {CONTENT_PATH}")


if __name__ == "__main__":
    main()
