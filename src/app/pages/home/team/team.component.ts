import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';

const TEXT = {
  nl: {
    label: 'Over ons',
    title: 'Gebouwd door vrienden, voor vrienden.',
    text: 'Wij hebben de AnyTimerApp gebouwd omdat anytimers bijhouden in je notities of gewoon in je hoofd eigenlijk nooit goed werkt. Voor je het weet komt Jilles weer aanzetten met tien any’s die hij niet meer kan verklaren. Daarom wilden we één plek maken waar je anytimers en herinneringen makkelijk bijhoudt',
    question: 'Vragen of feedback? We horen het graag.',
    contact: 'Contact opnemen'
  },
  en: {
    label: 'About us',
    title: 'Built by friends, for friends.',
    text: 'We built AnyTimerApp because tracking anytimers in your notes or in your head never works. Before you know, Jilles shows up with ten anys he can\'t explain anymore. So we created a place where you can easily keep track of your anytimers and memories.',
    question: 'Questions or feedback? We\'d love to hear from you.',
    contact: 'Get in touch'
  }
};

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'team.component.html',
  styleUrl: 'team.component.scss'
})
export class TeamComponent {
  private readonly language = inject(LanguageService);
  readonly t = TEXT[this.language.lang()];
  readonly ui = this.language.ui();

  members = [
    {
      name: 'Martijn',
      role: 'Developer',
      webp: 'assets/team/Marty.webp',
      png: 'assets/team/Marty.png'
    },
    {
      name: 'Stijn',
      role: 'Developer',
      webp: 'assets/team/Stijn.webp',
      png: 'assets/team/Stijn.png'
    },
    {
      name: 'Jilles',
      role: 'Marketing',
      webp: 'assets/team/Jill.webp',
      png: 'assets/team/Jill.png'
    }
  ];

  offsets = [0, 40, 16];
}