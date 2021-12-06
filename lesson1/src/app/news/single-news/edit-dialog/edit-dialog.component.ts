import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsObj } from '../../news-types';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {

  @Input("news_details")newsDetails!: NewsObj;
  @Output() saveNews = new EventEmitter<NewsObj> ();
  @Output() closeEditDialog = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickSaveNewsButton(newsDate: string, newsCaption: string, newsText: string){
      this.saveNews.emit({ caption:  newsCaption, date: new Date(newsDate) , text: newsText });
  }

  clickCloseButton(){
    this.closeEditDialog.emit();
  }


  ngDoCheck(){
    console.log("app-edit-dialog");
  }

}
