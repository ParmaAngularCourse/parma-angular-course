import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

type news = {
  header: string,
  dateTime: string,
  isChecked : boolean
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public isChecked : boolean = false;

  public items: news[] = [{
    header: "Заголовок 1",
    dateTime: "15.11.2021",
    isChecked: false
  },
  {
    header: "Заголовок 2",
    dateTime: "17.11.2021",
    isChecked: false
  },
  {
    header: "Заголовок 3",
    dateTime: "22.11.2021",
    isChecked: false
  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  Check(item : news): void {
   item.isChecked = !item.isChecked;
  }

}
