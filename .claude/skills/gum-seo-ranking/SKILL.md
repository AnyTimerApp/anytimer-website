---
name: gum-seo-ranking
description: >
  Weekly ranking analysis for anytimer.app. Primary focus: beat the competition on the
  core keywords in kernzoekwoorden.csv (adt timer, bier timer, adtmeister, adten, atten,
  adtje and their EN counterparts). Secondary: move other queries we already rank for
  higher. Combines Search Console (gum), Keyword Planner (gum) and DataForSEO (live SERP,
  competitor content, authority) into max 5 concrete actions, and tracks the effect of
  earlier actions. Use for "gum-seo-ranking", "ranking rapport", "hoger ranken", or when it
  runs as a scheduled task. Read-only: no site changes, no gum writes, only read-only git.
---

# gum-seo-ranking

Doel, in deze volgorde:
1. **Kernzoekwoorden.** Hoger ranken dan de concurrenten op de zoekwoorden in `kernzoekwoorden.csv` (naast deze SKILL.md). Het eindpunt is positie 1 op de juiste pagina. Dit gaat altijd voor.
2. **Kanslijst.** Hoger ranken op andere zoekwoorden waarop anytimer.app al gevonden wordt.

Nieuwe pagina's en content gaps buiten de kernzoekwoorden horen bij `gum-seo-weekly`, niet hier.

Harde grenzen:
- Alleen lezen. Geen wijzigingen aan de site, geen schrijf-calls in gum (nooit `--allow-write`), geen indexeringsverzoeken.
- Git alleen lezend (`git log`, `git show`, `git diff`). Nooit committen of pushen.
- Schrijf alleen naar `seo-reports/`. Pas `kernzoekwoorden.csv` nooit zelf aan. Stel wijzigingen voor in het rapport.
- Maximaal **5 acties** per week. Minstens **3 daarvan** gaan over kernzoekwoorden, zolang er een kernzoekwoord met prioriteit 1 is dat niet stabiel op positie 1 tot 3 staat. Inhoudelijke acties gaan over maximaal 3 pagina's. Interne links, navigatie en sitemap op andere pagina's tellen niet als extra pagina. Liever 3 sterke acties dan 5 zwakke.
- Google-data gaat alleen via gum. Geen eigen scripts naar Google API's.

## 0. Kernzoekwoorden (eerste prioriteit)

Lees `kernzoekwoorden.csv`: zoekwoord, doelpagina, taal en prioriteit (1 = NL hoofdfocus, 2 = EN). Elke run doet hiervoor het volgende, ook als een kernzoekwoord weinig of geen vertoningen heeft:

1. **Search Console** (uit de data van stap 1): per kernzoekwoord positie, vertoningen, klikken en CTR in A en B. Noteer ook welke eigen pagina's vertoningen krijgen. Krijgt een andere pagina dan de doelpagina ≥ 20% van de vertoningen? Meld welke, en hoe de rolverdeling uit de CSV is te herstellen (interne link met het kernzoekwoord als anker naar de doelpagina, het woord op de andere pagina inperken, of de tussenkop daar op een ander zoekwoord richten). Staat de doelpagina nog niet bovenaan maar stijgt hij, terwijl een andere eigen pagina zakt? Dat is de gewenste overdracht, geen probleem.
2. **Wekelijkse tijdlijn:** haal `date`, `query` en `page` op met een regex-filter op de kernzoekwoorden, over A en B samen. Groepeer per week. Kernzoekwoorden hebben vaak weinig vertoningen. Een gemiddelde over 28 dagen kan dan misleiden. Bepaal wanneer een daling begon voordat je een oorzaak noemt. Leg die datum naast de commits van de betrokken pagina's (`git log`). Noem nooit een oorzaak die later begon dan de daling.
3. **Live SERP** (stap 3a): elk kernzoekwoord krijgt een SERP-call. Leg onze positie en URL vast, en de top 3 met URL. Noteer of de pagina in de SERP dezelfde is als de doelpagina.
4. **Concurrenten** (stap 3b): parse de top 3 resultaten die boven ons staan, per doelpagina op het belangrijkste kernzoekwoord.
5. **Autoriteit** (stap 5): eens per 4 weken, verplicht voor de kernzoekwoorden.
6. **Onze pagina en de site** (stap 4, plus extra):
   - Staat het kernzoekwoord in de title, de H1, de eerste zin en een tussenkop van de doelpagina? Staat het op een andere eigen pagina in een H1 of H2? Dan concurreren we met onszelf.
   - Interne links: tel alle links naar de doelpagina, en vooral links met het kernzoekwoord in de ankertekst. Staat de doelpagina in de navigatie of footer (`src/app/` navbar- en footer-componenten)? Een tool-pagina zonder sitebrede link is een grote achterstand op concurrenten die wel zo'n link hebben.
   - Wat bieden de top 3 dat wij niet bieden? Denk aan een werkende tool boven de vouw, een vergelijking, prijs of "gratis", varianten en spellingen (adten, atten, at timer), FAQ.
   - Indexering: inspecteer elke doelpagina die daalt, of die niet in de SERP staat. Meld een `lastCrawlTime` ouder dan de laatste wijziging.
