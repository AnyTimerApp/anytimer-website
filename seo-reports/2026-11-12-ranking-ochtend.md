# Rankingrapport anytimer.app · 12 november 2026

Periode A: 13 oktober t/m 9 november 2026. Periode B: 15 september t/m 12 oktober 2026. Web, zonder merkzoekwoorden.

## 1. Samenvatting

1. Vertoningen ×3,6 (25.813 → 91.930). Klikken +10% (212 → 234). De groei komt bijna helemaal van nieuwe begrippen op positie 7 tot 12, en die leveren vrijwel geen klikken op.
2. Grootste kans: de begrippen worden al geciteerd in de AI Overview (unhinged, idk, sidequest). Ze staan alleen nog niet in de zichtbare organische top. Extra inhoud die de vragen uit "People also ask" beantwoordt, is de snelste stap.
3. Grootste bedreiging: exclusief daalt tegen het seizoen in. De klikdaling op `/wat-is-de-beste-adt-timer/` (82 → 49) is vooral seizoen: "adtmeister" daalde van 1.300 naar 720 zoekopdrachten (sep → okt), op een stabiele positie 3,6. Zie 6.
4. Hoofdactie: hard launch (EN) uitbreiden met de marketingbetekenis en de werkwoordsvormen. Dat is het grootste potentieel en het enige gat dat de hele top 5 en de AI Overview wel dekken.
5. Vorige acties: de wijziging van kingsen (20 okt) leverde niets op (-15% vertoningen, positie 10,2 → 10,6). Exclusief daalde na 20 oktober sterk. De unhinged-title staat pas sinds 9 november live en is nog te vroeg om te meten.

## 2. Top acties voor deze week

Vier acties op drie pagina's. Er is geen vijfde actie die sterk genoeg is. Alle titles en descriptions van begrippen blijven tot 18 november in rust (description-sjabloon 4 november). Deze acties gaan daarom alleen over de tekst op de pagina.

Opbouw van een begrip-pagina: H1 "Wat betekent: X?", dan de excerpt als intro, dan `paragraphs[0]` als voorbeeldzin, en daarna de overige paragraphs als `<p>`. Een nieuwe alinea gaat als nieuw item in `paragraphs`.

### Actie 1. Hard launch (EN): marketingbetekenis en werkwoordsvormen

- **Score 74 · betrouwbaarheid middel** (2.270 vertoningen, maar nieuwe pagina zonder data in B)
- **URL:** https://anytimer.app/en/blog/dictionary/hard-launch/
- **Bestand:** `src/app/pages/blog-term/begrippen-content.en.data.ts` regel 1244
- **Nu:** één alinea over daten en het verschil met soft launch.
- **Nieuw:** voeg deze alinea toe als nieuw item tussen de voorbeeldzin (regel 1243) en de bestaande alinea (regel 1244):

```
'The term comes from marketing. There a hard launch is the full public release of a product, after a small test called a soft launch. On social media the word moved to dating. To hard launch someone means you post them openly, face and name included. People say "she hard launched him" or "they are hard launching their relationship". Typical hard launches are a couple photo, a tag in your story or a post on your anniversary.',
```

- **Bewijs:**
  - "hard launch meaning" positie 10,0, 1.520 vertoningen, 0 klikken. Hele cluster: 8 varianten, 2.270 vertoningen. Volume 22.200/mnd (Keyword Planner, India + Filipijnen + VS).
  - "hard launching meaning" (164) en "hard launched meaning" (68) komen niet in de tekst voor.
  - SERP (Filipijnen, mobiel): de AI Overview heeft twee kopjes, "In Relationships" en "In Business and Marketing". Organisch #1 launchpadagency.com, #3 Quora en #7 Capterra gaan alle drie over de productlancering. Wij noemen die betekenis niet.
  - "People also search for": "hard launch relationship examples", "hard launch ideas". De voorbeelden in de nieuwe alinea dekken dat.
- **NL-tegenhanger:** `src/app/pages/blog-term/begrippen-content.data.ts` regel 1252. Dezelfde plek, als nieuw item na de voorbeeldzin:

