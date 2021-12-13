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
  
  @Input() news: News | undefined;

  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    console.log("init");
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