7. **Actie-quotum:** kies minstens 3 acties voor kernzoekwoorden (zie Harde grenzen). Valt een doelpagina onder de rustregel? Kies dan acties buiten die pagina: interne links vanaf andere pagina's, navigatie, footer, sitemap-`lastmod`, of de rolverdeling op een andere eigen pagina. Die mogen altijd.

Merknamen van anderen (zoals AdtMeister): gebruik ze alleen beschrijvend in de lopende tekst, als vergelijking ("gratis alternatief voor een AdtMeister"). Zet een merknaam van een ander nooit in een title of H1 van een eigen product- of toolpagina.

## 1. Search Console ophalen (gum)

Search Console loopt 2 à 3 dagen achter. Einddatum = vandaag min 3 dagen. Datums inclusief, zonder overlap.

- **Periode A:** de laatste 28 dagen tot de einddatum.
- **Periode B:** de 28 dagen daarvoor.

Search Console heeft nog geen data van een jaar geleden voor deze site. Vergelijk daarom niet met vorig jaar in Search Console. Het seizoen komt uit de maandvolumes van Keyword Planner en DataForSEO (stap 2, "Zoekvolume en seizoen"). De site volgt het studentenjaar: introductietijd, Sinterklaas, carnaval, zomer.

Per periode, alleen web, dimensies `query` en `page`:

```bash
gum read searchconsole.searchanalytics.query --args '{"siteUrl":"sc-domain:anytimer.app","body":{"startDate":"…","endDate":"…","dimensions":["query","page"],"type":"web","rowLimit":25000,"startRow":0}}' --output json
```

Pagineer met `startRow` tot een call minder dan `rowLimit` rijen teruggeeft.

Extra voor periode A:
- zonder dimensies (officiële totalen; tel nooit `query,page`-rijen op als sitetotaal)
- `page` (paginatotalen)
- `query`, `page`, `device` (welke SERP telt: mobiel of desktop)
- `query`, `page`, `country` (NL en BE apart, en het hoofdland per EN-zoekwoord)

Zet ruwe data in `seo-reports/data/<datum>/ranking/`, met een `params.json` met de gebruikte datums en filters. Plak geen grote JSON in je antwoord.

Faalt een gum-call op inloggen (verlopen token, `AUTHORIZATION_ERROR`)? Stop en meld `gum login --service searchconsole`. Schrijf geen rapport op halve Search Console-data.

### Opschonen
- Merkzoekwoorden eruit: "anytimer", "any timer", "anytimerapp", "anytime app" en tikfoutvarianten. Rapporteer die in één regel apart.
- Splits in **NL** (alles behalve `/en/`) en **EN** (`/en/`). Analyseer ze apart. NL heeft voorrang.
- Laat irrelevante zoekwoorden weg (geen relatie met de pagina of de site).

## 2. Kanslijst bepalen

Dit is de kern. Alles daarna werkt alleen met deze lijst.

