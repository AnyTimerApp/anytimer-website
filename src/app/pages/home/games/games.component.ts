import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
import { Lang } from '../../../i18n/lang';

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

const GAMES: Record<Lang, AppGame[]> = {
  nl: [
    {
      name: 'Any-timer',
      description: 'Time je adtje. Haal je vinger van het scherm, adten en leg je vinger terug. Zo zie je precies hoe snel je was.',
      link: '/wat-is-de-beste-adt-timer',
      linkText: 'Lees meer over de Any-timer',
      image: 'assets/blogs/beste timer/Any-timer in de club.webp',
      imageAlt: 'Any-timer in de club'
    },
    {
      name: 'Boze bak',
      description: 'Druk om de beurt op een blije bak. Eén ervan is de boze bak. Druk je daarop, dan heb je verloren.',
      link: '/blog/drankspelletjes/boze-bak',
      linkText: 'Bekijk de spelregels van Boze bak',
      image: 'assets/blogs/drankspel/bozebak.webp',
      imageAlt: 'Vrienden spelen Boze bak op een telefoon met blije bakken en één boze bak'
    },
    {
      name: 'Finger roulette',
      description: 'Iedereen legt een vinger op het scherm en de telefoon kiest er één. Wat die persoon moet doen, bepalen jullie zelf.',
      link: '/blog/drankspelletjes/finger-roulette',
      linkText: 'Bekijk de spelregels van Finger roulette',
      image: 'assets/blogs/drankspel/finger roulette.webp',
      imageAlt: 'Vrienden spelen Finger roulette met hun vingers op het scherm van een telefoon'
    },
    {
      name: 'Kamelenrace',
      description: 'Vier kamelen racen naar de finish. Zet slokken in op jouw kameel en hoop dat hij als eerste binnenkomt.',
      link: '/blog/drankspelletjes/de-paardenrace',
      linkText: 'Bekijk de spelregels van Kamelenrace',
      image: 'assets/blogs/drankspellen/paardenrace.webp',
      imageAlt: 'De Paardenrace drankspel met azen als paarden'
    },
    {
      name: 'Dobbelen',
      description: 'Gooi de stenen en zorg dat jij niet de laagste worp van de ronde hebt. Je kan de dobbelstenen gebruiken om te Mexen.',
      link: '/blog/drankspelletjes/mexen',
      linkText: 'Bekijk de spelregels van Dobbelen',
      image: 'assets/blogs/drankspellen/mexen.webp',
      imageAlt: 'Dobbelstenen voor Mexen als drankspel'
    },
    {
      name: 'Bakplaten',
      description: 'Trek een kaart. Is het een plaatje? Dan ben jij aan de beurt om te drinken.',
      link: '/blog/drankspelletjes/bakplaten',
      linkText: 'Bekijk de spelregels van Bakplaten',
      image: 'assets/blogs/drankspellen/bakplaten.webp',
      imageAlt: 'Bakplaten kaartspel als simpel drankspel'
    }
  ],
  // Game names match the English version of the app.
  en: [
    {
      name: 'Any-timer',
      description: 'Time your chug. Lift your finger off the screen, down your drink and put your finger back. Now you know exactly how fast you were.',
      link: '/en/blog/inspiration/best-chug-timer',
      linkText: 'Read more about the Any-timer',
      image: 'assets/blogs/beste timer/Any-timer in de club.webp',
      imageAlt: 'The Any-timer in the club'
    },
    {
      name: 'Angry Mug',
      description: 'Take turns tapping a happy mug. One of them is the angry mug. Tap that one and you lose.',
      link: '/en/blog/drinking-games/angry-mug',
      linkText: 'See the rules of Angry Mug',
      image: 'assets/blogs/drankspel/bozebak.webp',
      imageAlt: 'Friends playing Angry Mug on a phone with happy mugs and one angry mug'
    },
    {
      name: 'Finger Roulette',
      description: 'Everyone puts a finger on the screen and the phone picks one. What that person has to do is up to you.',
      link: '/en/blog/drinking-games/finger-roulette',
      linkText: 'See the rules of Finger Roulette',
      image: 'assets/blogs/drankspel/finger roulette.webp',
      imageAlt: 'Friends playing Finger Roulette with their fingers on a phone screen'
    },
    {
      name: 'Camel Race',
      description: 'Four camels race to the finish. Bet sips on your camel and hope it crosses the line first.',
      link: '/en/blog/drinking-games/horse-race',
      linkText: 'See the rules of Camel Race',
      image: 'assets/blogs/drankspellen/paardenrace.webp',
      imageAlt: 'Horse Race drinking game with aces as horses'
    },
    {
      name: 'Dice',
      description: 'Roll the dice and make sure you don\'t have the lowest roll of the round. You can use the dice to play Mexico.',
      link: '/en/blog/drinking-games/mexico',
      linkText: 'See the rules of Mexico',
      image: 'assets/blogs/drankspellen/mexen.webp',
      imageAlt: 'Dice for the Mexico drinking game'
    },
    {
      name: 'Bakplaten',
      description: 'Draw a card. Is it a face card? Then it\'s your turn to drink.',
      link: '/en/blog/drinking-games/bakplaten',
      linkText: 'See the rules of Bakplaten',
      image: 'assets/blogs/drankspellen/bakplaten.webp',
      imageAlt: 'Bakplaten, a simple Dutch card drinking game'
    }
  ]
};

const TEXT = {
  nl: {
    label: 'Spellen',
    title: 'Drankspellen in de app',
    intro: 'Naast het bijhouden van je anytimers zitten in de app ook drankspelletjes. We komen vrijwel elke week met een nieuw spel uit.',
    altSuffix: ' spel in de AnyTimerApp'
  },
  en: {
    label: 'Games',
    title: 'Drinking games in the app',
    intro: 'Besides tracking your anytimers, the app comes with drinking games. We release a new game almost every week.',
    altSuffix: ' game in the AnyTimerApp'
  }
};

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  private readonly lang = inject(LanguageService).lang();
  readonly t = TEXT[this.lang];
  readonly games: AppGame[] = GAMES[this.lang];
}
