import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {NewsItemModel, NewsTag} from "../news-types";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as fromStore from "../../store";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit, OnDestroy {

  private _ngUnsubscribe$: Subject<number>;

  tag: NewsTag | undefined;

  @Input() newsItem!: NewsItemModel;
  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() editItem: EventEmitter<NewsItemModel> = new EventEmitter<NewsItemModel>();

  constructor(private _store: Store<fromStore.State>,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this._store
      .pipe(
        select(fromStore.getTagsByTagsId(this.newsItem.tag)),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (data) => {
          this.tag = data;
          this._cd.detectChanges()
        },
        (error) => {console.log(error)}
      );
  }

  checkboxChange($event: Event){
    this.setSelected(($event.target as HTMLInputElement).checked)
  }

  remove() {
    this.removeItem.emit(this.newsItem.id);
  }

  edit() {
    this.editItem.emit(this.newsItem);
  }

  setSelected(isSelect: boolean){
    this._store.dispatch(fromStore.selectNewsItem( { id: this.newsItem.id, isSelected: isSelect }));
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