**Eigen CTR-curve.** Bereken uit periode A (zonder merk) de CTR per afgeronde positie 1 tot en met 20, gewogen naar vertoningen. Heeft een positie minder dan 300 vertoningen in totaal? Gebruik dan de standaardwaarde: 1 ≈ 28%, 2 ≈ 15%, 3 ≈ 10%, 4 ≈ 7%, 5 ≈ 6%, 7 ≈ 4%, 10 ≈ 2,5%, 15 ≈ 1%, 20 ≈ 0,5% (lineair ertussen). Zet de curve in het rapport.

**Kandidaten** (zoekwoord + pagina, periode A):

| Groep | Positie | Minimum vertoningen | Doelpositie |
|---|---|---|---|
| P1 top 3 halen | 4 tot 10 | 50 (EN: 30) | 2 |
| P2 eerste pagina | 11 tot 20 | 50 (EN: 30) | 5 |
| P3 verdedigen | 1 tot 3 | 100 | huidige positie in B |

P3 telt alleen als positie of klikken duidelijk dalen ten opzichte van B (positie ≥ 1 plek slechter, of klikken ≥ 30% lager en die daling is groter dan de seizoensfactor).

**Potentieel** = vertoningen × (CTR op doelpositie − huidige CTR), in extra klikken per 28 dagen. Dit is een scenario, geen voorspelling. Zeg dat in het rapport.

**Clusters.** Groepeer kandidaten per pagina. Tien varianten van hetzelfde zoekwoord op één pagina is één kans met het opgetelde potentieel. Het zoekwoord met de meeste vertoningen is het **hoofdzoekwoord**.

**Rustregel.** Is een pagina in de laatste 28 dagen inhoudelijk aangepast op basis van een eerder rapport (zie stap 7)? Zet hem dan niet opnieuw op de actielijst. Google heeft tijd nodig om een wijziging te verwerken. Alleen meten. Uitzondering: een technisch probleem (indexering, canonical). De rust geldt alleen voor de pagina zelf. Acties op andere pagina's die ernaar linken, en navigatie, footer of sitemap, mogen wel.

**Betrouwbaarheid.** Hoog: ≥ 200 vertoningen en positie stabiel tussen A en B (verschil < 3). Middel: 50 tot 200. Laag: minder dan 50 of positie springt. Lage betrouwbaarheid wordt geen hoofdactie zonder duidelijke reden.

Neem de top 10 pagina's (NL en EN samen, NL voorrang bij gelijk potentieel) mee naar stap 3. Dit is de **kanslijst**.

### Zoekvolume en seizoen

Voor de hoofdzoekwoorden van de kanslijst, de P3-zoekwoorden en de belangrijkste varianten (maximaal 50 zoekwoorden):

```bash
gum read googleads.keywordPlanIdeas.generateKeywordHistoricalMetrics --args '{"keywords":[…],"geoTargetConstants":["2528"],"language":"1010"}' --output json
```

Dit geeft het gemiddelde volume en 12 maanden historie (`monthlySearchVolumes`).

Geen volume uit Keyword Planner (te klein of te grof)? Doe dan voor die zoekwoorden samen één call met DataForSEO `dataforseo_labs_google_historical_keyword_data` (`location_code` 2528, `language_code` nl). Telt mee voor het DataForSEO-budget. Ook dan geen data? Schrijf "onbekend", niet 0.

**Seizoensfactor** per zoekwoord = volume in de maand(en) van periode A ÷ volume in de maand(en) van periode B. Valt een periode over twee maanden, weeg dan naar het aantal dagen per maand. Gebruik de factor zo:
- Vertoningen dalen ongeveer net zo hard als de seizoensfactor? Dat is seizoen. Geen actie.
- Vertoningen of klikken dalen veel harder dan de seizoensfactor, of de positie zakt? Dat is een echte daling.
- Een slechtere positie komt nooit door het seizoen.

**Komende piek:** stijgt het volume van een hoofdzoekwoord in de komende 4 tot 8 weken (volgens dezelfde maand vorig jaar in de historie)? Dan krijgt die pagina voorrang. Een wijziging nu staat dan op tijd voor de piek.

