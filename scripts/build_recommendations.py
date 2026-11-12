"""Build the recommendation sliders for every term, blog and drinking game page.

  Begrippen (term pages):  10 "Aanbevolen drankspellen" + 10 "Aanbevolen blogs"
  Blogs (and the timer):   10 "Aanbevolen drankspellen" + 10 "Aanbevolen blogs"
  Drankspellen:            5 "Vergelijkbare drankspellen" + 5 "Aanbevolen drankspellen"

Every game and blog is used. How often a candidate is shown is fixed by a quota:
a minimum for everyone, the rest in proportion to its value. Within that quota a
candidate lands first on the pages where it fits best.

  score(page, candidate) = 0.55 x relevance + 0.45 x value + small jitter
- relevance: 1.0 when the page text links to the candidate; otherwise topic words
  in the page (cards, dice, adten, dating, student house, Sinterklaas, anytimer...),
  plus a small bonus for any drinking word.
- value: search volume with drinking intent, corrected for keyword difficulty
  (DataForSEO, 2026-11-12), square-root scaled to 0-1. Core pages (adt timer,
  wat is een anytimer) get at least 0.75. See recommendations_value.json.
- min_begrippen in recommendations_value.json: a fixed minimum number of term
  pages for a candidate the user finds important (for example boze bak).
- jitter: a fixed per pair number (0-0.06), so equal scores don't give every page
  the same order.

Run from the repo root after adding terms, blogs or games:
  python3 scripts/build_recommendations.py
Writes src/app/pages/blog-term/term-recommendations.data.ts (terms, lazy loaded)
and src/app/pages/blog/content-recommendations.data.ts (blogs and games).
"""
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / 'src/app/pages/blog/blog-posts.data.ts'
CONTENT = ROOT / 'src/app/pages/blog-term/begrippen-content.data.ts'
VALUE = ROOT / 'scripts/recommendations_value.json'
OUT_TERMS = ROOT / 'src/app/pages/blog-term/term-recommendations.data.ts'
OUT_CONTENT = ROOT / 'src/app/pages/blog/content-recommendations.data.ts'
PAGES = ROOT / 'src/app/pages'

TERM_GAMES_N, TERM_BLOGS_N = 10, 10
BLOG_GAMES_N, BLOG_BLOGS_N = 10, 10
GAME_SIMILAR_N, GAME_RECOMMENDED_N = 5, 5
# Minimum share for every candidate, so nothing is left out.
MIN_TERM_GAMES, MIN_TERM_BLOGS = 60, 300
MIN_BLOG_GAMES, MIN_GAME_RECOMMENDED = 3, 3
# Relevance from which a page counts as really about a candidate (a topic word,
# without the drinking bonus alone).
STRONG = 0.6

CARD = ['kaart', 'kaarten', 'kaartspel', 'deck', 'boer', 'vrouw', 'heer', 'aas']
DICE = ['dobbel', 'dobbelsteen', 'dobbelstenen', 'worp', 'gooien']
ADT = ['adten', 'adtje', 'adtjes', 'atten', 'atje', 'rietadt', 'chug', 'ad fundum', 'bak trekken', 'in één keer']
PONG = ['pong', 'beker', 'bekers', 'balletje', 'gooien']
DATE = ['date', 'daten', 'relatie', 'rela', 'crush', 'situationship', 'scharrel', 'exclusief', 'partner',
        'verliefd', 'flirt', 'zoenen', 'kus', 'tinder', 'liefde', 'soft launch', 'hard launch', 'ghosting']
HOUSE = ['huisgenoot', 'huisgenoten', 'studentenhuis', 'huisavond', 'huis', 'koken', 'avondeten', 'film', 'chill']
SINT = ['sinterklaas', 'sint', 'pakjesavond', 'surprise', 'pepernoot', 'pieten', 'cadeau', 'gedicht']
ANYTIMER = ['anytimer', 'weddenschap', 'wedden', 'uitdaging', 'inzetten', 'ingezet', 'schuldig', 'verloren',
            'belofte', 'groepsapp', 'whatsapp']
