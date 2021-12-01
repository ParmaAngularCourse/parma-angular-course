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

  public edit_item!: NewsPart;

  constructor() 
  {
    this.items = 
    [
      new NewsPart(0, new Date(2020,1,20,10,52,30), 'Погода', 'В ближайшие дни ожидается мокрый дождь со снегом'),
      new NewsPart(1, new Date(2021,2,12,8,19,56), 'Работа', 'Корпоративу на НГ - быть!'),
      new NewsPart(2, new Date(2022,3,16,20,11,9), '.NET', 'Вышел новый подкаст на тему ".net 6"')
    ]
  }

  ngOnInit(): void {
  }

  deleteNewsItem($event: number) {
    var removingIndex = this.items.findIndex(item => item.id == $event);
    this.items.splice(removingIndex, 1);
  }

  editNewsItem($event: NewsPart) {
    this.edit_item = new NewsPart($event.id, $event.date, $event.title, $event.text);
    this.isVisibleModalDialog = true;
  }

  addNewItem() {
    this.edit_item = new NewsPart(null, new Date(), '', '');
    this.isVisibleModalDialog = true;
  }

  saveNewItem() {
    if(this.edit_item.id == null) {
      this.edit_item.id = this.findMaxId() + 1;
      this.items.push(this.edit_item);
    } else {
      var foundItemIndex = this.items.findIndex(item => item.id == this.edit_item.id);
      this.items[foundItemIndex] = this.edit_item;
    }
  }

  findMaxId() : number {
    var maxId = -1;
    this.items.forEach(item => {
      var currentId = item.id!;
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  onTextChanged($event: Event) {
    var input = $event.target as HTMLInputElement;
    return input.value;
  }

  tryParseDate($event: Event) {
    var input = $event.target as HTMLDataElement;
    if (input.value) {
        return new Date(input.value);
    }
    return new Date();
  }
}