Notes:
- Search Console-vertoningen zijn leidend voor de kansen. Volume is context en de bron voor het seizoen.
- `competition` gaat over advertenties, niet over organische moeilijkheid.
- Meldt gum `missing developer token`: zet opnieuw een placeholder met `gum auth use-ads-developer-token --stdin`. Faalt Keyword Planner verder, gebruik dan DataForSEO voor alle zoekwoorden en meld dat.
- Heeft de site later 13 maanden Search Console-data (vanaf ongeveer eind 2027)? Vergelijk dan ook met dezelfde 28 dagen een jaar eerder.

## 3. DataForSEO: de echte SERP en de concurrenten

Hier zitten de meeste kansen. Search Console zegt waar we staan. DataForSEO laat zien **wie er boven ons staat en waarom**.

Gebruik de DataForSEO MCP-tools (`mcp__dataforseo__*`). Zijn die niet verbonden, gebruik dan curl met Basic Auth uit `$DATAFORSEO_USERNAME` en `$DATAFORSEO_PASSWORD`:

```bash
curl -sS -u "$DATAFORSEO_USERNAME:$DATAFORSEO_PASSWORD" -H "Content-Type: application/json" -X POST https://api.dataforseo.com/v3/<endpoint> -d '[{…}]'
```

Log nooit inloggegevens of headers. Geen toegang (`40100`, `40101`, geen tegoed)? Schrijf dan een duidelijk gelabeld deelrapport op Search Console en code, en markeer alle SERP-conclusies als "niet onderzocht". Verzin nooit een SERP.

**Budget per run:** maximaal 25 SERP-calls, 12 content-parses, 1 ranked-keywords-call, 1 historical-keyword-data-call (stap 2) en 1 backlinks-call (stap 5). De kernzoekwoorden gaan eerst. Wat overblijft gaat naar de kanslijst. SERP-responses zijn groot. Schrijf per call meteen een korte samenvatting naar `serp_summary.json` (positie, top 5, features, AI Overview-bronnen) en houd de rest niet vast. Tel de `cost` uit elke response op als die er is, en zet het totaal in het rapport. Haal geen zoekwoord twee keer op in dezelfde run. Bij een fout: één keer opnieuw, daarna overslaan.

### 3a. SERP per hoofdzoekwoord

Tool `serp_organic_live_advanced` (endpoint `serp/google/organic/live/advanced`). Eerst voor elk kernzoekwoord uit `kernzoekwoorden.csv`. Daarna voor het hoofdzoekwoord van elke pagina op de kanslijst, plus bijzoekwoorden met veel vertoningen die een ander soort SERP kunnen hebben, zolang het budget het toelaat.

```json
{"keyword":"…","location_code":2528,"language_code":"nl","device":"mobile","depth":20}
```

- `device: desktop` alleen als stap 1 liet zien dat dat zoekwoord vooral desktop-vertoningen heeft.
- EN-zoekwoorden: `language_code: en`, `location_code` van het land met de meeste vertoningen in stap 1.

Leg per zoekwoord vast:
- **onze positie** (`rank_group` en `rank_absolute`) en URL. Andere URL dan in Search Console? Mogelijke kannibalisatie.
- **top 5 organisch:** domein, URL, title, description.
- **SERP-features en wie ze heeft:** `featured_snippet` (alinea, lijst of tabel), `people_also_ask` (met de vragen), `ai_overview` (met geciteerde bronnen), `video`, `images`, `related_searches`.
- **soort pagina's bovenaan:** definitie, lijst, speluitleg met regels, forum, woordenboek, video, tool. Dit is de zoekintentie die Google beloont.

DataForSEO is een momentopname. Search Console is een gemiddelde over 28 dagen. Verschil tussen beide is normaal. Verklaar het, forceer het niet.

### 3b. Inhoud van de concurrenten

Eerst voor elke doelpagina van de kernzoekwoorden, op het belangrijkste kernzoekwoord van die pagina. Daarna, met wat er van de 12 over is, voor de top pagina's van de kanslijst. Parse de top 3 organische resultaten die niet van ons zijn en boven ons staan. Sla Facebook, TikTok, Instagram en Reddit over, en neem dan het volgende resultaat. De URL's in de SERP-response zijn vaak Google-redirects (`google.com/goto?...`). Gebruik dan de echte URL uit `breadcrumb` of uit de AI Overview-referenties. Lukt dat niet, sla hem over en meld dat. Tool `on_page_content_parsing` (endpoint `on_page/content_parsing/live`):