DRINK = ['drank', 'drinken', 'bier', 'biertje', 'borrel', 'feest', 'feestje', 'kroeg', 'shot', 'slok', 'slokken',
         'zuipen', 'dronken', 'brak', 'kater', 'drankspel', 'drinking game', 'uitgaan', 'stappen', 'cantus', 'kratje']

GAME_TOPICS = {
    'kingsen': ['kingsen', 'kings cup', 'koning', 'ring of fire'] + CARD,
    'bussen': ['bussen', 'piramide', 'bus in'] + CARD,
    'toepen': ['toepen', 'toep', 'vuile was'] + CARD,
    'fuck-the-dealer': ['dealer'] + CARD,
    'de-paardenrace': ['paardenrace', 'kamelenrace', 'paard'] + CARD,
    'ring-of-fire': ['ring of fire', 'kings cup', 'circle of death'] + CARD,
    'bakplaten': ['bakplaten'] + CARD,
    'mijnenveld': ['mijnenveld'] + CARD,
    'hoger-lager': ['hoger lager', 'hoger of lager'] + CARD,
    'mexen': ['mexen', 'mex', 'mexxen'] + DICE,
    'beerpong': ['beerpong', 'beer pong', 'bierpong'] + PONG,
    'stress-pong': ['stress pong', 'stresspong'] + PONG,
    'jeu-de-bier': ['jeu de bier', 'jeu de boules'] + PONG,
    'jenga': ['jenga', 'toren', 'blokje'],
    'trek-je-bak-mania': ['trek je bak'] + ADT,
    'boze-bak': ['boze bak'] + ADT,
    'mario-barf': ['mario', 'mario kart'] + ADT,
    '30-seconds': ['30 seconds', 'omschrijven', 'raden', 'quiz'],
    'kusje-geven': ['kusje'] + DATE,
    'krokodillenspel': ['krokodil'],
    'vingeren': ['vingeren'],
    'vikingen': ['viking', 'vikingen'],
    'stef-stuntpiloot': ['stuntpiloot', 'stef'],
    'zeeslag': ['zeeslag'],
    'finger-roulette': ['finger roulette', 'vinger'],
}
BLOG_TOPICS = {
    'wat-is-een-adtje': ADT + ['bier'],
    'adt-timer': ADT + ['timer', 'tijd', 'snelste'],
    'wat-is-de-beste-adt-timer': ADT + ['timer', 'adtmeister'],
    'drankspellen': ['drankspel', 'drinking game', 'spel', 'spelletje'],
    'drankspellen-met-kaarten': CARD,
    'drankspellen-zonder-kaarten': DICE + PONG,
    'drankspellen-voor-2-personen': DATE + ['samen', 'met zijn tweeën', 'met z\'n tweeën'],
    'huisavondideeen': HOUSE,
    'sinterklaas-dobbelspel': SINT + DICE,
    'wat-is-een-anytimer': ANYTIMER,
    'mag-je-een-anytimer-weigeren': ANYTIMER + ['weigeren', 'nee zeggen'],
    'anytimers-bijhouden-whatsapp-notities': ANYTIMER + ['notities', 'bijhouden', 'app'],
}# Blog candidates that are not in BLOG_POSTS (resolved in the component).
EXTRA_BLOGS = {'adt-timer': 'adt-timer'}
BLOG_HTML = {
    'adt-timer': 'adt-timer/adt-timer-page.component.html',
    'wat-is-een-anytimer': 'blogs/begrippen/wat-is-een-anytimer/wat-is-een-anytimer.component.html',
    'wat-is-een-adtje': 'blogs/begrippen/wat-is-een-adtje/wat-is-een-adtje.component.html',
    'mag-je-een-anytimer-weigeren': 'blogs/weetjes/mag-je-een-anytimer-weigeren/mag-je-een-anytimer-weigeren.component.html',
    'anytimers-bijhouden-whatsapp-notities': 'blogs/weetjes/anytimers-bijhouden-whatsapp-notities/anytimers-bijhouden-whatsapp-notities.component.html',
}


