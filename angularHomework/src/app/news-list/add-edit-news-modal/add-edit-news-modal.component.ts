import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news-type';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-add-edit-news-modal',
  templateUrl: './add-edit-news-modal.component.html',
  styleUrls: ['./add-edit-news-modal.component.css']
})
export class AddEditNewsModalComponent implements OnInit {

  @Input("news_data") news: News | undefined;

  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickSaveNews(date: string, title: string, text: string) {
    let newNews = this.news;
    if (newNews) {
      newNews.dateTime = date;
      newNews.title = title;
      newNews.text = text;
    } else {
      newNews = {
        id: 0,
        title: title,
        text: text,
        dateTime: date,
        isChecked: false
      }
    }

    this.saveNews.emit(newNews);
  }

  clickCancel() {
    this.cancel.emit();
    console.log('btn cancel');
  }

}
