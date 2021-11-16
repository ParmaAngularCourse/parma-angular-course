import { Component, OnInit } from '@angular/core';

type userCard = {
  name: string,
  surname: string,
  address?: {
    street: string,
    house: string
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: number = 1;
  public user: userCard = {
    name: 'Иван',
    surname: 'Петров'
  };
  public headerClass: string = "color_blue";
  public style_color: string = "yellow";
  public randomValue: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.randomColor();
    this.random();
  }

  random() {
    this.randomValue = 0.0970815629000421;
  }

  randomColor() {
    setTimeout(() => {
      this.headerClass = "color_red";
      setTimeout(() => {
        this.headerClass = "color_blue";
      }, 3000);
    }, 3000);
  }

  changeColor(color: string) {
    this.style_color=color;
  }

  getInputValue($event: Event) {
    this.changeColor(($event.target as HTMLInputElement).value);
  }
}
