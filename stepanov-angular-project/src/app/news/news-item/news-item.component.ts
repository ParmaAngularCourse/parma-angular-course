import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsPart } from '../news-types';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {

  @Input("data_item")
  news_item!: NewsPart;

  @Output()
  onDeleteNews: EventEmitter<number> = new EventEmitter();

  @Output()
  onEditNews: EventEmitter<NewsPart> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onUserChecked(item: NewsPart, $event: Event) {
    var isChecked = ($event.target as HTMLInputElement).checked;
    item.isChecked = isChecked;
  }

  onDeleteNewsItem(newsItemId: number | null) {
    if (newsItemId) {
       this.onDeleteNews.emit(newsItemId);
    }
  }

  onEditNewsItem() {
    this.onEditNews.emit(this.news_item);
  }

  onSelectChanged(isChecked: boolean) {
    this.news_item.isChecked = isChecked;
    this.cdr.markForCheck();
  }
}