```
'De term komt uit marketing. Daar is een hard launch de volledige lancering van een product, na een kleine test: de soft launch. Op social media is het woord overgewaaid naar daten. Iemand hard launchen betekent dat je diegene openlijk post, met gezicht en naam. Denk aan een koppelfoto, een tag in je story of een post op jullie jubileum.',
```

- **Niet aanpassen:** de title en de excerpt. De excerpt is de definitie die Google laat zien. Het description-sjabloon staat nog in rust tot 18 november.

### Actie 2. IDK (NL): afkorting, Engels en WhatsApp beantwoorden

- **Score 56 · betrouwbaarheid middel** (1.416 vertoningen op de pagina, nieuw sinds deze periode)
- **URL:** https://anytimer.app/blog/begrippen/idk/
- **Bestand:** `src/app/pages/blog-term/begrippen-content.data.ts` regel 1414
- **Nu:** voorbeeldzin plus één alinea over toon en schrijfwijze. Het woord "afkorting" staat niet op de pagina.
- **Nieuw:** voeg deze alinea toe als nieuw item tussen de voorbeeldzin (regel 1413) en de bestaande alinea (regel 1414):

```
'IDK is de Engelse afkorting van "I don\'t know". In het Nederlands betekent het "ik weet het niet". Je ziet de afkorting vooral op WhatsApp, Snapchat en TikTok. Op WhatsApp is het een snel antwoord als je iets niet weet of geen zin hebt om na te denken.',
```

- **Bewijs:**
  - "wat betekent idk" 270 vertoningen, positie 9,4. "idk afkorting" 192 en "afkorting idk" 63: samen 255 vertoningen op een woord dat niet in de tekst staat. "idk betekenis" 178. Volume 1.300/mnd.
  - Op de pagina staan 0 klikken over 1.416 vertoningen.
  - People also ask: "Wat is idk in het Engels?", "Wat betekent idk op WhatsApp?" en "Wat is de afkorting voor I don't know?". Wij beantwoorden geen van drieën.
  - De AI Overview citeert ons al ("IDK staat voor I don't know. Ik weet het niet."), samen met ensie.nl en Cambridge. De organische top bestaat uit TikTok, Scribd, Facebook, Medium en Wikipedia (een rapper). De inhoud is zwak. Dit is haalbaar.
- **EN-tegenhanger:** `begrippen-content.en.data.ts` regel 1406, als nieuw item na de voorbeeldzin. De EN-pagina heeft nog 0 vertoningen, dus alleen voor gelijke inhoud:

```
'IDK is short for "I don\'t know". You see it mostly on WhatsApp, Snapchat and TikTok. In a text it is a quick reply when you don\'t know something or don\'t feel like thinking about it.',
```

- **Niet aanpassen:** de excerpt "IDK staat voor I don't know. Ik weet het niet." Dat is precies de zin die de AI Overview citeert.

### Actie 3. Side quest (NL): spelling "sidequest", nevenmissie en TikTok

- **Score 57 · betrouwbaarheid middel**
- **URL:** https://anytimer.app/blog/begrippen/side-quest/
- **Bestand:** `src/app/pages/blog-term/begrippen-content.data.ts` regel 2446
- **Nu:** het woord staat alleen los geschreven als "side quest".
- **Nieuw:** voeg deze alinea toe als nieuw item tussen de voorbeeldzin (regel 2445) en de bestaande alinea (regel 2446):

```
'Je schrijft het los als side quest of aan elkaar als sidequest. Allebei is goed. In het Nederlands heet het in games ook wel een nevenmissie. Op TikTok laten mensen hun side quests zien: een spontane roadtrip, een feestje bij vreemden of een uur kletsen met de buurman. Een leuke sidequest is dus vooral iets wat je niet had gepland.',
```

- **Bewijs:**
  - "sidequest betekenis" 337 vertoningen, positie 6,9: het dichtst bij de top van alle NL-kansen. "side quest betekenis" 310, positie 7,8. Volume 1.900/mnd per variant.
  - De schrijfwijze aan elkaar heeft de meeste vertoningen maar staat niet op de pagina.
  - De AI Overview citeert ensie.nl met "nevenmissie" en citeert ons voor de figuurlijke betekenis.
  - People also ask: "Wat betekent side quest op TikTok?" en "Wat is een leuke sidequest?". De organische top bestaat uit Facebook, Reverso, Reddit, The Good Trade en Cambridge.
