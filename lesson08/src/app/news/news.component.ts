import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NewsItemModel} from "./news-types";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {NewsItemComponent} from "./news-item/news-item.component";
import {Observable, Subject} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil
} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import * as fromStore from '../store'
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  newsTabs$!: Observable<NewsItemModel[][]>;
  private readonly _ngUnsubscribe$: Subject<number>;
  private _selectedTag : string = "";
  private _searchVal : string = "";
  keyUp = new Subject<KeyboardEvent>();

  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  get isSomeItemSelected$(): Observable<boolean> {
    return this._store.pipe(select(fromStore.selectIsSomeItemSelected))
  }

  constructor(private _store: Store<fromStore.State>,
              private _route: ActivatedRoute,
              private _cd: ChangeDetectorRef,
              private _router: Router) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(params => {
        this._selectedTag = params?.tagsId ?? "";
        if(this._selectedTag === "all") this._selectedTag = "";
        this.doSearch();
      });

    this.keyUp
      .pipe(
        debounceTime(600),
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => {
          this._searchVal = value;
          this.doSearch();
        }
      });
  }

  private doSearch() {
    this._store.dispatch(fromStore.loadNews(
      {
        searchVal: this._searchVal,
        selectedTag: this._selectedTag
      }
    ));
    this.newsTabs$ = this._store.pipe(
      select(fromStore.selectNewsInThreeColumn),
      map(news =>
        news.map(row =>
          row.map(item => NewsItemModel.create(item))
        )
      )
    );
  }

  onEditItem($event: NewsItemModel) {
    this._router.navigate([{ outlets: { modal: ['edit', $event.id] }}]).then(_ => {});
  }

  onAdd() {
    this._router.navigate([{ outlets: { modal: ['add'] }}]).then(_ => {});
  }

  onRemoveItem($event: number) {
    this._store.dispatch(fromStore.removeNewsItem({ id: $event }));
  }

  onContextMenu($event: MouseEvent) {
    if($event.button == 2) {
      $event.preventDefault();
      this.menuComponent.show({
        top: $event.clientY,
        left: $event.clientX
      });
    }
  }

  onSelectAll() {
    this.newsItemComponents.forEach(p => p.setSelected(true));
  }

  onDeleteSelected() {
    this._store
      .pipe(
        select(fromStore.selectSelectedNewsItemIds),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        value => value.forEach(id => this.onRemoveItem(id))
      );
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
