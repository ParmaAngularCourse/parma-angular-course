import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsPart } from '../news-types';

@Component({
  selector: 'app-news-maker',
  templateUrl: './news-maker.component.html',
  styleUrls: ['./news-maker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMakerComponent implements OnInit {

  @Input()
  news_item: NewsPart | null = null;

  @Input("isVisible")
  isVisibleModalForm: boolean = false;

  @Output()
  onCancelAction: EventEmitter<number | null> = new EventEmitter();

  @Output()
  onAddAction: EventEmitter<NewsPart> = new EventEmitter();

  newsDate: Date = new Date();
  newsTitle: string = "";
  newsText: string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.news_item != null) {
      this.newsDate = this.news_item.date;
      this.newsTitle = this.news_item.title;
      this.newsText = this.news_item.text;
    }
  }

  cancelAction() {
    this.onCancelAction.emit();
  }

  addAction() {
    if (this.news_item) {
      this.news_item.date = this.newsDate;
      this.news_item.title = this.newsTitle;
      this.news_item.text = this.newsText;
    } else {
      this.news_item = 
      {
        id: null,
        isChecked: false,
        date: this.newsDate,
        title: this.newsTitle,
        text: this.newsText,
      };
      this.onAddAction.emit(this.news_item);
    }

    this.onCancelAction.emit();
  }

  onTextChanged($event: Event) {
    var input = $event.target as HTMLInputElement;
    return input.value;
  }

  tryParseDate($event: Event) {
    var input = $event.target as HTMLDataElement;
    if (input.value) {
        return new Date(input.value);
    }
    return new Date();
  }
}