import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsObj } from '../../news-types';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  @Output() saveNews = new EventEmitter<NewsObj> ();
  constructor() { }

  ngOnInit(): void {
  }

  clickSaveNewsButton(newsDate: string, newsCaption: string, newsText: string){
      this.saveNews.emit({ caption:  newsCaption, date: new Date(newsDate) , text: newsText });
  }
}
