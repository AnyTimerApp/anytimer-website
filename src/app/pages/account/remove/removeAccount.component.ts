import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-removeAccount',
  standalone: true,
  templateUrl: 'removeAccount.component.html',
  styleUrl: '../../juridisch/juridisch.component.scss'
})
export class RemoveAccountComponent {
  constructor(meta: Meta) {
    meta.updateTag({ name: 'description', content: 'Verwijder je Anytimer account via de app-instellingen. Stap-voor-stap uitleg over hoe het werkt en wat er met je gegevens gebeurt na verwijdering.' });
  }
}
