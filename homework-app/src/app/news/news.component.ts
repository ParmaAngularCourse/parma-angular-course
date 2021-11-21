import { Component, OnInit } from '@angular/core';

type News = {
  date: Date;
  title: string;
  selected: boolean;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public allNews: News[] = [
    {
      date: new Date(2021,10,17),
      title: 'В Бразилии обнаружены останки редкого вида беззубых динозавров',
      selected: false
    },
    {
      date: new Date(2021,10,18),
      title: 'В Германии вырастили гриб со вкусом и ароматом земляники',
      selected: false
    },
    {
      date: new Date(2021,10,19),
      title: 'Трение человеческой кожи оказалось идеальным для щелчков пальцами',
      selected: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeSelection($event: any, newsItem: News) {
    newsItem.selected = $event.currentTarget.checked;
  }

}
