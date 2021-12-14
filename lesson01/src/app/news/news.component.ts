import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NewsItemModel} from "./news-types";
import {NewsItemModalComponent} from "./news-item-modal/news-item-modal.component";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {NewsItemComponent} from "./news-item/news-item.component";
import {NewsService} from "./services/news.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Permission, PermissionService} from './services/permission.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  news: NewsItemModel[] = [];
  perms: Permission[] = [];
  private _ngUnsubscribe$: Subject<number>;

  @ViewChild('modalComponent') modal! : NewsItemModalComponent;
  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  get isSomeItemSelected(): boolean {
    return this.news.filter(p => p.selected).length > 0;
  }

  constructor(private _newsService: NewsService,
              private _permService: PermissionService,
              private _cd: ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
    this.perms = this._permService.getPermissions();
  }

  ngOnInit(): void {
    this._newsService.getNews()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
      (data) => {
        this.news = data;
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
    let selectedList = this.news.filter(p => p.selected);
    selectedList.forEach(selectedItem => {
      this.onRemoveItem(selectedItem.id);
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