```json
{"url":"…"}
```

Leg per concurrent vast: H1, alle H2 en H3, aantal woorden, lijst/tabel/FAQ ja of nee, schema (FAQ, HowTo) als zichtbaar, en hoe snel de kernvraag wordt beantwoord (eerste alinea of later). Lukt het parsen niet? Schrijf "niet leesbaar". Verzin geen inhoud.

### 3c. Gemiste zoekwoorden (eens per 4 weken)

Als `seo-reports/tracking.csv` ontbreekt of de laatste `ranked_keywords`-run ouder is dan 28 dagen (zie `seo-reports/data/*/ranking/ranked_keywords.json`):

Tool `dataforseo_labs_google_ranked_keywords`:

```json
{"target":"anytimer.app","location_code":2528,"language_code":"nl","limit":1000,"filters":["ranked_serp_element.serp_item.rank_group","<=",20]}
```

Zoekwoorden op positie 4 tot 20 die niet in de Search Console-data staan (geanonimiseerd of buiten de rijlimiet) gaan met de markering "DFS" mee als kandidaat bij de juiste pagina. Gebruik het DataForSEO-volume als vertoningen-schatting en zeg dat erbij.

## 4. Analyse per kanspagina

Lees eerst de eigen bron van elke pagina op de kanslijst:
- Routes en titles: `src/app/app.routes.ts` en `src/app/app.routes.en.ts`
- Meta descriptions: de component-constructors. Begrippen: `src/app/pages/blog/blog-posts.data.ts` en `src/app/shared/term-seo-title.ts`
- Tekst van begrippen: `src/app/pages/blog-term/begrippen-content.data.ts`
- Drankspellen en andere blogs: de component onder `src/app/pages/`

De site is geprerenderd. Check bij twijfel de live HTML: `curl -s https://anytimer.app/<pad>/ | grep -E "<h1|<h2|<title|canonical"`.

Beantwoord per pagina, en noteer alleen wat echt een verschil maakt:

1. **Hoofdzoekwoord on-page.** Staat het letterlijk of als duidelijke variant in de title, de H1, de eerste zin en minstens één tussenkop? Geen keyword stuffing.
2. **Zoekintentie.** Past het type pagina bij wat bovenaan staat (3a)? Bij "betekenis"-zoekwoorden staat de definitie in de eerste één à twee zinnen. Bij drankspellen staan benodigdheden en regels hoog op de pagina.
3. **Verschil met de top 3.** Welke onderwerpen (H2/H3) behandelen minstens twee van de drie concurrenten die wij missen? Is onze pagina veel korter dan de mediaan van de top 3, en hoort die lengte bij de intentie? "Schrijf meer woorden" is geen advies. Een concreet ontbrekend onderwerp wel.
4. **Bijzoekwoorden.** Welke Search Console-zoekwoorden geven deze pagina vertoningen maar komen niet in de tekst voor? Groepeer ze in onderwerpen. Een onderwerp met samen ≥ 30 vertoningen wordt een voorstel voor een tussenkop of FAQ-vraag.
5. **SERP-features.**
   - Featured snippet bij een concurrent: stel een alinea van 40 tot 50 woorden voor die de vraag direct beantwoordt. Is de snippet een lijst, stel dan een lijst voor.
   - People also ask: welke vragen beantwoorden wij nog niet? Per vraag een tussenkop en een antwoord van 2 à 3 zinnen.
   - AI Overview: worden wij geciteerd? Zo nee: welke bronnen wel, en wat staat daar dat bij ons ontbreekt?
