import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NewsContent, Theme } from '../../news-types';
import { User } from '../../user-rights';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent implements OnInit {

  @Input()currentUser!: User;
  @Input()newsDetails!: NewsContent;
  @Output() saveNews = new EventEmitter<NewsContent> ();
  @Output() closeEditDialog = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClickSaveNewsButton(newsDate: string, newsCaption: string, newsText: string){
      this.saveNews.emit({ caption:  newsCaption, date: new Date(newsDate) , text: newsText, theme: Theme.Unknown });
  }

  onClickCloseButton(){
    this.closeEditDialog.emit();
  }

  ngDoCheck(){
    console.log("app-edit-dialog");
  }

}
