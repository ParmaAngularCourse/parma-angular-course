import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsBlock } from 'src/app/post-types';

@Component({
  selector: 'app-news-modal-window',
  templateUrl: './news-modal-window.component.html',
  styleUrls: ['./news-modal-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalWindowComponent {

  @Input() newsPost!: NewsBlock;
  @Output() saveItem = new EventEmitter<NewsBlock>();
  @Output() cancel = new EventEmitter<void>();

  clickSaveButton(date: string, title: string, text: string) {    
    this.newsPost.date = date;
    this.newsPost.title = title;
    this.newsPost.text = text;
    this.saveItem.emit(this.newsPost);
  }

  clickCancelButton() {
    this.cancel.emit();
  }

  ngDoCheck(){
    console.log("new-modal");
  }
}
