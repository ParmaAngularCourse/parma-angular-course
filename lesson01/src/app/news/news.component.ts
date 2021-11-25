import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {NewsItemModel} from "./news-types";
import {NewsItemModalComponent} from "./news-item-modal/news-item-modal.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  news: NewsItemModel[] = [
    new NewsItemModel(1, new Date(2021, 0, 1, 0, 0, 1),
      "Новость #1", "Текст новости #1", "politic"),
    new NewsItemModel(2, new Date(2021, 1, 1, 0, 0, 2),
      "Новость #2", "Текст новости #2","internet"),
    new NewsItemModel(3, new Date(2021, 2, 1, 0, 0, 3),
      "Новость #3", "Текст новости #3", "science"),
    new NewsItemModel(4, new Date(2021, 3, 1, 0, 0, 4),
      "Новость #4", "Текст новости #4", "tourism")
  ];
  tagsList: {tag:string, text:string}[] = [
    { tag: "politic", text: "Политика" },
    { tag: "tourism", text: "Туризм" },
    { tag: "economy", text: "Экономика" },
    { tag: "science", text: "Наука" },
    { tag: "internet", text: "Интернет" }
  ];

  @ViewChild('modalComponent', {static: false}) modal! : NewsItemModalComponent;
  editedItem!: NewsItemModel;

  constructor() {
  }

  ngOnInit(): void {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
  }

  onRemoveItem($event: number) {
    let index = this.news.findIndex(p => p.id == $event);
    if(index > -1) {
      this.news.splice(index, 1);
    }
  }

  onEditItem($event: NewsItemModel) {
    this.editedItem = new NewsItemModel($event.id, $event.date, $event.head, $event.desc, $event.tag);
    this.modal.show();
  }

  onAdd() {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    this.modal.show();
  }

  onDateChange(value: string) {
    this.editedItem.date = new Date(value);
  }

  onHeadChange(value: string) {
    this.editedItem.head = value;
  }

  onDescChange(value: string) {
    this.editedItem.desc = value;
  }

  onTagsChange(value: string) {
    this.editedItem.tag = value;
  }

  onSaveModal() {
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
}
