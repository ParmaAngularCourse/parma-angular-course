import { Component, OnInit } from '@angular/core';

type News = {
  date: string, 
  header: string,
  backgroundColor: string
}

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  private defaultBackgroundColor: string = 'azure';
  private selectedBackgroundColor: string = 'grey';
  
  public listNews: News[] = [
    {date:'01.01.2021 08:09', header: 'News 1', backgroundColor: this.defaultBackgroundColor},
    {date: '01.01.2021 10:16', header: 'News 2', backgroundColor: this.defaultBackgroundColor},
    {date: '02.01.2021 11:18', header: 'News 3', backgroundColor: this.defaultBackgroundColor},
    {date: '03.01.2021 14:16', header: 'News 4', backgroundColor: this.defaultBackgroundColor},
    {date: '04.01.2021 10:16', header: 'News 5', backgroundColor: this.defaultBackgroundColor},
    {date: '05.01.2021 15:18', header: 'News 6', backgroundColor: this.defaultBackgroundColor},
    {date: '06.01.2021 13:15', header: 'News 7', backgroundColor: this.defaultBackgroundColor},
  ];

  constructor() { 
  }

  ngOnInit(): void {
  }

  onChangeColor($event: Event, news: News){
    var checkBox = ($event.target as HTMLInputElement);
    if (checkBox.checked) {
      news.backgroundColor = this.selectedBackgroundColor;
    }
    else{
      news.backgroundColor = this.defaultBackgroundColor;
    }
  }

}
