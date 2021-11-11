import { Component, OnInit } from '@angular/core';

export class NewsItemModel {
  constructor(public date: string, public desc: string, public isactive: boolean) {
  }
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel("01.01.2021 00:00:01", "Новость #1", false),
    new NewsItemModel("01.02.2021 00:00:02", "Новость #2", false),
    new NewsItemModel("01.03.2021 00:00:03", "Новость #3", false),
    new NewsItemModel("01.04.2021 00:00:04", "Новость #4", false)
  ]

  news2: NewsItemModel[] = [
    new NewsItemModel("01.01.2021 00:00:01", "Новость #1", false),
    new NewsItemModel("01.02.2021 00:00:02", "Новость #2", false),
    new NewsItemModel("01.03.2021 00:00:03", "Новость #3", false),
    new NewsItemModel("01.04.2021 00:00:04", "Новость #4", false)
  ]

  constructor() { }

  ngOnInit(): void {
  }

  checkboxChange = function ($event: Event, newItem: NewsItemModel){
    newItem.isactive = ($event.target as HTMLInputElement).checked;
  }
}
