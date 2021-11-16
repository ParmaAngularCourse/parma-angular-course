import { Component, OnInit } from '@angular/core';
import {NewsItemModel} from "./news-types";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel("01.01.2021 00:00:01", "Новость #1"),
    new NewsItemModel("01.02.2021 00:00:02", "Новость #2"),
    new NewsItemModel("01.03.2021 00:00:03", "Новость #3"),
    new NewsItemModel("01.04.2021 00:00:04", "Новость #4")
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
