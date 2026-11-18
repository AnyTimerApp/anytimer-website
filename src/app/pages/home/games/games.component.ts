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
      link: '/adt-timer',
      linkText: 'Probeer de Any-timer online',
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
    },
    {
      name: 'Bakmachine',
      description: 'Een gokkast voor bakken. Draai drie wielen. Drie volle bakken? Deel er een uit. Drie lege? Dan trek je er zelf een.',
      link: '/blog/drankspelletjes/bakmachine',
      linkText: 'Bekijk de spelregels van Bakmachine',
      image: 'assets/blogs/drankspel/bakmachine.webp',
      imageAlt: 'Twee vrienden spelen Bakmachine op een telefoon en drukken op draaien'
    },
    {
      name: 'Imposter',
      description: 'Iedereen krijgt hetzelfde geheime woord, behalve de imposter. Geef om de beurt een hint en ontmasker de bluffer.',
      link: '/blog/drankspelletjes/imposter',
      linkText: 'Bekijk de spelregels van Imposter',
      image: 'assets/blogs/drankspel/imposter.webp',
      imageAlt: 'Vrienden spelen het imposter spel en wijzen lachend naar de imposter naast een telefoon'
    },
    {
      name: 'Zeeslag',
      description: 'Verstop je schepen en raad waar die van de ander liggen. Wordt jouw schip geraakt? Dan moet je drinken.',
      link: '/blog/drankspelletjes/zeeslag',
      linkText: 'Bekijk de spelregels van Zeeslag',
      image: 'assets/blogs/drankspel/zeeslag.webp',
      imageAlt: 'Zeeslag drankspel met het Zeeslag bord en pionnen'
    },
    {
      name: 'Krokodillenspel',
      description: 'Druk om de beurt een tand in. Klapt de bek van de krokodil dicht? Dan heb je verloren.',
      link: '/blog/drankspelletjes/krokodillenspel',
      linkText: 'Bekijk de spelregels van Krokodillenspel',
      image: 'assets/blogs/drankspel/krokodil.webp',
      imageAlt: 'Krokodillenspel met het spel Krokodil met Kiespijn en shotglazen'
    }
  ],
  // Game names match the English version of the app.
  en: [
    {
      name: 'Any-timer',
      description: 'Time your chug. Lift your finger off the screen, down your drink and put your finger back. Now you know exactly how fast you were.',
      link: '/en/chug-timer',
      linkText: 'Try the Any-timer online',
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
    },
    {
      name: 'Chug Machine',
      description: 'A slot machine for chugs. Spin three reels. Three full mugs? Hand one out. Three empty ones? Then you chug yourself.',
      link: '/en/blog/drinking-games/chug-machine',
      linkText: 'See the rules of Chug Machine',
      image: 'assets/blogs/drankspel/bakmachine.webp',
      imageAlt: 'Two friends playing Chug Machine on a phone and tapping spin'
    },
    {
      name: 'Imposter',
      description: 'Everyone gets the same secret word, except the imposter. Take turns giving a hint and unmask the bluffer.',
      link: '/en/blog/drinking-games/imposter',
      linkText: 'See the rules of Imposter',
      image: 'assets/blogs/drankspel/imposter.webp',
      imageAlt: 'Friends playing the imposter game and laughing as they point at the imposter next to a phone'
    },
    {
      name: 'Battleship',
      description: 'Hide your ships and guess where the other player\'s ships are. Is your ship hit? Then you drink.',
      link: '/en/blog/drinking-games/battleship',
      linkText: 'See the rules of Battleship',
      image: 'assets/blogs/drankspel/zeeslag.webp',
      imageAlt: 'Battleship drinking game with the board and pegs'
    },
    {
      name: 'Crocodile Dentist',
      description: 'Take turns pressing a tooth. Does the crocodile snap its jaws shut? Then you lose.',
      link: '/en/blog/drinking-games/crocodile-dentist',
      linkText: 'See the rules of Crocodile Dentist',
      image: 'assets/blogs/drankspel/krokodil.webp',
      imageAlt: 'Crocodile Dentist game with shot glasses'
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