def ts_strings(block):
    return [m.group(1).replace("\\'", "'") for m in re.finditer(r"'((?:[^'\\]|\\.)*)'", block)]


def nl_posts_source():
    posts = POSTS.read_text()
    start = posts.index('export const BLOG_POSTS')
    return posts[start:posts.index('\n];', start)]


def load_terms():
    nl = nl_posts_source()
    terms = {}
    for m in re.finditer(r"slug: '([^']+)',\s*path: 'blog/begrippen/[^']+',\s*category: 'Begrippen',(.*?)\n  \}", nl, re.S):
        body = m.group(2)
        title = re.search(r"title: '((?:[^'\\]|\\.)*)'", body)
        excerpt = re.search(r"excerpt: '((?:[^'\\]|\\.)*)'", body)
        terms[m.group(1)] = ' '.join(x.group(1) for x in (title, excerpt) if x)
    content = CONTENT.read_text()
    for m in re.finditer(r"\n  '([^']+)': \{\n    paragraphs: \[\n(.*?)\n    \]", content, re.S):
        if m.group(1) in terms:
            terms[m.group(1)] += ' ' + ' '.join(ts_strings(m.group(2)))
    return terms


def html_text(rel):
    path = PAGES / rel
    return path.read_text() if path.exists() else ''


def hits(text, words):
    return {w for w in words if re.search(r'(?<![a-zà-ÿ])' + re.escape(w) + r'(?![a-zà-ÿ])', text)}


def relevance(text, links, path, topics):
    if path in links:
        return 1.0
    specific = hits(text, topics)
    rel = 0.0
    if specific:
        rel = 0.6 if len(specific) == 1 else 0.8
    if hits(text, DRINK):
        rel += 0.25
    return min(rel, 0.95)


def jitter(page, cand):
    return int(hashlib.md5(f'{page}|{cand}'.encode()).hexdigest()[:6], 16) / 0xFFFFFF * 0.06


def quotas(cands, value, pages, per_page, minimum, exclude_self, overrides=None):
    """Number of pages per candidate: a minimum for everyone (or a higher one from
    `overrides`), the rest by value."""
    overrides = overrides or {}
    cap = {c: pages - (1 if c in exclude_self else 0) for c in cands}
    total = pages * per_page
    q = {c: min(max(minimum, overrides.get(c, 0)), cap[c]) for c in cands}
    left = total - sum(q.values())
    while left > 0:
        open_ = [c for c in cands if q[c] < cap[c]]
        if not open_:
            break
        weight = sum(value[c] for c in open_) or 1
        gave = 0
        for c in sorted(open_, key=lambda c: -value[c]):
            add = min(cap[c] - q[c], max(1, round(left * value[c] / weight)), left - gave)
            q[c] += add
            gave += add
            if gave >= left:
                break
        left -= gave
        if gave == 0:
            break
    return q