6. **CTR tegenover positie.** Ligt de CTR meer dan 30% onder de eigen curve voor die positie? Geef de huidige title en description uit de code, die van de nummer 1, en een nieuw voorstel. Volg de vaste patronen: begrip `{Term} betekenis: wat betekent {term}?`, drankspel `{Naam} regels: zo speel je het drankspel`. Sentence case, `:` als scheiding, geen ` - `, geen `&`, nooit "| AnyTimerApp" aan het einde. Title maximaal 60 tekens. Description maximaal 155 tekens, legt direct uit, geen lokkertje. Route-title en component-title blijven exact gelijk.
7. **Interne links.** Tel met `grep -rn "<slug>" src/app` (op `routerLink` en `href`) hoeveel pagina's ernaar linken. Bij weinig links: stel 2 à 3 links voor van bestaande, inhoudelijk passende pagina's. Per link: bronpagina, bestand, de zin waar de link in komt, en de ankertekst (hoofd- of bijzoekwoord, natuurlijk geformuleerd). Elk onderwerp maar één keer per bronpagina.
8. **Kannibalisatie.** Krijgt een tweede eigen pagina ≥ 20% van de vertoningen op het hoofdzoekwoord, in zowel A als B? Of toont de SERP een andere URL dan Search Console? Zeg welke pagina de hoofdpagina wordt en wat er met de andere gebeurt (interne link naar de hoofdpagina, tekst inperken, of title op een ander zoekwoord richten). Twee URL's op één zoekwoord is op zich nog geen kannibalisatie.
9. **Indexering.** Alleen bij een dalende pagina of iets vreemds in de SERP. Maximaal 10 inspecties per run:
   ```bash
   gum read searchconsole.urlInspection.index.inspect --args '{"body":{"inspectionUrl":"https://anytimer.app/…/","siteUrl":"sc-domain:anytimer.app"}}' --output json
   ```
   Meld een `verdict` anders dan `PASS`, een afwijkende `googleCanonical` (na normaliseren van slash en encoding), of een `lastCrawlTime` ouder dan de laatste wijziging.

## 5. Concurrentiesterkte

Kernzoekwoorden: altijd, eens per 4 weken (zie `seo-reports/data/*/ranking/backlinks_ranks.json`). Kanslijst: alleen bij twijfel. Staat een pagina al weken op dezelfde plek terwijl de inhoud beter is dan die van de top 3? Dan ligt het mogelijk aan autoriteit. Vergelijk dan met één call `backlinks_bulk_ranks` de domeinen uit de top 3 van alle kernzoekwoorden samen met anytimer.app, en sla het resultaat op als `backlinks_ranks.json`. Faalt die (geen backlinks-abonnement)? Sla over en meld dat. Gebruik het alleen om haalbaarheid te scoren, niet als actie "koop links".

## 6. Stijgers en dalers (kort)

Vergelijk A met B voor de kanslijst en de 10 pagina's met de meeste vertoningen. Vergelijk alleen vaste combinaties van zoekwoord en pagina, want een andere zoekwoordmix verschuift de gemiddelde positie. Leg elke daling naast de seizoensfactor uit stap 2. Een daling die de seizoensfactor volgt, is geen actie. Noem alleen dalingen tegen het seizoen in.

## 7. Tracking en opvolging

**Trackingbestand** `seo-reports/tracking.csv` (maak het aan als het ontbreekt):

```
datum,zoekwoord,pagina,positie_gsc,positie_serp,vertoningen,klikken,ctr,featured_snippet_van_ons,in_ai_overview
```

Eén rij per kernzoekwoord (altijd), per hoofdzoekwoord op de kanslijst, en per zoekwoord dat al in eerdere rijen staat. Zo blijft een zoekwoord gevolgd, ook als het van de kanslijst valt. `positie_serp` leeg als er deze run geen SERP-call voor was.

**Acties** in `seo-reports/data/<datum>/ranking/actions.json`: per actie een id, pagina, bestand, zoekwoord, `kern: true/false`, soort (title, intro, sectie, faq, link, navigatie, kannibalisatie) en de baseline (positie, vertoningen, klikken, CTR in A).

**Opvolging.** Lees de vorige `actions.json`-bestanden. Zoek per actie met `git log --since=<datum rapport> --format="%h %ad %s" --date=short -- <bestand>` of hij is uitgevoerd, en check in het huidige bestand of de voorgestelde tekst er echt staat. Niet te bevestigen? Schrijf "onbekend".

