import { Component, OnInit } from '@angular/core';

/* 
   хотел сначала даты хранить в Date, но понял, что для формата даты понадобится DatePipe
   Примерно такой метод был бы преобразования в нужный формат даты:
   
   formatDate(date: Date): string|null {
    var datepipe = new DatePipe('en-US');
    return datepipe.transform(date, 'dd.MM.yyyy hh:mm:ss');
  }
*/

type NewsItem = {
  date: string,
  title: string,
  isChecked: boolean
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public items: NewsItem[];

  constructor() 
  {
    this.items = 
    [
      { date: '20.01.2020 10:52:30', title: 'В ближайшие дни ожидается мокрый дождь со снегом', isChecked: false },
      { date: '12.02.2021 08:19:56', title: 'Корпоративу на НГ - быть!', isChecked: false },
      { date: '16.03.2022 20:11:09', title: 'Вышел новый подкаст на тему ".net 6"', isChecked: false },
    ]
  }

  ngOnInit(): void {
  }

  onUserChecked(item: NewsItem, $event: Event) {
    var isChecked = ($event.target as HTMLInputElement).checked;
    item.isChecked = isChecked;
  }
}