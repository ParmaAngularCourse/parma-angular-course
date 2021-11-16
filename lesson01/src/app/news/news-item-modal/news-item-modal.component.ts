import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItemModel} from "../news-types";

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css']
})
export class NewsItemModalComponent implements OnInit {

  @Input() newsItem!: NewsItemModel;
  @Output() close : EventEmitter<any> = new EventEmitter<any>();
  @Output() save : EventEmitter<NewsItemModel> = new EventEmitter<NewsItemModel>();

  item : NewsItemModel;

  constructor() {
    this.item = new NewsItemModel(-1, "", "" , "");
  }

  ngOnInit(): void {
    if(this.newsItem != undefined)
      this.item = this.newsItem;
  }

  cancel() {
    this.close.emit();
  }

  saveItem() {
    this.save.emit(this.newsItem);
    this.close.emit();
  }

  onDateChange(value: string) {
    this.item.date = value;
  }

  onHeadChange(value: string) {
    this.item.head = value;
  }

  onDescChange(value: string) {
    this.item.desc = value;
  }
}