def allocate(pages, cands, score, per_page, quota, banned=lambda p, c: False):
    """Give every candidate its quota, on the pages where it fits best.

    Candidates go from the biggest quota down. Each takes its best-scoring pages
    that still have room, so every candidate gets its quota (small quotas always
    still fit in the free slots that are left). Pages that are still short at the
    end are topped up with their best remaining candidates.
    """
    picked = {p: [] for p in pages}
    need = dict(quota)
    # Pass 1: every candidate first gets the pages that are really about it (a
    # strong topic match), up to its quota. These are few, so they never block
    # the quotas below.
    strong = sorted(((score.relevance(p, c), p, c) for p in pages for c in cands
                     if not banned(p, c) and score.relevance(p, c) >= STRONG), reverse=True)
    for _, p, c in strong:
        if need[c] > 0 and len(picked[p]) < per_page and c not in picked[p]:
            picked[p].append(c)
            need[c] -= 1
    # Pass 2: biggest quota first, each on its best-scoring pages with room left.
    order = sorted(cands, key=lambda c: -quota[c])
    for c in order:
        for p in sorted((p for p in pages if not banned(p, c)), key=lambda p: -score(p, c)):
            if need[c] == 0:
                break
            if len(picked[p]) < per_page and c not in picked[p]:
                picked[p].append(c)
                need[c] -= 1
    for p in pages:
        if len(picked[p]) < per_page:
            # Candidates still under their quota first, then the best fit.
            for c in sorted((c for c in cands if not banned(p, c) and c not in picked[p]),
                            key=lambda c: (need[c] <= 0, -score(p, c))):
                if len(picked[p]) == per_page:
                    break
                picked[p].append(c)
                need[c] -= 1
    return {p: sorted(picked[p], key=lambda c: -score(p, c)) for p in pages}


