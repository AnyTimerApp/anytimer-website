import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HowItWorksComponent, FeaturesComponent, AboutComponent, TeamComponent],
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Anytimer App — Vergeet nooit meer wie jou een anytimer schuldig is';
    const description = 'Houd anytimers bij met de gratis Anytimer app. Wat is een anytimer? Een tegoed dat je op elk moment kunt inzetten. Download de anytimerapp en vergeet nooit meer wie jou er een schuldig is.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/';

    meta.updateTag({ name: 'description', content: description });

    // Open Graph
    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });

    // Twitter Card
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    // JSON-LD Schema
    if (!document.getElementById('schema-home')) {
      const script = document.createElement('script');
      script.id = 'schema-home';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'MobileApplication',
            'name': 'Anytimer',
            'operatingSystem': ['Android', 'iOS'],
            'applicationCategory': 'SocialNetworkingApplication',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
            'description': description,
            'url': 'https://anytimer.app',
            'image': 'https://anytimer.app/assets/logo.png',
            'downloadUrl': [
              'https://apps.apple.com/nl/app/anytimerapp/id6758271174',
              'https://play.google.com/store/apps/details?id=com.anytimer.app'
            ],
            'inLanguage': 'nl'
          },
          {
            '@type': 'Organization',
            'name': 'Anytimer',
            'url': 'https://anytimer.app',
            'logo': 'https://anytimer.app/assets/logo.png',
            'sameAs': [
              'https://apps.apple.com/nl/app/anytimerapp/id6758271174',
              'https://play.google.com/store/apps/details?id=com.anytimer.app'
            ]
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Wat is een anytimer?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'Een anytimer is eigenlijk gewoon een tegoed dat je van je vrienden kunt krijgen of aan iemand kunt geven. Bijvoorbeeld na een verloren challenge, domme actie of weddenschap. En het leuke is: die kan op elk moment ingezet worden. Dus ja, ook op een brak moment of precies wanneer het het minst uitkomt.' }
              },
              {
                '@type': 'Question',
                'name': 'Is de AnyTimerApp gratis te gebruiken?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'Ja, de app is gewoon gratis te gebruiken.' }
              },
              {
                '@type': 'Question',
                'name': 'Hoe voeg ik een Anytimer toe?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'Ga naar je vriendenlijst, kies de juiste persoon en voeg daar een anytimer toe. Je kunt er ook nog iets bij zetten, zoals een foto, video of berichtje als bewijs. Daarna wordt die gewoon opgeslagen in jullie overzicht.' }
              },
              {
                '@type': 'Question',
                'name': 'Hoe zet ik een Anytimer in?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'Ga naar je vriendenlijst, kies de juiste persoon en zet een anytimer in. Als je een anytimer inzet, krijgt je vriend daar meteen een melding van. Die anytimer gaat dan van je score af.' }
              },
              {
                '@type': 'Question',
                'name': 'Wat als iemand een anytimer niet accepteerd?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'In eerste instantie blijft die zichtbaar als openstaand. Als de ander niet accepteerd krijg je je any terug. Zo blijft het voor iedereen duidelijk wat er nog staat en krijg je geen eindeloze discussies over wie wat nog tegoed heeft.' }
              }
            ]
          }
        ]
      });
      document.head.appendChild(script);
    }
  }
}
