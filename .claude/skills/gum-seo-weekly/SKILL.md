---
name: gum-seo-weekly
description: >
  Weekly SEO analysis for anytimer.app. Pulls Google Search Console data and Google Ads
  Keyword Planner search volumes through the gum CLI, compares the last 28 days against the
  28 days before, and writes a concrete action report to seo-reports/<date>.md. Use when the
  user asks for the weekly SEO analysis, an SEO report, "gum-seo-weekly", or when it runs as
  a scheduled task. Read-only: no git commands, no gum writes, no site changes.
---

# gum-seo-weekly

Doe de wekelijkse SEO-analyse voor anytimer.app. Werk alleen lezend: geen git-acties, geen schrijf-calls in gum (nooit `--allow-write`) en geen wijzigingen aan de site. Het eindresultaat is één rapport.

## 1. Data ophalen met gum

Search Console wordt 2 à 3 dagen vertraagd bijgewerkt. Neem daarom als einddatum vandaag min 3 dagen.
Periode A = de laatste 28 dagen tot die einddatum. Periode B = de 28 dagen daarvoor.

Voor elke periode:

```bash
gum read searchconsole.searchanalytics.query --args '{"siteUrl":"sc-domain:anytimer.app","body":{"startDate":"…","endDate":"…","dimensions":["query","page"],"rowLimit":5000}}' --output json
```

Haal ook voor periode A alleen de dimensie `"page"` op (totalen per pagina).

Zoekvolumes (Nederland, Nederlands). Maximaal 1000 zoekwoorden per call:

```bash
gum read googleads.keywordPlanIdeas.generateKeywordHistoricalMetrics --args '{"keywords":[…],"geoTargetConstants":["2528"],"language":"1010"}' --output json
```

Doe dit voor alle zoekwoorden uit periode A met minstens 20 vertoningen.

Nieuwe zoekwoordideeën:

```bash
gum read googleads.keywordPlanIdeas.generateKeywordIdeas --args '{"keywords":[…],"geoTargetConstants":["2528"],"language":"1010"}' --output json
```

Seeds (maximaal 10 per call): "betekenis studententaal", "drankspel", "drankspelletjes regels", "kaartspel drinken", plus de 5 zoekwoorden met de meeste vertoningen.

Zet ruwe data in `seo-reports/data/<datum>/` en lees die van daaruit. Plak geen grote JSON in je antwoord.

Faalt een gum-call op inloggen (bijvoorbeeld een verlopen token of `AUTHORIZATION_ERROR`)? Stop dan en meld welk commando de gebruiker moet draaien (`gum login --service searchconsole` of `gum login --service googleads`). Schrijf geen rapport op halve data.

Notes:
- gum 2.3.1 eist nog een developer token voor Google Ads. Google gebruikt die sinds 2026-09-09 niet meer, dus er is een placeholder opgeslagen. Meldt gum `missing developer token`, zet dan opnieuw een placeholder met `gum auth use-ads-developer-token --stdin`.
- Te kleine of grove zoekwoorden (bijvoorbeeld "fuck de dealer") krijgen geen zoekvolume. Gebruik daar alleen de Search Console-cijfers en zeg dat erbij.

## 2. Context van de site

- Pagina's en titels: `src/app/app.routes.ts`. Meta descriptions staan in de component-constructors en voor begrippen in `src/app/pages/blog/blog-posts.data.ts`. Teksten van begrippen staan in `src/app/pages/blog-term/begrippen-content.data.ts`.
- Prioriteitscategorieën: Begrippen (`/blog/begrippen/…`) en Drankspelletjes.
- Engelse versie onder `/en/`. Neem die mee als aparte groep.
- Lees het vorige rapport in `seo-reports/` (als dat er is). Kijk of de aanbevelingen van toen zijn uitgevoerd (`git log` sinds die datum, alleen lezen) en wat ze hebben opgeleverd.

## 3. Analyse

a. **Totaalbeeld:** klikken, vertoningen, CTR en gemiddelde positie, A tegenover B. Noem de top 10 stijgers en de top 10 dalers (zoekwoorden en pagina's).

b. **Kansen op striking distance:** zoekwoorden op positie 5 tot 20 met zoekvolume ≥ 100. Sorteer op potentieel = zoekvolume × (verwachte CTR op positie 3 − huidige CTR). Gebruik als verwachte CTR: positie 1 ≈ 28%, 2 ≈ 15%, 3 ≈ 10%, 5 ≈ 6%, 10 ≈ 2,5%.

c. **CTR-probleem:** pagina's met veel vertoningen waarvan de CTR duidelijk onder de verwachte CTR voor hun positie ligt. Geef per pagina de huidige title en description uit de code en een nieuw voorstel.

d. **Kannibalisatie:** zoekwoorden waarbij twee of meer van onze pagina's vertoningen krijgen. Zeg welke pagina de hoofdpagina moet zijn.

e. **Content gaps:** zoekwoordideeën met zoekvolume ≥ 50 waarvoor nog geen pagina bestaat. Check dit tegen de begrippen- en drankspellenlijst. Vooral nieuwe begrippen en drankspellen.

f. **Interne links:** belangrijke pagina's uit punt b die weinig interne links krijgen. Stel 3 tot 5 concrete links voor (van welke pagina naar welke, met welke ankertekst). Link elk onderwerp maar één keer per pagina.

g. **Seizoen:** gebruik de maandvolumes van Keyword Planner. Welke zoekwoorden pieken in de komende 4 tot 8 weken? Bijvoorbeeld de introductietijd, kerst of carnaval.

## 4. Rapport

Schrijf naar `seo-reports/<JJJJ-MM-DD>.md` in het Nederlands. Korte, punctuele zinnen, geen em-dashes. Zet nooit "| AnyTimerApp" aan het einde van voorgestelde titels.

Volgorde:

1. **Samenvatting in 5 regels:** wat ging goed, wat ging slecht, wat is de belangrijkste actie.
2. **Top 5 acties voor deze week**, gesorteerd op verwachte impact. Per actie:
   - de pagina en het bestand
   - wat er precies verandert (exacte nieuwe title of description, of de tekst van de interne link)
   - de onderbouwing met cijfers: zoekvolume, positie, CTR
3. **Tabellen** voor de analyse uit punt a tot en met g.
4. **Opvolging vorige week:** wat is gedaan en wat het effect is.
5. **Nieuwe pagina-ideeën:** maximaal 5, met zoekvolume.

Maak de aanbevelingen concreet en uitvoerbaar, geen algemene SEO-tips. Is een conclusie gebaseerd op weinig data (minder dan 50 vertoningen)? Zeg dat er dan bij.

Sluit af met de bestandsnaam van het rapport en de top 5 acties in je antwoord. Voer zelf geen acties uit. De gebruiker kiest welke acties worden uitgevoerd.
