import { Component, OnInit } from '@angular/core';
import {NewsItemModel} from "./news-types";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel(1, "01.01.2021 00:00:01", "Новость #1", "Текст новости #1"),
    new NewsItemModel(2, "01.02.2021 00:00:02", "Новость #2", "Текст новости #2"),
    new NewsItemModel(3, "01.03.2021 00:00:03", "Новость #3", "Текст новости #3"),
    new NewsItemModel(4, "01.04.2021 00:00:04", "Новость #4", "Текст новости #4")
  ]

  showModal: boolean = false;
  editedItem?: NewsItemModel;

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem($event: number) {
    let index = this.news.findIndex(p => p.id == $event);
    if(index > -1) {
      this.news.splice(index, 1);
    }
  }

  onEditItem($event: NewsItemModel) {
    this.editedItem = $event;
    this.showModal = true;
  }

  onSaveItem($event: NewsItemModel) {
    if($event.id > 0) {
      let index = this.news.findIndex(p => p.id == $event.id);
      this.news[index] = $event;
    } else {
      let maxId = this.news
        .map((v) => { return v.id;})
        .sort()[this.news.length - 1];
      $event.id = maxId + 1;
      this.news.push($event);
    }
  }

  onAdd() {
    this.editedItem = undefined;
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }
}
