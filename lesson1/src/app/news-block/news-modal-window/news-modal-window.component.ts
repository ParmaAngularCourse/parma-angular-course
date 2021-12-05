import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsBlock } from 'src/app/post-types';

@Component({
  selector: 'app-news-modal-window',
  templateUrl: './news-modal-window.component.html',
  styleUrls: ['./news-modal-window.component.css']
})
export class NewsModalWindowComponent implements OnInit {

  constructor() { }

  @Input() newsPost!: NewsBlock;
  @Output() saveItem: EventEmitter<NewsBlock> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  clickSaveButton(date: string, title: string, text: string) {
    if (this.newsPost)
    {
      this.newsPost.date = date;
      this.newsPost.title = title;
      this.newsPost.text = text;
    }
    else
    {
      this.newsPost = {id: 0, date: date, title: title, text: text, checked: false};
    }
    this.saveItem.emit(this.newsPost);
  }

  clickCancelButton() {
    this.cancel.emit(null);
  }
}
