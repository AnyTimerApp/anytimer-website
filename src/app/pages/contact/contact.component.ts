import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: 'contact.component.html',
  styleUrls: ['../juridisch/juridisch.component.scss', 'contact.component.scss']
})
export class ContactComponent {
  constructor(meta: Meta) {
    meta.updateTag({ name: 'description', content: 'Neem contact op met het Anytimer team. Heb je een vraag over de anytimerapp, een probleem of een idee? Stuur ons een mail — we reageren binnen 48 uur.' });
  }
}
