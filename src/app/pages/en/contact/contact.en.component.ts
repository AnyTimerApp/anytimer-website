import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-en',
  standalone: true,
  templateUrl: 'contact.en.component.html',
  styleUrls: [
    '../../juridisch/juridisch.component.scss',
    '../../contact/contact.component.scss',
    '../../home/about/about.component.scss'
  ]
})
export class ContactEnComponent {
  faqs = [
    {
      question: 'How fast does AnyTimerApp reply?',
      answer: 'We do our best to reply to every message within 48 hours. On weekdays we usually reply within one working day. On weekends or holidays it can take a little longer. Got an urgent question? Just mention it in your email.',
      open: true
    },
    {
      question: 'What if I found a bug?',
      answer: 'Send an email to info@anytimer.app with a description of the problem, the device and operating system you use and what you were doing. Screenshots or a short video help a lot. The more details, the faster we can fix it.',
      open: false
    },
    {
      question: 'Can I work together with AnyTimerApp?',
      answer: 'Yes, definitely! We are open to partnerships with content creators, brands and others. Send us an email with a short intro about yourself and your idea. Then we will happily look at what is possible.',
      open: false
    }
  ];

  constructor(meta: Meta, @Inject(DOCUMENT) document: Document) {
    const title = 'Contact AnyTimerApp: questions, feedback and partnerships';
    const description = 'Get in touch with AnyTimerApp. Questions, feedback or an idea for a partnership? Send us an email and we will reply within 48 hours.';
    const image = 'https://anytimer.app/assets/Together.png';
    const url = 'https://anytimer.app/en/contact/';

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

    if (!document.getElementById('schema-contact-en')) {
      const script = document.createElement('script');
      script.id = 'schema-contact-en';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'inLanguage': 'en',
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
