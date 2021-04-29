import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamificationServiceService {


  messages:string[] = [
    `Small steps motivate. Big steps overwhelm. - Maxime Lagacé`,
    `The first step is you have to say that you can. - Will Smith`,
    `A problem is a chance for you to do your best.- Duke Ellington `,
    `I am thankful to all who said no to me. 
     It is because of them that I’m doing it myself.- Albert Einstein`,
    `Be thankful for what you have; you’ll end up having more. - Oprah Winfrey`,
    `Try to be a rainbow in someone’s cloud. - Maya Angelou`,
    `With the new day comes new strength and new thoughts.  - Eleanor Roosevelt`,
    `Believe deep down in your heart that you’re destined to do great things - Joe Paterno`,
    `One person can make a difference, and everyone should try. - John F. Kennedy`,
    `Attitude is a little thing that makes a big difference. - Winston Churchill`,
    `I ask not for a lighter burden, but for broader shoulders. -  Jewish proverb`,
    `First say to yourself what you would be; and then do what you have to do. - Epictetus`,
    `The question isn’t who’s going to let me; it’s who is going to stop me. - Ayn Rand`,
    `I have decided to be happy, because it’s good for my health. - Voltaire`,
    `It doesn’t matter how slow you go, as long as you don’t stop. - Confucius`,
    `Always turn a negative situation into a positive situation. - Michael Jordan`,
    `The best way to predict the future is to create it. - Abraham Lincoln`,
    `The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt`,
    `Optimism is the faith that leads to achievement. 
      Nothing can be done without hope or confidence. - Helen Keller`
  ];


  constructor() { }

  getQuoteMessage(): string {
    return this.messages[Math.floor(Math.random() * this.messages.length)]
  }
}
