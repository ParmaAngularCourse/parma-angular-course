import { Component, OnInit } from '@angular/core';

type News = {
  date: string, 
  header: string,
  isSelected: boolean
}

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  public listNews: News[] = [
    {date:'01.01.2021 08:09', header: 'News 1', isSelected: false},
    {date: '01.01.2021 10:16', header: 'News 2', isSelected: false},
    {date: '02.01.2021 11:18', header: 'News 3', isSelected: false},
    {date: '03.01.2021 14:16', header: 'News 4', isSelected: false},
    {date: '04.01.2021 10:16', header: 'News 5', isSelected: false},
    {date: '05.01.2021 15:18', header: 'News 6', isSelected: false},
    {date: '06.01.2021 13:15', header: 'News 7', isSelected: false},
  ];

  constructor() { 
  }

  ngOnInit(): void {
  }

  onChangeColor($event: Event, news: News){
    var checkBox = ($event.target as HTMLInputElement);
    if (checkBox.checked) {
      news.isSelected = true;
    }
    else{
      news.isSelected = false;
    }
  }

}
