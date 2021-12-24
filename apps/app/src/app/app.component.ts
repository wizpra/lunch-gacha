import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { THEME_LIST } from '@lunch-gacha/data';
import { environment } from './../environments/environment';

@Component({
  selector: 'lunch-gacha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  readonly themeList: string[] = THEME_LIST;

  result: string | null = null;

  isNotGachaYet = true;
  isLoading = false;

  buttonText = 'ガチャを回す';

  turnGacha(): void {
    this.startLoading();
    if (this.isNotGachaYet) this.isNotGachaYet = false;
    const randomNum = Math.floor(Math.random() * this.themeList.length);
    this.result = this.themeList[randomNum];
    this.endLoading();
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
