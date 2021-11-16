import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItemModel} from "../news-types";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  isActive: boolean = false;

  @Input() newsItem!: NewsItemModel;
  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() editItem: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit(): void {
  }

  checkboxChange($event: Event){
    this.isActive = ($event.target as HTMLInputElement).checked;
  }

  remove() {
    this.removeItem.emit(this.newsItem.id);
  }

  edit() {
    this.editItem.emit(this.newsItem.id);
  }
}