- **EN-tegenhanger:** `begrippen-content.en.data.ts` regel 2432, als nieuw item na de voorbeeldzin. De EN-pagina heeft 377 vertoningen.

```
'You write it as side quest or as one word, sidequest. On TikTok people show off their side quests: a spontaneous road trip, a party at a stranger\'s place or an hour chatting with the neighbour. A good side quest is mostly something you never planned.',
```

- **Niet aanpassen:** de bestaande alinea. Die bevat de gamingherkomst en de 3 interne links al. Deze pagina heeft al 5 inkomende links, dus extra links zijn niet nodig.

### Actie 4. IDK: twee interne links erbij

- **Score 40 · betrouwbaarheid middel**
- **Waarom:** er linkt maar 1 pagina naar `/blog/begrippen/idk/` (IDC). Zusterbegrippen als side quest (5) en unhinged (4) krijgen meer links.
- **Link 1:** pagina afko, `begrippen-content.data.ts` regel 64.
  - Nu: `Lees ook de uitleg van <a href="/blog/begrippen/abbo/">abbo</a> en <a href="/blog/begrippen/afk/">AFK</a>.`
  - Nieuw: `Lees ook de uitleg van <a href="/blog/begrippen/abbo/">abbo</a>, <a href="/blog/begrippen/afk/">AFK</a> en de afkorting <a href="/blog/begrippen/idk/">IDK</a>.`
- **Link 2:** pagina LMK, `begrippen-content.data.ts` regel 1726.
  - Nu: `Lees ook de uitleg van <a href="/blog/begrippen/asap/">ASAP</a>, <a href="/blog/begrippen/fyi/">FYI</a> en <a href="/blog/begrippen/dapri/">dapri</a>.`
  - Nieuw: `Lees ook de uitleg van <a href="/blog/begrippen/asap/">ASAP</a>, <a href="/blog/begrippen/fyi/">FYI</a>, <a href="/blog/begrippen/dapri/">dapri</a> en <a href="/blog/begrippen/idk/">IDK</a>.`
- **EN-tegenhanger:** `begrippen-content.en.data.ts`.
  - afko, regel 62: `Also read about <a href="/en/blog/dictionary/abbo/">abbo</a>, <a href="/en/blog/dictionary/afk/">AFK</a> and the abbreviation <a href="/en/blog/dictionary/idk/">IDK</a>.`
  - LMK, regel 1718: `Also read about <a href="/en/blog/dictionary/asap/">ASAP</a>, <a href="/en/blog/dictionary/fyi/">FYI</a> and <a href="/en/blog/dictionary/idk/">IDK</a>.`
- **Niet aanpassen:** de link naar IDK vanaf IDC. Die bestaat al.

## 3. Kanslijst

Potentieel = vertoningen × (CTR op doelpositie − huidige CTR), in extra klikken per 28 dagen. Dit is een scenario, geen voorspelling. Het rekent met 15% CTR op positie 2 (standaardwaarde). Bij deze SERP's staan een AI Overview, video's en "People also ask" boven de organische resultaten. De werkelijke CTR ligt daar vrijwel zeker lager.

