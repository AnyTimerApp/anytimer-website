import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../shared/breadcrumb-schema';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
}
