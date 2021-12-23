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
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "rxjs/operators";
import {NewsItemModalReactiveComponent} from "./news-item-modal-reactive/news-item-modal-reactive.component";
import {ActivatedRoute} from "@angular/router";
import {PersonInfoService} from "../services/person-info.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  newsTab1: NewsItemModel[] = [];
  newsTab2: NewsItemModel[] = [];
  newsTab3: NewsItemModel[] = [];
  private readonly _ngUnsubscribe$: Subject<number>;
  private _selectedTag : string = "";
  private _searchVal : string = "";
  keyUp = new Subject<KeyboardEvent>();

  @ViewChild('modalComponent') modal! : NewsItemModalReactiveComponent;
  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  get isSomeItemSelected(): boolean {
    return this.newsTab1.filter(p => p.selected).length > 0 ||
      this.newsTab2.filter(p => p.selected).length > 0 ||
      this.newsTab3.filter(p => p.selected).length > 0;
  }

  constructor(private _newsService: NewsService,
              private _route: ActivatedRoute,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(params => {
        this._selectedTag = params?.tagsId ?? "";
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
    let ss = this._newsService.getNews(this._searchVal, this._selectedTag)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      );

    ss.pipe(
      map(p => p.filter(m => m.tag === "politic")),
      takeUntil(this._ngUnsubscribe$)
    ).subscribe(
      (data) => {
        this.newsTab1 = data;
        this._cd.detectChanges();
      },
      (error: HttpErrorResponse) => {
        console.log(error.status + " " + error.message)
      }
    );

    ss.pipe(
      map(p => p.filter(m => m.tag === "internet")),
      takeUntil(this._ngUnsubscribe$)
    ).subscribe(
      (data) => {
        this.newsTab2 = data;
        this._cd.detectChanges();
      },
      (error: HttpErrorResponse) => {
        console.log(error.status + " " + error.message)
      }
    );

    ss.pipe(
      map(p => p.filter(m => m.tag !== "internet" && m.tag !== "politic")),
      takeUntil(this._ngUnsubscribe$)
    ).subscribe(
      (data) => {
        this.newsTab3 = data;
        this._cd.detectChanges();
      },
      (error: HttpErrorResponse) => {
        console.log(error.status + " " + error.message)
      }
    );
  }

  onEditItem($event: NewsItemModel) {
    this.modal.show($event);
  }

  onAdd() {
    this.modal.show();
  }

  onRemoveItem($event: number) {
    this._newsService.removeNewsItem($event);
  }

  onSaveModal(editedItem: NewsItemModel) {
    if(editedItem.id > 0) {
      this._newsService.editNewsItem(editedItem);
    } else {
      this._newsService.addNewsItem(editedItem);
    }
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
    let selectedList = this.newsTab1.filter(p => p.selected);
    selectedList = selectedList.concat(this.newsTab2.filter(p => p.selected));
    selectedList = selectedList.concat(this.newsTab3.filter(p => p.selected));
    selectedList.forEach(selectedItem => {
      this.onRemoveItem(selectedItem.id);
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
