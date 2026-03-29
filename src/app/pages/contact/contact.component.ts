import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: 'contact.component.html',
  styleUrls: [
    '../juridisch/juridisch.component.scss',
    'contact.component.scss',
    '../home/about/about.component.scss'
  ]
})
export class ContactComponent {
  faqs = [
    {
      question: 'Hoe snel reageert AnyTimerApp?',
      answer: 'We doen ons best om binnen 48 uur te reageren op alle berichten. Op werkdagen reageren we doorgaans binnen één werkdag. In het weekend of op feestdagen kan het iets langer duren. Heb je een dringende vraag? Vermeld dat dan even in je mail.',
      open: true
    },
    {
      question: 'Wat als ik een bug gevonden heb?',
      answer: 'Stuur een mail naar info@anytimer.app met een omschrijving van het probleem, op welk apparaat en besturingssysteem je het ziet, en wat je aan het doen was. Screenshots of een korte video helpen enorm. Hoe meer details, hoe sneller we het kunnen oplossen.',
      open: false
    },
    {
      question: 'Kan ik ook samenwerken met AnyTimerApp?',
      answer: 'Ja, zeker! We staan open voor samenwerkingen met content creators, merken en andere partijen. Stuur ons een mail met een korte uitleg over jezelf en je idee, dan kijken we graag samen wat er mogelijk is.',
      open: false
    }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Contact — AnyTimerApp';
    const description = 'Neem contact op met het AnyTimerApp team. Heb je een vraag over de anytimerapp, een probleem of een idee? Stuur ons een mail — we reageren binnen 48 uur.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/contact';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: image });

    if (!document.getElementById('schema-contact')) {
      const script = document.createElement('script');
      script.id = 'schema-contact';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': this.faqs.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
        }))
      });
      document.head.appendChild(script);
    }
  }

  toggle(i: number) {
    this.faqs[i].open = !this.faqs[i].open;
  }
}
