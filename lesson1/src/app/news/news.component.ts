import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { News } from './News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public items: News[] = [{
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

  check(item: News): void {
    item.isChecked = !item.isChecked;
  }

}
