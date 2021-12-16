import { ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsItem, NewsObj } from '../news-types';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleNewsComponent implements OnInit {

@Input()singleNews!: NewsItem ;
@Output() saveNews = new EventEmitter<NewsObj> ();
@Output() editNews =  new EventEmitter();
@Output() deleteNews = new EventEmitter();
@Output() markNews =  new EventEmitter();

public isEdisNewsShowed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setCheckedNews(isChecked : boolean , newsItem: NewsItem){
    newsItem.checked = isChecked;
    this.markNews.emit();
  }

  onSaveNews(eventObj: NewsObj){
    this.saveNews.emit(eventObj);
  }

  onDeleteNews(){
    this.deleteNews.emit();
  }

  onEditNews(){
    this.editNews.emit();
  }

  ngDoCheck(){
    console.log("app-single-news" + this.singleNews.id);
  }

}
