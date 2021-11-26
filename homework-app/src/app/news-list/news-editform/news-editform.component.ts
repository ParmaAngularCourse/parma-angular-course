import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from '../news-types';

@Component({
  selector: 'app-news-editform',
  templateUrl: './news-editform.component.html',
  styleUrls: ['./news-editform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditformComponent implements OnInit {

  public news: News;
  @Output() saveNews : EventEmitter<News> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public initialNews: News) { 
    if (!!this.initialNews) {
      this.news = this.initialNews;
    }
    else {
      this.news = {
        id: 0,
        date: new Date(),
        title: '',
        text: '',
        selected: false
      }
    }
  }

  ngOnInit(): void {
  }

  save(newsDate: string, newsTitle: string, newsText: string) {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    this.news = {
      ...this.news,
      date:  new Date(newsDate.replace(pattern,'$3-$2-$1')),
      title: newsTitle,
      text: newsText
    };
    this.saveNews.emit(this.news);
  }
}
