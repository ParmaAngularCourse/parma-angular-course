import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { News, NewsType } from '../news-types';

@Component({
  selector: 'app-news-editform',
  templateUrl: './news-editform.component.html',
  styleUrls: ['./news-editform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditformComponent implements OnInit, OnChanges {

  @Input("initialNews") news!: News;
  @Output() saveNews : EventEmitter<News> = new EventEmitter();
  @Output() closeNews : EventEmitter<boolean> = new EventEmitter();
  public showEditForm: boolean = false;

  private dateFieldValue: Date = new Date();
  private titleFieldValue: string = "";
  private textFieldValue: string = "";
  private typeFieldValue: NewsType = NewsType.Politics;

  private newsTypeColors = new Map<NewsType, string>([
    [NewsType.Politics, "lightgreen"],
    [NewsType.Tourism, "lightblue"],
    [NewsType.Economics, "yellow"],
    [NewsType.Science, "aqua"],
    [NewsType.Internet, "lightgrey"]
  ]);

  constructor(private cdr: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.dateFieldValue = this.news.date;
    this.titleFieldValue = this.news.title;
    this.textFieldValue = this.news.text;
    this.typeFieldValue = this.news.type;
  }

  save() {
    this.saveNews.emit({
      ...this.news,
      date:  this.dateFieldValue,
      title: this.titleFieldValue,
      text: this.textFieldValue,
      type: this.typeFieldValue
    });
  }

  close() {
    this.closeNews.emit(true);
  }

  getDateString(date: Date) : string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -8)
  }

  getColorByNewsType(type: NewsType) : string {
    return this.newsTypeColors.get(type) ?? '';
  }

  getNewsTypeValues() {
    const keysAndValues = Object.values(NewsType);
    const typeValues : any[] = [];

    keysAndValues.forEach((keyOrValue: any) => {
      if (isNaN(Number(keyOrValue))) {
        typeValues.push(keyOrValue);
      }
    });

    return typeValues;
  }

  dateChanged(dateValue: string) {
    this.dateFieldValue = new Date(dateValue);
  }
  titleChanged(titleValue: string) {
    this.titleFieldValue = titleValue;
  }
  textChanged(textValue: string) {
    this.textFieldValue = textValue;
  }
  typeChanged(typeValue: NewsType) {
    this.typeFieldValue = typeValue;
  }

  showWindow() {
    this.showEditForm = true;
    this.cdr.markForCheck();
  }
  closeWindow() {
    this.showEditForm = false;
    this.cdr.markForCheck();
  }
}
