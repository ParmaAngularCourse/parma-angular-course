import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { newsType } from '../news-types';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  @Input("single_news_data") news! : newsType;
  @Output() closeModal: EventEmitter<newsType> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  clickSave(date:string, title:string, text: string){
    console.log("save modal");
    this.news.dt = date;
    this.news.title = title;
    this.news.text = text;
    
    this.closeModal.emit(this.news);
  }

  clickCancel(){
    this.closeModal.emit(this.news);
  }
}
