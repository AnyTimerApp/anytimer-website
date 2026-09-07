#!/usr/bin/env python3
"""
Crawlt https://studentenwoordenboek.nl/letter/{a..z}/ en zet alle gevonden
begrippen op een rij in begrippen-kandidaten.csv, zodat handmatig gekozen kan
worden welke begrippen een eigen /blog/begrippen/<slug> pagina op AnyTimerApp
worden. Schrijft geen content, alleen naam + brondslug + url.

Gebruik: python3 scripts/scrape_studentenwoordenboek.py
"""
import csv
import re
import string
import time
import urllib.request
from pathlib import Path

BASE_URL = "https://studentenwoordenboek.nl/letter/{letter}/"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)
REQUEST_DELAY_SECONDS = 1.0
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "begrippen-kandidaten.csv"

# Matches: <a href='https://studentenwoordenboek.nl/woord/<slug>/'>Naam</a>
# inside the woord-flip spans on a letter page.
TERM_PATTERN = re.compile(
    r"<a href='https://studentenwoordenboek\.nl/woord/([a-z0-9-]+)/'>([^<]+)</a>"
)


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8")


def scrape_letter(letter: str) -> list[tuple[str, str, str]]:
    url = BASE_URL.format(letter=letter)
    try:
        html = fetch(url)
    except Exception as error:
        print(f"  [!] kon {url} niet ophalen: {error}")
        return []

    results = []
    for slug, name in TERM_PATTERN.findall(html):
        word_url = f"https://studentenwoordenboek.nl/woord/{slug}/"
        results.append((name.strip(), slug, word_url))
    return results


def main() -> None:
    all_terms: dict[str, tuple[str, str, str]] = {}

    for letter in string.ascii_lowercase:
        terms = scrape_letter(letter)
        print(f"Letter {letter.upper()}: {len(terms)} begrippen")
        for name, slug, word_url in terms:
            all_terms[slug] = (name, slug, word_url)
        time.sleep(REQUEST_DELAY_SECONDS)

    rows = sorted(all_terms.values(), key=lambda row: row[0].lower())

    with OUTPUT_PATH.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["letter", "term", "url", "kiezen"])
        for name, slug, word_url in rows:
            writer.writerow([name[0].upper(), name, word_url, ""])

    print(f"\nTotaal: {len(rows)} unieke begrippen")
    print(f"Weggeschreven naar: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
