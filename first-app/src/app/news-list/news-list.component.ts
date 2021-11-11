import { Component, OnInit } from '@angular/core';

type newsItem ={
  dateTime: string,
  title: string,
  selected:boolean
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  
  public newsList: Array<newsItem> = [
    {dateTime: "12.01.1991 04:56:21", title: "Первая новость", selected: false},
    {dateTime: "01.09.1995 09:23:00", title: "Вторая новость", selected: false},
    {dateTime: "01.08.1997 08:00:00", title: "3 новость", selected: false},
    {dateTime: "09.10.2011 12:26:51", title: "4 новость", selected: false}    
  ];

  constructor() { }

  ngOnInit(): void {
  }
  chackedChanged($event: Event, item: newsItem){    
      item.selected = ($event.target as HTMLInputElement).checked;
  }
  
  getClass(item: newsItem){
    return item.selected 
              ? 'selected'
              : '';
  }
}
