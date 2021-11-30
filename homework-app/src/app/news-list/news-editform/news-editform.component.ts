import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { News } from '../news-types';

@Component({
  selector: 'app-news-editform',
  templateUrl: './news-editform.component.html',
  styleUrls: ['./news-editform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditformComponent implements OnInit {

  @Input("initialNews") news!: News;
  @Output() saveNews : EventEmitter<News> = new EventEmitter();
  @Output() closeNews : EventEmitter<News> = new EventEmitter();

  constructor() { 
  }

  ngOnInit(): void {
  }

  save(newsDate: string, newsTitle: string, newsText: string) {
    this.saveNews.emit({
      ...this.news,
      date:  new Date(newsDate),
      title: newsTitle,
      text: newsText
    });
  }

  close($event: News) {
    this.closeNews.emit($event);
  }
}