Voor elke uitgevoerde actie: haal dimensie `date` op met een filter op die pagina en het hoofdzoekwoord. Vergelijk 14 dagen voor met 14 dagen na de commitdatum, en later 28 en 56 dagen na. Minder dan 14 dagen na de wijziging: "te vroeg". Corrigeer vertoningen en klikken voor de seizoensfactor van die periodes. Zeg erbij dat concurrenten en Google-updates ook meespelen. Claim nooit dat een stijging zeker door één wijziging komt. Wat wel werkt, mag vaker worden toegepast op vergelijkbare pagina's. Noem dat als les.

## 8. Acties kiezen

Score elke mogelijke actie (0 tot 100, eigen heuristiek, geen Google-cijfer):
- 35: potentieel in extra klikken (stap 2)
- 25: bewijs uit de SERP (concreet ontbrekend onderwerp, snippet die we kunnen pakken, intentie die niet past)
- 20: nabijheid van het doel en een stabiele positie
- 10: seizoen (piek in de komende 4 tot 8 weken)
- 10: weinig werk (title of intro aanpassen scoort hoger dan een hele sectie herschrijven)

Bij kernzoekwoorden telt "potentieel" niet in klikken. Ze hebben vaak weinig vertoningen en zijn toch het belangrijkst. Geef de 35 punten dan op basis van de afstand tot positie 1 en het zoekvolume uit Keyword Planner. "Bewijs uit de SERP" gaat hier over wat de top 3 heeft en wij niet.

Kies eerst minstens 3 kernacties (zie Harde grenzen), daarna de hoogste kanslijst-acties tot 5. Inhoudelijke acties op maximaal 3 pagina's. Een technisch probleem dat ranking blokkeert (niet geïndexeerd, foute canonical, niet gecrawld sinds de laatste wijziging) gaat altijd voor.

Elke NL-actie krijgt ook de EN-tegenhanger als die pagina bestaat (lokaal vertaald, niet letterlijk). Kijk wel of het EN-zoekwoord anders is.

## 9. Rapport

Schrijf `seo-reports/<JJJJ-MM-DD>-ranking.md` in het Nederlands. Korte, punctuele zinnen. Weinig komma's. Geen em-dashes.

1. **Samenvatting in 5 regels:** stand op de kernzoekwoorden (hoeveel in de top 3, wie staat er boven ons), rankingtrend, grootste bedreiging, hoofdactie, wat vorige acties opleverden.
2. **Scorebord kernzoekwoorden.** Per kernzoekwoord: doelpagina, positie GSC A/B, positie live SERP en de URL die Google toont, vertoningen, klikken, volume, de nummers 1 tot 3 (domein), verschil met vorige week (uit `tracking.csv`) en de status (top 3 / pagina 1 / buiten pagina 1 / verkeerde pagina). Daaronder per doelpagina in 2 à 3 zinnen wat de top 3 heeft en wij niet.
3. **Top 5 acties voor deze week.** Kernacties eerst. Per actie:
   - rang, score en betrouwbaarheid
   - URL en bestand (met regelnummer)
   - huidige tekst en de **volledige nieuwe tekst** (title, description, alinea, tussenkop met antwoord, of de zin met de link). Kant-en-klaar om te plakken.
   - bewijs: zoekwoord, positie A/B, vertoningen, CTR, en de concrete concurrent (URL) die het wel heeft
   - EN-tegenhanger
   - wat je **niet** moet aanpassen op die pagina (bijvoorbeeld een sterke title op positie 2)
4. **Kanslijst:** top 10 pagina's met hoofdzoekwoord, positie A/B, vertoningen, klikken, CTR, volume (met bron: Keyword Planner of DataForSEO), seizoensfactor, piekmaand, potentieel, betrouwbaarheid, en of de rustregel geldt.
5. **SERP-analyse per kanspagina:** top 5 met URL, SERP-features en eigenaar, zoekintentie, wat de top 3 heeft en wij niet.
6. **Opvolging:** vorige acties, uitgevoerd ja/nee/onbekend, effect na 14/28/56 dagen, lessen.
7. **Stijgers en dalers** tegen het seizoen in.
8. **Data en beperkingen:** datums, segmenten, CTR-curve, aantal DataForSEO-calls en kosten, fouten, merkzoekwoorden in één regel.

Sluit je antwoord af met de bestandsnaam van het rapport en de genummerde top 5 acties. Voer zelf niets uit. De gebruiker kiest.
