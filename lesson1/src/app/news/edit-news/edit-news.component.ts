import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { newsType, subjectType } from '../news-types';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  @Input("single_news_data") news! : newsType;
  @Output() closeModal: EventEmitter<newsType> = new EventEmitter();
  @Output() cancelModal: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickSave(date:string, title:string, text: string){
    console.log("save modal");
    date = date.replace(', ','T');
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let dt = date.replace(pattern,'$3-$2-$1');
    this.news.dt = new Date(dt);;
    console.log(this.news.dt);
    this.news.title = title;
    this.news.text = text;
    let radiobtn = <HTMLInputElement>document.querySelector('input[name="subject"]:checked');
    this.news.subject = parseInt(radiobtn!.value);

    this.closeModal.emit(this.news);
  }

  clickCancel(){
    this.cancelModal.emit();
  }
}
