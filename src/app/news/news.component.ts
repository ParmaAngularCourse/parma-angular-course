import { Component, OnInit } from '@angular/core';

type report = {
  body: string,
  timestamp: string,
  isChecked: boolean
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news: report[] = [{
      body: "Произошло непоправимое. Я проснулась",
      timestamp: "10.11.2021",
      isChecked: false
    },
    {
      body: "Внимание-внимание! Я забыла мысль",
      timestamp : "17.11.2021",
      isChecked: false
    },
    {
      body: "Что?",
      timestamp: "22.11.2021",
      isChecked: false
    },
    {
      body: "Сегодня нормально",
      timestamp: "23.11.2021",
      isChecked: false
    }
    ]

  constructor() { }

  ngOnInit(): void {
  }

  onCheckedChange(item: report): void {
    item.isChecked = !item.isChecked;
  }

}
