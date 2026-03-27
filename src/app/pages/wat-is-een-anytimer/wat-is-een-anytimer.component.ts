import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wat-is-een-anytimer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'wat-is-een-anytimer.component.html',
  styleUrl: '../juridisch/juridisch.component.scss'
})
export class WatIsEenAnytimer {
  constructor(meta: Meta) {
    meta.updateTag({ name: 'description', content: 'Wat is een anytimer? Een anytimer is een tegoed dat je van een vriend krijgt of aan iemand geeft — in te zetten op elk moment. Lees alles over het concept achter de anytimerapp.' });
  }
}