| # | Pagina | Hoofdzoekwoord | Pos A / B | Vert. A / B | Klik | CTR | Volume (bron) | Seizoen | Piek | Potentieel | Betr. | Rust |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | /en/blog/dictionary/hard-launch/ | hard launch meaning | 10,0 / – | 1.520 / 0 | 0 | 0% | 22.200 (KP, IN+PH+US) | 0,94 | mei | 340 | middel | snippet tot 18 nov |
| 2 | /en/blog/dictionary/seeing-someone/ | seeing someone meaning | 8,6 / – | 697 / 0 | 0 | 0% | 1.300 (KP) | 1,15 | geen | 208 | middel | snippet tot 18 nov |
| 3 | /en/blog/dictionary/unpopular-opinion/ | unpopular opinion meaning | 7,1 / – | 986 / 0 | 1 | 0,1% | 1.300 (KP) | 0,91 | jan | 180 | middel | snippet tot 18 nov |
| 4 | /blog/begrippen/unhinged/ | unhinged betekenis | 9,3 / – | 1.164 / 0 | 0 | 0% | 1.000 (KP) | 0,89 | jul | 179 | middel | ja, title 9 nov |
| 5 | /blog/drankspelletjes/kingsen/ | kingsen | 10,0 / 10,6 | 783 / 301 | 2 | 0,3% | 2.400 + 5.400 "regels" (KP) | 1,06 | **dec** | 151 | hoog | ja, tot 17 nov |
| 6 | /blog/begrippen/exclusief/ | exclusief betekenis | 9,6 / 9,5 | 479 / 628 | 0 | 0% | 880 (KP) | 1,12 | jan | 139 | hoog | ja, tot 17 nov |
| 7 | /blog/begrippen/idk/ | wat betekent idk | 9,4 / – | 270 / 0 | 0 | 0% | 1.300 (KP) | 0,93 | geen | 128 | middel | snippet tot 18 nov |
| 8 | /blog/begrippen/side-quest/ | sidequest betekenis | 6,9 / – | 337 / 0 | 0 | 0% | 1.900 (KP) | 0,82 | mei | 123 | middel | snippet tot 18 nov |
| 9 | /en/blog/drinking-games/fuck-the-dealer/ | fuck the dealer | 6,7 / – | 561 / 0 | 0 | 0% | onbekend | onbekend | onbekend | 119 | middel | ja, tot 17 nov |
| 10 | /en/blog/dictionary/screenshotting/ | screenshotting | 7,2 / – | 537 / 0 | 0 | 0% | 1.900 (KP) | 1,16 | dec | 114 | middel | snippet tot 18 nov |

- "p" op `/en/blog/dictionary/p/` (1.241 vertoningen, positie 9,2, vrijwel alleen desktop NL) is weggelaten. Een zoekopdracht van één letter heeft geen bruikbare intentie.
- Seizoensfactor: de maandvolumes tellen mee naar het aantal dagen in elke periode. November 2026 zit nog niet in Keyword Planner, dus daarvoor geldt november 2025. Voor termen die in 2026 sterk groeiden (side quest, unhinged) maakt dat de factor te laag.
- Keyword Planner gaf geen data voor "fuck the dealer", waarschijnlijk door het scheldwoord. Er is geen DataForSEO-call gedaan, omdat de pagina in rust staat.
- **Kingsen heeft de komende piek:** "kingsen regels" stijgt naar 6.600 in december. Zodra de rust op 17 november afloopt, is dit de eerste NL-pagina om aan te pakken (zie 4).

## 4. SERP-analyse per kanspagina

Momentopname via DataForSEO, mobiel, depth 20. Op mobiel toont Google maar 7 tot 10 organische resultaten op de eerste pagina. Search Console geeft ons positie 9 tot 12. Wij vielen in elke call net buiten de opgehaalde resultaten. Dat klopt met elkaar: we staan onderaan pagina 1 of net daaronder.

**Patroon bij begrippen:** de AI Overview, een videoblok en "People also ask" staan bovenaan. De organische resultaten zijn woordenboeken (Cambridge, Collins, Linguee, Forvo) en sociale posts (Facebook, TikTok, Reddit). Google citeert anytimer.app wel in de AI Overview voor unhinged (4 keer), idk en sidequest. Dat verklaart deels waarom de CTR nul is. Het antwoord staat al in de SERP.