def main():
    value = json.loads(VALUE.read_text())
    for kind in value:
        top = max(v['waarde'] for v in value[kind].values()) or 1
        for v in value[kind].values():
            v['score'] = (v['waarde'] / top) ** 0.5
            if v.get('kern'):
                v['score'] = max(v['score'], 0.75)
    gval = {g: value['games'][g]['score'] for g in GAME_TOPICS}
    bval = {b: value['blogs'][b]['score'] for b in BLOG_TOPICS}

    nl = nl_posts_source()
    paths = dict(re.findall(r"slug: '([^']+)',\s*path: '([^']+)'", nl))
    paths.update(EXTRA_BLOGS)
    subcat = dict(re.findall(r"slug: '([^']+)',\s*path: 'blog/drankspelletjes/[^']+',\s*category: 'Drankspelletjes',\s*subCategory: '([^']+)'", nl))
    games, blogs = list(GAME_TOPICS), list(BLOG_TOPICS)

    def scorer(texts, links, cvalue, topics):
        rels = {}
        def rel(p, c):
            if (p, c) not in rels:
                rels[(p, c)] = relevance(texts[p], links[p], paths[c], topics[c])
            return rels[(p, c)]
        def score(p, c):
            return 0.55 * rel(p, c) + 0.45 * cvalue[c] + jitter(p, c)
        score.relevance = rel
        return score

    def prep(raw):
        texts = {p: re.sub(r'<[^>]+>', ' ', r).lower() for p, r in raw.items()}
        links = {p: set(re.findall(r'(?:href|routerLink)="/([^"]*?)/?"', r)) for p, r in raw.items()}
        return texts, links

    # Terms
    traw = load_terms()
    terms = sorted(traw)
    tt, tl = prep(traw)
    term_games = allocate(terms, games, scorer(tt, tl, gval, GAME_TOPICS), TERM_GAMES_N,
                          quotas(games, gval, len(terms), TERM_GAMES_N, MIN_TERM_GAMES, set(),
                                 {g: v['min_begrippen'] for g, v in value['games'].items() if 'min_begrippen' in v}))
    term_blogs = allocate(terms, blogs, scorer(tt, tl, bval, BLOG_TOPICS), TERM_BLOGS_N,
                          quotas(blogs, bval, len(terms), TERM_BLOGS_N, MIN_TERM_BLOGS, set()))

    # Blogs (incl. the timer page)
    braw = {b: html_text(BLOG_HTML.get(b, f'blogs/inspiratie/{b}/{b}.component.html')) for b in blogs}
    bt, bl = prep(braw)
    blog_games = allocate(blogs, games, scorer(bt, bl, gval, GAME_TOPICS), BLOG_GAMES_N,
                          quotas(games, gval, len(blogs), BLOG_GAMES_N, MIN_BLOG_GAMES, set()))
    bscore = scorer(bt, bl, bval, BLOG_TOPICS)
    blog_blogs = {b: sorted((c for c in blogs if c != b), key=lambda c: -bscore(b, c))[:BLOG_BLOGS_N] for b in blogs}

    # Games: similar = same subcategory first, by value; recommended = quota over the rest
    graw = {g: html_text(f'blogs/drankspelletjes/{g}/{g}.component.html') for g in games}
    gt, gl = prep(graw)
    gscore = scorer(gt, gl, gval, GAME_TOPICS)
    similar = {}
    for g in games:
        others = [c for c in games if c != g]
        same = sorted((c for c in others if subcat.get(c) == subcat.get(g)), key=lambda c: -gscore(g, c))
        rest = sorted((c for c in others if subcat.get(c) != subcat.get(g)), key=lambda c: -gscore(g, c))
        similar[g] = (same + rest)[:GAME_SIMILAR_N]
    recommended = allocate(games, games, gscore, GAME_RECOMMENDED_N,
                           quotas(games, gval, len(games), GAME_RECOMMENDED_N, MIN_GAME_RECOMMENDED, set(games)),
                           banned=lambda p, c: c == p or c in similar[p])

    gi = {g: i for i, g in enumerate(games)}
    bi = {b: i for i, b in enumerate(blogs)}
    ig = lambda xs: json.dumps([gi[x] for x in xs])
    ib = lambda xs: json.dumps([bi[x] for x in xs])
    header = [
        '// GENERATED by scripts/build_recommendations.py. Do not edit by hand:',
        '// change the script (topics, weights) or recommendations_value.json, then run it again.',
    ]
    lists = [
        f'export const REC_GAMES = {json.dumps(games)};',
        f'export const REC_BLOGS = {json.dumps(blogs)};',
        f'export const DEFAULT_GAMES = {ig(sorted(games, key=lambda g: -gval[g]))};',
        f'export const DEFAULT_BLOGS = {ib(sorted(blogs, key=lambda b: -bval[b]))};',
    ]
    t = header + ['// Per Dutch term slug: [games, blogs] as indexes into REC_GAMES / REC_BLOGS, best first.',
                  "export { REC_GAMES, REC_BLOGS, DEFAULT_GAMES, DEFAULT_BLOGS } from '../blog/content-recommendations.data';",
                  '', 'export const TERM_RECOMMENDATIONS: Record<string, [number[], number[]]> = {']
    t += [f"  '{p}': [{ig(term_games[p])}, {ib(term_blogs[p])}]," for p in terms] + ['};']
    OUT_TERMS.write_text('\n'.join(t).replace('"', "'") + '\n')
    c = header + lists + ['', '// Per Dutch blog slug: [games, blogs].',
                          'export const BLOG_RECOMMENDATIONS: Record<string, [number[], number[]]> = {']
    c += [f"  '{b}': [{ig(blog_games[b])}, {ib(blog_blogs[b])}]," for b in blogs] + ['};', '',
          '// Per Dutch game slug: [similar, recommended].',
          'export const GAME_RECOMMENDATIONS: Record<string, [number[], number[]]> = {']
    c += [f"  '{g}': [{ig(similar[g])}, {ig(recommended[g])}]," for g in games] + ['};']
    OUT_CONTENT.write_text('\n'.join(c).replace('"', "'") + '\n')

    # Summary: on how many pages each candidate is shown.
    cg = Counter(x for d in (term_games, blog_games, similar, recommended) for v in d.values() for x in v)
    cb = Counter(x for d in (term_blogs, blog_blogs) for v in d.values() for x in v)
    print(f'{len(terms)} begrippen, {len(blogs)} blogs, {len(games)} drankspellen')
    print('drankspellen:', ', '.join(f'{g} {cg[g]}' for g in sorted(games, key=lambda g: -cg[g])))
    print('blogs:', ', '.join(f'{b} {cb[b]}' for b in sorted(blogs, key=lambda b: -cb[b])))
    json.dump({'games': dict(cg), 'blogs': dict(cb)}, open(ROOT / 'scripts/recommendations_counts.json', 'w'), indent=1)


if __name__ == '__main__':
    main()
