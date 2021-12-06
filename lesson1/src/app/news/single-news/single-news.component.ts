import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsItem, NewsObj } from '../news-types';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {

@Input("single_news_data")single_news!: NewsItem ;
@Output() saveNews = new EventEmitter<NewsObj> ();
@Output() deleteNews = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setCheckedNews(isChecked : boolean , newsItem: NewsItem){
    newsItem.checked = isChecked;
  }

  onSaveNews(eventObj: NewsObj){
    this.saveNews.emit(eventObj);
  }

  onDeleteNews(){
    this.deleteNews.emit();
  }

}
