#!/usr/bin/env python3
"""Sync the English pages and their hreflang alternates into src/sitemap.xml.

Pairs come from the same sources the site uses (src/app/i18n/alternates.ts):
STATIC_PAIRS in alternates.ts plus `alternate`/`path` in blog-posts.en.data.ts
and dictionary.en.data.ts.

For every NL/EN pair this script:
  - adds a <url> entry for the English page if it is missing (lastmod = today,
    changefreq/priority copied from the Dutch entry);
  - (re)writes the xhtml:link alternates (nl, en, x-default) on both entries.

Safe to run repeatedly. Run it after adding or changing any English page:
    python3 scripts/sitemap_alternates.py
"""
import datetime
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, 'src/sitemap.xml')
ALTERNATES_TS = os.path.join(ROOT, 'src/app/i18n/alternates.ts')
EN_DATA_TS = os.path.join(ROOT, 'src/app/pages/blog/blog-posts.en.data.ts')
EN_DICTIONARY_TS = os.path.join(ROOT, 'src/app/pages/blog/dictionary.en.data.ts')
BASE = 'https://anytimer.app'
XHTML_NS = 'xmlns:xhtml="http://www.w3.org/1999/xhtml"'


def norm(path):
    path = '/' + path.strip('/')
    return '/' if path == '/' else path + '/'


def load_pairs():
    ts = open(ALTERNATES_TS).read()
    static = ts[ts.index('STATIC_PAIRS'):ts.index('];', ts.index('STATIC_PAIRS'))]
    pairs = [(norm(nl), norm(en)) for nl, en in re.findall(r"\['([^']+)',\s*'([^']+)'\]", static)]
    data = open(EN_DATA_TS).read() + open(EN_DICTIONARY_TS).read()
    for block in re.findall(r'\{[^{}]*\}', data):
        path = re.search(r"path: '([^']+)'", block)
        alt = re.search(r"alternate: '([^']+)'", block)
        if path and alt:
            pairs.append((norm(alt.group(1)), norm(path.group(1))))
    return pairs


def main():
    xml = open(SITEMAP).read()
    if XHTML_NS not in xml:
        xml = xml.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                          f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" {XHTML_NS}>', 1)

    # Drop old alternates; they are rebuilt below.
    xml = re.sub(r'\n\s*<xhtml:link [^>]*/>', '', xml)

    entries = {m.group(1): m for m in re.finditer(r'  <url>\n    <loc>([^<]+)</loc>.*?</url>\n', xml, re.S)}
    today = datetime.date.today().isoformat()
    new_entries = []
    alternates = {}

    for nl, en in load_pairs():
        nl_url, en_url = BASE + nl, BASE + en
        if nl_url not in entries:
            print(f'warning: Dutch page missing from sitemap: {nl_url}')
            continue
        if en_url not in entries:
            src = entries[nl_url].group(0)
            freq = re.search(r'<changefreq>([^<]+)', src)
            prio = re.search(r'<priority>([^<]+)', src)
            new_entries.append(
                f'  <url>\n    <loc>{en_url}</loc>\n    <lastmod>{today}</lastmod>\n'
                + (f'    <changefreq>{freq.group(1)}</changefreq>\n' if freq else '')
                + (f'    <priority>{prio.group(1)}</priority>\n' if prio else '')
                + '  </url>\n')
        links = (f'    <xhtml:link rel="alternate" hreflang="nl" href="{nl_url}"/>\n'
                 f'    <xhtml:link rel="alternate" hreflang="en" href="{en_url}"/>\n'
                 f'    <xhtml:link rel="alternate" hreflang="x-default" href="{nl_url}"/>\n')
        alternates[nl_url] = links
        alternates[en_url] = links

    xml = xml.replace('</urlset>', ''.join(new_entries) + '</urlset>')

    def add_links(m):
        loc = m.group(1)
        return m.group(0).replace('  </url>\n', alternates[loc] + '  </url>\n') if loc in alternates else m.group(0)

    xml = re.sub(r'  <url>\n    <loc>([^<]+)</loc>.*?</url>\n', add_links, xml, flags=re.S)
    open(SITEMAP, 'w').write(xml)
    print(f'{len(new_entries)} English URLs added, {len(alternates) // 2} pairs linked')


if __name__ == '__main__':
    main()
