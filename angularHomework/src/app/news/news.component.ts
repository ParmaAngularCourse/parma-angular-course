import { Component, OnInit } from '@angular/core';

type News = {
   title: string,
   dateTime: string,
   isChecked: boolean
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news: Array<News> = [
    {title: "News 1", dateTime: "15.08.2021 14:23", isChecked: true},
    {title: "News 2", dateTime: "23.09.2021 21:23", isChecked: false},
    {title: "News 3", dateTime: "30.10.2021 09:00", isChecked: false},
    {title: "News 4", dateTime: "01.11.2021 15:03", isChecked: false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onChange(i: number) {
    this.news[i].isChecked = !this.news[i].isChecked;
  }
}
