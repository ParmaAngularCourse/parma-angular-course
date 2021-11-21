import { Component, OnInit } from '@angular/core';
import { NewsPart } from './news-types';

/* 
   хотел сначала даты хранить в Date, но понял, что для формата даты понадобится DatePipe
   Примерно такой метод был бы преобразования в нужный формат даты:
   
   formatDate(date: Date): string|null {
    var datepipe = new DatePipe('en-US');
    return datepipe.transform(date, 'dd.MM.yyyy hh:mm:ss');
  }
*/

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public isVisibleModalDialog: boolean = false;

  public items: NewsPart[];

  constructor() 
  {
    this.items = 
    [
      { id: 1, date: new Date(2020,1,20,10,52,30), title: 'Погода', text: 'В ближайшие дни ожидается мокрый дождь со снегом', isChecked: false },
      { id: 2, date: new Date(2021,2,12,8,19,56), title: 'Работа', text: 'Корпоративу на НГ - быть!', isChecked: false },
      { id: 3, date: new Date(2022,3,16,20,11,9), title: '.NET', text: 'Вышел новый подкаст на тему ".net 6"', isChecked: false },
    ]
  }

  ngOnInit(): void {
  }

  deleteNewsItem($event: number) {
    var removingIndex = this.items.findIndex(item => item.id == $event);
    this.items.splice(removingIndex, 1);
  }

  addNewItem() {
    this.isVisibleModalDialog = true;
  }

  saveNewItem($event: NewsPart) {
    if(!$event.id) {
      $event.id = this.findMaxId() + 1;
    }
    this.items.push($event);
  }

  findMaxId() : number {
    var maxId = -1;
    this.items.forEach(item => {
      var currentId = item.id!!;
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}