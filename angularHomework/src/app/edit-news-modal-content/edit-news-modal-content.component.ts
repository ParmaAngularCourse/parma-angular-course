import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news-list/news-type';

@Component({
  selector: 'app-edit-news-modal-content',
  templateUrl: './edit-news-modal-content.component.html',
  styleUrls: ['./edit-news-modal-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNewsModalContentComponent implements OnInit {

  @Input("news_data") news: News | undefined;

  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  clickSaveNews(date: string, title: string, text: string) {
    let id = this.news ? this.news.id : 0;
    let isChecked = this.news ? this.news.isChecked :false;
    let newNews = {
      id: id,
      title: title,
      text: text,
      dateTime: date,
      isChecked: isChecked
    }
    this.saveNews.emit(newNews);
  }

  clickCancel() {
    this.cancel.emit();
    console.log('btn cancel');
  }


}
