import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-download-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './download-cta.component.html',
  styleUrl: './download-cta.component.scss'
})
export class DownloadCtaComponent {}
