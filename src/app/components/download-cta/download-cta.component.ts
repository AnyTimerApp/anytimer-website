import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-download-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './download-cta.component.html',
  styleUrl: './download-cta.component.scss'
})
export class DownloadCtaComponent {
  readonly ui = inject(LanguageService).ui;
}
