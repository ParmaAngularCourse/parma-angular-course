import { Component, OnInit } from '@angular/core';

type items = {
  clicked: boolean,
  date: string,
  tytle: string,
}

@Component({
  selector: 'app-newsbox',
  templateUrl: './newsbox.component.html',
  styleUrls: ['./newsbox.component.css']
})
export class NewsboxComponent implements OnInit {
  public brd: string = "brd";
  public items = [
    {clicked: false, date: new Date('November 27, 2021 12:00:00 GMT+0000'), tytle:'Здесь должен быть первый заголовок' },
    {clicked: false, date: new Date('November 28, 2021 12:00:00 GMT+0000'), tytle:'Здесь должен быть второй заголовок'},
    {clicked: false, date: new Date('November 29, 2021 12:00:00 GMT+0000'), tytle:'Здесь должен быть третий заголовок'},
    {clicked: false, date: new Date('November 30, 2021 12:00:00 GMT+0000'), tytle:'Здесь должен быть четвертый заголовок'},
  ];
  public style_color: string = "blue";

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(item: any) { 
    this.items.map((elem) => {
      if (elem.tytle === item.tytle) {
        elem.clicked = !elem.clicked;
      }
    })
  }

}
