import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Restaurant, RESTAURANT_LIST } from '@lunch-gacha/data';
import { environment } from './../environments/environment';

@Component({
  selector: 'lunch-gacha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  readonly restaurantList: Restaurant[] = RESTAURANT_LIST;

  gachaResult: Restaurant | null = null;
  imageUrl: string | null = null;

  isNotGachaYet = true;
  isLoading = false;

  buttonText = 'ガチャを回す';

  imageRegex = new RegExp(
    /https:\/\/tblg.k-img.com\/restaurant\/images\/.*?\.jpg/
  );

  turnGacha(): void {
    if (this.isNotGachaYet) this.isNotGachaYet = false;
    const randomNum = Math.floor(Math.random() * this.restaurantList.length);
    this.gachaResult = this.restaurantList[randomNum];

    this.startLoading();
    this.http
      .get(`${environment.proxy}${this.gachaResult.url}`, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          const ogImageElement = this.imageRegex.exec(res);
          if (ogImageElement == null) return;
          this.imageUrl = ogImageElement[0] ?? null;
        },
        error: (error: unknown) => {
          console.log(error);
        },
        complete: () => this.endLoading(),
      });
  }

  startLoading(): void {
    this.isLoading = true;
    this.buttonText = 'ガチャを回しています…';
  }

  endLoading(): void {
    this.isLoading = false;
    this.buttonText = 'もう一度ガチャを回す';
  }
}
