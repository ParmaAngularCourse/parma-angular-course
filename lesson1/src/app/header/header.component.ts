import { Component, OnInit } from '@angular/core';
type userCard = {
  name: string,
  surname: string,
  addres?: {
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
  public title: string = 'Заголовок'
  public user: userCard = {
    name: 'Ivan',
    surname: 'Petrov'
  }

  //По умолчанию все поля публичные
  public headerClass: string = 'color_blue';
  public randomValue: number = 0; 
  public myWidth: number = 30;
  public style_color: string = 'blue';

  constructor() { }
 
  ngOnInit(): void {
    this.randomColor();
    this.random();
  }

  random() {
    this.randomValue = Math.random();
  }

  randomColor() {
    setTimeout(()=> {
        this.headerClass = "color_red";
        setTimeout(()=> {
          this.headerClass = "color_blue";
        }, 3000);
    }, 3000);

  }

  changeColor(color: string){
    this.style_color = color;
  }

  getInputValue($event: Event){
    this.changeColor(($event.target as HTMLInputElement).value);
  }

}
