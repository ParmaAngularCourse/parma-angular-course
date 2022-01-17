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
import {NewsService} from "./services/news.service";
import {of, Subject} from "rxjs";
import {
  bufferCount,
  concatAll,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil, toArray
} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  newsTabs: NewsItemModel[][] = [];
  private readonly _ngUnsubscribe$: Subject<number>;
  private _selectedTag : string = "";
  private _searchVal : string = "";
  keyUp = new Subject<KeyboardEvent>();

  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  get isSomeItemSelected(): boolean {
    return this.newsTabs.some(row => row.filter(p => p.selected).length > 0);
  }

  constructor(private _newsService: NewsService,
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
    this._newsService.getNews(this._searchVal, this._selectedTag)
      .pipe(
        switchMap(data => {
          return of(data).pipe(
            concatAll(),
            bufferCount(3),
            toArray()
          )
        }),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => {
          this.newsTabs = value;
          this._cd.detectChanges();
        }
      });
  }

  onEditItem($event: NewsItemModel) {
    this._router.navigate([{ outlets: { modal: ['edit', $event.id] }}]).then(_ => {});
  }

  onAdd() {
    this._router.navigate([{ outlets: { modal: ['add'] }}]).then(_ => {});
  }

  onRemoveItem($event: number) {
    this._newsService.removeNewsItem($event);
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
    this.newsTabs.forEach(row => {
      row.filter(item => item.selected).forEach(selectedItem => {
        this.onRemoveItem(selectedItem.id);
      });
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
