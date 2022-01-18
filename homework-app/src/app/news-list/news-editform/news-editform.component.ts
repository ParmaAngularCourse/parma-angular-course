import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { News, NewsType } from '../news-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  public editForm!: FormGroup;

  private ngUnsubscribe$: Subject<boolean>;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) { 
    this.ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      date: [this.getDateString(new Date()), [Validators.required]],
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      type: [NewsType.Politics, [Validators.required]]
    });
  }

  ngOnChanges(): void {
    this.editForm?.setValue({
      date: this.getDateString(this.news.date),
      title: this.news.title,
      text: this.news.text,
      type: this.news.type
    }, {emitEvent: false});
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  save() {
    this.saveNews.emit({
      ...this.news,
      ...this.editForm.value
    });
  }

  close() {
    this.closeNews.emit(true);
  }

  getDateString(date: Date) : string {
    return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -8)
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
