import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News, NewsType, NewsTypeObjectEnum } from '../../model/news-type';

@Component({
  selector: 'app-news-modal-content',
  templateUrl: './news-modal-content.component.html',
  styleUrls: ['./news-modal-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsModalContentComponent implements OnInit {

  public newsTypes: NewsType[] = Object.values(NewsTypeObjectEnum);

  public newNews: News | undefined;
  
  public title: string = '';
  private _news: News | undefined;

  @Input()
  get news(): News | undefined { return this._news}
  set news(_news: News | undefined) {
    this._news = _news;
    this.title = this._news && this._news.id != 0 ? "Изменить новость" : "Добавить новость";
  }

  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.news) {
      this.newNews = {
        id: this.news.id,
        title: this.news.title,
        text: this.news.text,
        dateTime: this.news.dateTime,
        newsType: this.news.newsType
      }} else {
        this.newNews = undefined;
      }
  }

  clickSaveNews() {
    this.saveNews.emit(this.newNews);
  }

  clickCancel() {
    this.cancel.emit();
  }

  onChangeInput($event: Event, type: string) {
    if (this.newNews) {
      let newValue = ($event.target as HTMLInputElement).value;
      switch (type) {
        case "date":
          this.newNews.dateTime = newValue;
          break;
        case "title":
          this.newNews.title = newValue;
          break;
        case "text":
          this.newNews.text = newValue;
          break;
        case "newsType":
          this.newNews.newsType = this.newsTypes.find(t => t.id === Number(newValue))!;
          break;
      }
    }
  }
}
