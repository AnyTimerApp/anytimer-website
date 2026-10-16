import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: 'not-found.component.html',
  styleUrl: 'not-found.component.scss'
})
export class NotFoundComponent {
  readonly ui = inject(LanguageService).ui;
}