| Zoekwoord | Top 5 organisch | SERP-features | Intentie | Wat zij hebben en wij niet |
|---|---|---|---|---|
| unhinged betekenis (NL) | facebook.com, forvo.com, filmtotaal.nl, linguee.nl, reddit.com | AI Overview (wij 4x geciteerd), Gerelateerde websites, PAA, video VRT | definitie + vertaling + film | uitspraak, Nederlandse vertalingen (losgeslagen, doorgedraaid), de film *Unhinged* |
| kingsen (NL) | leuke-drankspellen.nl, kingscup.app, drankspel.com, bierplezier, dronkapp.com | AI Overview (niet wij), app-pack | speluitleg + online spelen | "wat heb je nodig" als lijst, alle 13 kaarten als lijst, "2026" in de title, online variant |
| kingsen regels (NL) | kamernet.nl, kingscup.app, drankspellenonline.nl, fandom, ditishelmond.nl | AI Overview met benodigdheden + regels per kaart (niet wij) | regels per kaart | aparte lijst benodigdheden, Ring of Fire / Kings Cup als synoniem in de eerste zin |
| wat betekent idk (NL) | tiktok.com, scribd.com, facebook.com, medium.com, wikipedia (rapper) | AI Overview (wij geciteerd), PAA 4 vragen, video's | afkorting uitleggen | "afkorting", "in het Engels", "op WhatsApp" (actie 2) |
| sidequest betekenis (NL) | facebook.com, reverso.net, reddit.com, thegoodtrade.com, cambridge | AI Overview (wij geciteerd), video, PAA | definitie + gebruik | spelling aan elkaar, nevenmissie, TikTok-gebruik (actie 3) |
| exclusief betekenis (NL) | woorden.org, anw.ivdnt.org, enterhere.nl, reddit.com, e-matching.nl | AI Overview (niet wij): btw, luxe, exclusief daten | **gemengd** | de algemene betekenissen (exclusief btw, exclusief = luxe). Onze pagina gaat alleen over daten. |
| hard launch meaning (EN, PH) | launchpadagency.com, facebook.com, quora.com, kontentino.com, medium.com | AI Overview (niet wij), PAA soft/hard launch, korte video's | relatie + marketing | marketingbetekenis, werkwoordsvormen, voorbeelden (actie 1) |

Niet onderzocht (budget en context bewust beperkt, het patroon was na 7 calls duidelijk): seeing someone meaning, unpopular opinion meaning, screenshotting, fuck the dealer, unhinged vertaling. Ook geen content-parsing. De top 3 boven ons bestond uit Facebook, TikTok, Reddit en woordenboeken. Kontentino had een bruikbare pagina, maar DataForSEO gaf alleen een Google-redirect en geen echte URL.

## 5. Opvolging

| Actie (rapport) | Uitgevoerd | Effect |
|---|---|---|
| Kingsen title + H2 "Kingsen regels per kaart" (20 okt) | Ja, commit 80688ff | 14 dagen voor/na: paginavertoningen 1.119 → 864 (-23%), hoofdzoekwoorden 753 → 640, positie 10,2 → 10,6, klikken 2 → 0. Seizoensfactor ongeveer 1,0. Geen verbetering. Concurrenten en Google-updates spelen ook mee. |
| Exclusief tekst (20 okt) | Ja, commit f4fa3ac (één zin met link naar exclu) | Hoofdzoekwoorden 569 → 211 vertoningen (-63%), positie 9,6 → 9,9. Seizoensfactor ~1,1. Daling tegen het seizoen in. De wijziging was te klein om dit te verklaren. Waarschijnlijker: Google kiest voor deze zoekopdracht meer de algemene betekenis (btw, luxe). Indexering is in orde (PASS, canonical goed, gecrawld 22 okt). |
| Description-sjabloon begrippen (4 nov) | Ja | Te vroeg (8 dagen). |
| Unhinged "vertaling" in title (9 nov) | Ja, commit de6c47c | Te vroeg (3 dagen). De AI Overview toont nog de oude title "Wat betekent: Unhinged? - AnyTimerApp". Google heeft hem dus nog niet opnieuw gelezen. |
| Heavyweight (EN) "slang" in title | Onbekend, niet gecontroleerd | - |

**Les:** title- en tussenkopwijzigingen op pagina's rond positie 10 hebben nog niets opgeleverd. Bij deze SERP's zit het probleem niet in de snippet maar in de positie. Daarom gaan de acties deze week over inhoud, niet over titles.

## 6. Stijgers en dalers tegen het seizoen in

Alleen vaste combinaties van zoekwoord en pagina die in A en B voorkomen. De meeste toppagina's zijn nieuw en hebben geen data in B.

