import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'terms.component.html',
  styleUrl: '../juridisch.component.scss'
})
export class TermsComponent {
  constructor(meta: Meta) {
    meta.updateTag({ name: 'description', content: 'Gebruiksvoorwaarden van de Anytimer app. Lees wat je van ons mag verwachten en welke regels gelden voor het gebruik van de anytimerapp.' });
  }
}
