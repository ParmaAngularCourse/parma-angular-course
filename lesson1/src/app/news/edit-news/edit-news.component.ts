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

  isVisible : boolean = false;
  selectedSubject: subjectType = 0;
  constructor() { }

  ngOnInit(): void {
    this.selectedSubject = this.news.subject;
    console.log('init edit-news');
  }

  show(){
    console.log('show edit-news');
    this.isVisible = true;
  }

  clickSave(date:string, title:string, text: string): void{
    this.closeModal.emit({
      ...this.news,
      dt: new Date(date),
      title,
      text,
      subject: this.selectedSubject,
    })
  }

  clickCancel(){
    this.isVisible = false;
    this.cancelModal.emit();
  }

  changeSubject(subject: subjectType): void {
    this.selectedSubject = subject;
  }

  hide(): void {
    this.isVisible = false;
  }
}
