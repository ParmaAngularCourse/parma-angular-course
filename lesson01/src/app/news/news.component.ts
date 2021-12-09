import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NewsItemModel, NewsTag, Permissions, Permission} from "./news-types";
import {NewsItemModalComponent} from "./news-item-modal/news-item-modal.component";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {NewsItemComponent} from "./news-item/news-item.component";
import {NewsService} from "./services/news.service";
import {TagsListService} from "./services/tags-list.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {

  news: NewsItemModel[] = [];
  tagsList: NewsTag[] = [];
  perms: Permission[] = Permissions;
  private ngUnsubscribe$: Subject<number>;

  @ViewChild('modalComponent') modal! : NewsItemModalComponent;
  editedItem!: NewsItemModel;

  @ViewChild('contextMenuComponent') menuComponent! : ContextMenuComponent;
  @ViewChildren(NewsItemComponent) newsItemComponents!: QueryList<NewsItemComponent>;
  selectedItemsIds: number[] = [];
  get isSomeItemSelected(): boolean {
    return this.selectedItemsIds.length > 0;
  }

  constructor(private _newsService: NewsService,
              private _tagsListService: TagsListService,
              private _cd: ChangeDetectorRef) {
    this.ngUnsubscribe$ = new Subject();

    this._tagsListService.getTagsList()
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(
      (data) => {this.tagsList = data;},
      (error: HttpErrorResponse) => {
        console.log(error.status + " " + error.message)
      }
    );
  }

  ngOnInit(): void {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    this._newsService.getNews()
      .pipe(
        takeUntil(this.ngUnsubscribe$)
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
    this.editedItem = new NewsItemModel($event.id, $event.date, $event.head, $event.desc, $event.tag);
    this.modal.show();
  }

  onAdd() {
    this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    this.modal.show();
  }

  onDateChange(value: string) {
    this.editedItem.date = new Date(value);
  }

  onHeadChange(value: string) {
    this.editedItem.head = value;
  }

  onDescChange(value: string) {
    this.editedItem.desc = value;
  }

  onTagsChange(value: string) {
    this.editedItem.tag = value;
  }

  onRemoveItem($event: number) {
    this._newsService.removeNewsItem($event)
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(
        _ => {
          this.selectedItemsIds = this.selectedItemsIds.filter(p => p != $event);
        },
        (error: HttpErrorResponse) => {
          console.log(error.status + " " + error.message)
        }
      );
  }

  onSaveModal() {
    if(this.editedItem.id > 0) {
      this._newsService.editNewsItem(this.editedItem)
        .pipe(
          takeUntil(this.ngUnsubscribe$)
        )
        .subscribe(_ => {},
          (error: HttpErrorResponse) => {
            console.log(error.status + " " + error.message)
          }
        );
    } else {
      this._newsService.addNewsItem(this.editedItem)
        .pipe(
          takeUntil(this.ngUnsubscribe$)
        )
        .subscribe(_ => {},
          (error: HttpErrorResponse) => {
            console.log(error.status + " " + error.message)
          }
        );
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
    this.selectedItemsIds.forEach(id => {
        this.onRemoveItem(id);
      });
    this.selectedItemsIds = [];
  }

  onItemSelected($event: {id:number, isSelected: boolean}) {
    if($event.isSelected)
    {
      if(!this.selectedItemsIds.includes($event.id)){
        this.selectedItemsIds.push($event.id);
      }
    } else {
      this.selectedItemsIds = this.selectedItemsIds.filter(p => p != $event.id);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
