import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news-type';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  @Input("news_data") news!: News;
  @Output() deleteNews: EventEmitter<number> = new EventEmitter();
  @Output() editNews: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.news.isChecked = !this.news.isChecked;
  }

  clickDeleteButton() {
    this.deleteNews.emit(this.news.id);
  }

  clickEditButton() {
    this.editNews.emit(this.news.id);
  }
}
