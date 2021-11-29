import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewsPart } from '../i-news-part';

@Component({
  selector: 'app-news-maker',
  templateUrl: './news-maker.component.html',
  styleUrls: ['./news-maker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMakerComponent implements OnInit {

  @Input()
  news_item: INewsPart | null = null;

  @Input("isVisible")
  isVisibleModalForm: boolean = false;

  @Output()
  onCancelAction: EventEmitter<number | null> = new EventEmitter();

  @Output()
  onAddAction: EventEmitter<INewsPart> = new EventEmitter();

  id: number | null = null;
  newsDate: Date = new Date();
  newsTitle: string = "";
  newsText: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.news_item != null) {
      this.id = this.news_item.id;
      this.newsDate = this.news_item.date;
      this.newsTitle = this.news_item.title;
      this.newsText = this.news_item.text;
    }
  }

  cancelAction() {
    this.onCancelAction.emit();
  }

  addAction() {
    this.onAddAction.emit({
      id: this.id,
      title: this.newsTitle,
      date: this.newsDate,
      text: this.newsText,
      isChecked: false
    });

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