import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NewsItemModel} from "./news-types";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel(1, "01.01.2021 00:00:01", "Новость #1", "Текст новости #1"),
    new NewsItemModel(2, "01.02.2021 00:00:02", "Новость #2", "Текст новости #2"),
    new NewsItemModel(3, "01.03.2021 00:00:03", "Новость #3", "Текст новости #3"),
    new NewsItemModel(4, "01.04.2021 00:00:04", "Новость #4", "Текст новости #4")
  ]

  showModal: boolean = false;
  editedItem!: NewsItemModel;

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
    this.editedItem = new NewsItemModel($event.id, $event.date, $event.head, $event.desc);
    this.showModal = true;
  }

  onAdd() {
    this.editedItem = new NewsItemModel(-1, "", "" , "");
    this.showModal = true;
  }

  onDateChange(value: string) {
    this.editedItem.date = value;
  }

  onHeadChange(value: string) {
    this.editedItem.head = value;
  }

  onDescChange(value: string) {
    this.editedItem.desc = value;
  }

  onSaveModal(){
    if(this.editedItem.id > 0) {
      let index = this.news.findIndex(p => p.id == this.editedItem.id);
      this.news[index] = this.editedItem;
    } else {
      let maxId = this.news
        .map((v) => { return v.id;})
        .sort()[this.news.length - 1];
      this.editedItem.id = maxId + 1;
      this.news.push(this.editedItem);
    }
  }

  onCloseModal() {
    this.showModal = false;
  }
}
