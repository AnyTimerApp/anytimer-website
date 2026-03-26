import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  faqs = [
    {
      question: 'Wat is een Anytimer?',
      answer: 'Een anytimer is een belofte tussen vrienden. Als iemand iets geks doet, een challenge verliest of een weddenschap verliest, dan ontvangt diegene een anytimer. Die kan op elk moment uitgedeeld worden — een biertje op maandagavond, op een brakke ochtend of tijdens een familiefeestje. De mogelijkheden zijn eindeloos.',
      open: true
    },
    {
      question: 'Is Anytimer gratis te gebruiken?',
      answer: 'Ja! De kernfuncties van Anytimer zijn volledig gratis. We bieden een Premium-abonnement met extra functies zoals aangepaste berichten, langere media-bewaartijd en nieuwe toekomstige features.',
      open: false
    },
    {
      question: 'Hoe voeg ik een Anytimer toe?',
      answer: 'Open de app, ga naar je vriendenlijst en selecteer de vriend die een anytimer verdiend heeft. Tik op "Toevoegen", voeg optioneel een foto, video of bericht toe als bewijs, en sla op. De anytimer staat direct in jullie gezamenlijke saldo.',
      open: false
    },
    {
      question: 'Wat gebeurt er als ik een Anytimer inzet?',
      answer: 'Wanneer je een anytimer inzet (uitdeelt), krijgt je vriend direct een realtime pushmelding. Het saldo wordt automatisch bijgewerkt en de anytimer is gemarkeerd als gebruikt. Je vriend kan de melding niet negeren!',
      open: false
    },
    {
      question: 'Is mijn data veilig?',
      answer: 'Absoluut. We nemen privacy serieus. Je gegevens worden veilig opgeslagen en nooit gedeeld met derden. Bekijk ons privacybeleid voor alle details.',
      open: false
    },
    {
      question: 'Kan ik Anytimer gebruiken met groepen?',
      answer: 'Ja! Je kunt meerdere vrienden toevoegen en met de hele vriendengroep gebruiken. Iedereen heeft zijn eigen profiel en overzicht van de onderlinge anytimers.',
      open: false
    },
    {
      question: 'Wat als iemand mijn Anytimer niet accepteert?',
      answer: 'De app registreert alle anytimers objectief. Als iemand een anytimer niet accepteert, blijft deze zichtbaar in het saldo als openstaand. Zo is er altijd een eerlijk overzicht voor iedereen.',
      open: false
    }
  ];

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
