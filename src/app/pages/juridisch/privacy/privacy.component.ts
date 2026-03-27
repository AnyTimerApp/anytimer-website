import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'privacy.component.html',
  styleUrl: '../juridisch.component.scss'
})
export class PrivacyComponent {
  constructor(meta: Meta) {
    meta.updateTag({ name: 'description', content: 'Privacybeleid van de Anytimer app. Wij gaan zorgvuldig om met jouw gegevens — AVG-conform, geen advertenties en geen dataverkoop aan derden.' });
  }
}
