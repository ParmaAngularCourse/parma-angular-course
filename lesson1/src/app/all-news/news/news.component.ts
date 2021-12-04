import { style } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  @Input() news!: News;
  @Output() deleteNewsEvent: EventEmitter<News> = new EventEmitter();
  @Output() editNewsEvent: EventEmitter<News> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  check(item: News): void {
    item.isChecked = !item.isChecked;
  }

  deleteNews(item: News): void {
    this.deleteNewsEvent.emit(item);
  }

  editNews(item: News){
   this.editNewsEvent.emit(item);
  }

}
