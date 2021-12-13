import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../../model/news-type';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  @Input() isChecked: boolean = false;
  @Input() news!: News;
  @Output() deleteNews: EventEmitter<number> = new EventEmitter();
  @Output() checkedNews: EventEmitter<number> = new EventEmitter();
  @Output() editNews: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.isChecked = !this.isChecked;
    this.checkedNews.emit(this.news.id);
  }

  clickDeleteButton() {
    this.deleteNews.emit(this.news.id);
  }

  clickEditButton() {
    this.editNews.emit(this.news.id);
  }
}
