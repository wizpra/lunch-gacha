import { Component } from '@angular/core';
import { Restaurant, RESTAURANT_LIST } from '@lunch-gacha/data';

@Component({
  selector: 'lunch-gacha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly restaurantList: Restaurant[] = RESTAURANT_LIST;

  gachaResult: Restaurant | null = null;

  turnGacha(): void {
    const randomNum = Math.floor(Math.random() * this.restaurantList.length);
    this.gachaResult = this.restaurantList[randomNum];
  }
}
