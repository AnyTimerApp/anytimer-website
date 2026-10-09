import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface AppGame {
  name: string;
  description?: string;
  // Route of the matching blog post, if there is one.
  link?: string;
  linkText?: string;
  // Path under src/assets/games/, e.g. 'assets/games/bakplaten.webp'. Leave empty until the image is ready.
  image?: string;
  imageAlt?: string;
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  readonly games: AppGame[] = [
    {
      name: 'Any-timer',
      description: 'Time je adtje. Haal je vinger van het scherm, adten en leg je vinger terug. Zo zie je precies hoe snel je was.',
      link: '/wat-is-de-beste-adt-timer',
      linkText: 'Lees meer over de Any-timer'
    },
    {
      name: 'Boze bak'
    },
    {
      name: 'Finger roulette'
    },
    {
      name: 'Kamelenrace',
      description: 'Vier kamelen racen naar de finish. Zet slokken in op jouw kameel en hoop dat hij als eerste binnenkomt.',
      link: '/blog/drankspelletjes/de-paardenrace',
      linkText: 'Bekijk de spelregels van Kamelenrace'
    },
    {
      name: 'Dobbelen',
      description: 'Gooi de stenen en zorg dat jij niet de laagste worp van de ronde hebt. Je kan de dobbelstenen gebruiken om te Mexen.',
      link: '/blog/drankspelletjes/mexen',
      linkText: 'Bekijk de spelregels van Dobbelen'
    },
    {
      name: 'Bakplaten',
      description: 'Trek een kaart. Is het een plaatje? Dan ben jij aan de beurt om te drinken.',
      link: '/blog/drankspelletjes/bakplaten',
      linkText: 'Bekijk de spelregels van Bakplaten'
    }
  ];
}
