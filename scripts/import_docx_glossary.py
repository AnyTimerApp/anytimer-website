#!/usr/bin/env python3
"""
Leest AnyTimer_English_Glossary.docx (alleen stdlib: zipfile + regex op de
document-XML) en schrijft de Engelse bron letterlijk weg naar
scripts/glossary/en-source.json.

Elk docx-begrip heeft het format:
  "What does: <term> mean?"   (kop)
  <betekenis>                 (één zin)
  "<voorbeeld>"               (tussen aanhalingstekens)
  <context>                   (één of meer alinea's)

Deze bron is de basis voor de Nederlandse uitleg van de Engelse termen op de
NL site, en wordt later letterlijk gebruikt voor de Engelse site.

Gebruik: python3 scripts/import_docx_glossary.py [pad/naar.docx]
"""
import html
import json
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DOCX = ROOT / "AnyTimer_English_Glossary.docx"
OUT_PATH = ROOT / "scripts/glossary/en-source.json"

HEADING_RE = re.compile(r"^What does: (.+) mean\?$")


def slugify(term: str) -> str:
    s = term.lower().replace("'", "").replace("’", "").replace("___", "")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def paragraphs(docx: Path) -> list[str]:
    xml = zipfile.ZipFile(docx).read("word/document.xml").decode("utf-8")
    out = []
    for p in re.findall(r"<w:p[ >].*?</w:p>", xml, flags=re.S):
        text = "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))
        text = html.unescape(text).strip()
        if text:
            out.append(text)
    return out


def main():
    docx = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
    paras = paragraphs(docx)

    entries, current = [], None
    for text in paras:
        m = HEADING_RE.match(text)
        if m:
            current = {"title": m.group(1), "slug": slugify(m.group(1)), "body": []}
            entries.append(current)
        elif current is not None and not re.fullmatch(r"[A-Z]", text):
            current["body"].append(text)

    result = []
    for e in entries:
        body = e["body"]
        result.append({
            "slug": e["slug"],
            "title": e["title"],
            "meaning": body[0] if body else "",
            "example": body[1] if len(body) > 1 else "",
            "context": body[2:],
        })

    OUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Geïmporteerd: {len(result)} termen -> {OUT_PATH}")


if __name__ == "__main__":
    main()
