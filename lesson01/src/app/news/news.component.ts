import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, OnDestroy,
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
import {debounceTime, map, takeUntil} from "rxjs/operators";
import {Permission, PermissionService} from './services/permission.service';
import {NewsItemModalReactiveComponent} from "./news-item-modal-reactive/news-item-modal-reactive.component";
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

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
  perms: Permission[] = [];
  private readonly _ngUnsubscribe$: Subject<number>;

  @ViewChild('modalComponent') modal! : NewsItemModalReactiveComponent;
  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChild('search') searchComponent! : ElementRef<HTMLInputElement>;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  get isSomeItemSelected(): boolean {
    return this.newsTab1.filter(p => p.selected).length > 0 ||
      this.newsTab2.filter(p => p.selected).length > 0 ||
      this.newsTab3.filter(p => p.selected).length > 0;
  }

  constructor(private _newsService: NewsService,
              private _permService: PermissionService,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
    this.perms = this._permService.getPermissions();
  }

  ngOnInit(): void {
    this.doSearch("");

    fromEvent(this.searchComponent.nativeElement, 'keyup')
      .pipe(
        debounceTime(600),
        map((event: any) => event.target.value),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: value => this.doSearch(value)
      });
  }

  private doSearch(value: string) {
    let ss = this._newsService.getNews(value)
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
