import { isNgTemplate, outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { newsType } from '../news-types';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {

  @Input("single_news_data") single_news! : newsType;
  @Input() modalVisible : boolean = false;
  @Output() openModal: EventEmitter<newsType> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() checkNews: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.single_news.dt);
  }

  selectNews(item: newsType)
  {
    console.log("check single news id=",item.id);
    //item.checked = !item.checked;
    this.checkNews.emit(item.id);
  }

  public editNews(item: newsType){
    console.log(item.dt);
    this.openModal.emit(item);
  }

  public deleteNews(id: number){
    this.deleteItem.emit(id);
  }

}