- **`/wat-is-de-beste-adt-timer/` (daling is vooral seizoen, gecorrigeerd na extra analyse):** 22 vaste combinaties. Vertoningen 1.264 → 986, klikken 82 → 49.
  - De meeste klikken komen van "adtmeister": positie 3,6 in A en B, vertoningen 644 → 490. Keyword Planner: 1.300 in september, 720 in oktober. Dat is de introductietijd die wegvalt. Geen rankingprobleem.
  - "adt timer" heeft maar 10 tot 30 vertoningen per week. De gemiddelde positie springt tussen 3 en 9 en stond in de laatste week weer op 3,0. De daling begon half september, ruim voor `/adt-timer/` live ging (4 november). De nieuwe pagina is dus niet de oorzaak.
  - `/adt-timer/` staat na 8 dagen op positie 9 à 10 voor "adt timer". Dat de tool die positie overneemt van de gids is het doel, geen kannibalisatie.
  - Echt verlies: `/blog/begrippen/adten/` viel van 428 naar 16 vertoningen. Hij is geïndexeerd, maar voor het laatst gecrawld op 20 september. "atten" (3.600/mnd) en "bier atten" (170/mnd) staan niet in de tekst.
  - `/adt-timer/` krijgt maar 2 interne links, en die komen allebei van de gids.
- **Exclusief (daler):** zie opvolging.
- **Kingsen (stijger in vertoningen):** 839 → 1.777 op vaste combinaties, terwijl de seizoensfactor ongeveer 1,0 is. Positie 10,8 → 11,1. De groei komt uit meer zoekwoordvarianten, niet uit een betere positie.

## 7. Data en beperkingen

- **Datums:** A 2026-10-13 t/m 2026-11-09, B 2026-09-15 t/m 2026-10-12. Search Console, type web, sc-domain:anytimer.app. Ruwe data staat in `seo-reports/data/2026-11-12/ranking/`, opgehaald om 10:19. Alle calls gaven minder dan 25.000 rijen, dus paginering was niet nodig.
- **Totalen (officieel, zonder dimensies):** A 91.930 vertoningen, 234 klikken, CTR 0,25%, positie 13,1. B 25.813, 212, 0,82%, 8,6.
- **Merkzoekwoorden (A):** 27 rijen, 316 vertoningen, 5 klikken. Niet meegeteld.
- **Eigen CTR-curve (A, gewogen naar vertoningen):** 1: 28% (std), 2: 15% (std), 3: 10% (std), 4: 2,8%, 5: 0,9%, 6: 0,1%, 7: 0,2%, 8: 0,1%, 9: 0,06%, 10: 0,04%, 11: 0,04%, 12: 0,05%, 13: 0,7%, 14: 0,1%, 15: 0,2%, 16: 0%, 17: 0,3%, 18 tot 20: std (0,7%, 0,6%, 0,5%). Posities 1 tot 3 hebben minder dan 300 vertoningen, daarom gelden daar de standaardwaarden. De eigen CTR op positie 6 tot 12 ligt ver onder de standaard. Dat zijn vrijwel allemaal begrippen met een AI Overview erboven.
- **Keyword Planner:** NL geo 2528 / taal 1010, 20 zoekwoorden. EN geo India + Filipijnen + VS (2356, 2608, 2840) / taal 1000, 12 zoekwoorden. Bestanden `kp_nl.json`, `kp_en.json`.
- **DataForSEO:** 7 SERP-calls (van de 15 toegestaan), 0 content-parses, 0 ranked-keywords, 0 historical. Kosten volgens de kostentabel van de plugin: $0,014. De response gaf zelf geen `cost`-veld. Er is geen ranked-keywords-call gedaan, omdat `tracking.csv` nieuw is en het budget naar SERP's ging. Doe die volgende run (stap 3c).
- **Indexering:** 1 inspectie (exclusief): PASS.
- **Rust:** alle begrippen snippet tot 18 november. Kingsen, exclusief, fuck the dealer (EN), adt timer-pagina's: inhoud en snippet tot 17 november of later. Unhinged: title 9 november.
- **Bestanden:** `actions.json` (4 acties met baseline), `serp_summary.json`, `followup_exclusief.json`, `followup_kingsen.json`, `insp_exclusief.json`, `seo-reports/tracking.csv` (nieuw).
