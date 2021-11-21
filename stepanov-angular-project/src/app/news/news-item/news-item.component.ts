import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  isVisibleModalDialog: boolean = false;

  @Output()
  onDeleteNews: EventEmitter<number> = new EventEmitter();

  constructor() { }

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
    this.isVisibleModalDialog = true;
  }

}