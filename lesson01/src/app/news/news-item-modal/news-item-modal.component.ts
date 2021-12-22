import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Permission, PermissionService} from "../../services/permission.service";
import {NewsItemModel, NewsTag} from "../news-types";
import {takeUntil} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {TagsListService} from "../services/tags-list.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit, OnDestroy {

  tagsList: NewsTag[] = [];
  editedItem!: NewsItemModel;
  isVisible: boolean = false;
  perms: Permission[] = [];

  @Output() save : EventEmitter<NewsItemModel> = new EventEmitter<NewsItemModel>();

  private _ngUnsubscribe$: Subject<number>;

  constructor(private _permService : PermissionService,
              private _tagsListService: TagsListService,
              private _cd : ChangeDetectorRef) {
    this._ngUnsubscribe$ = new Subject();
    this.perms = this._permService.getPermissions();
  }

  ngOnInit(): void {
    this._tagsListService.getTagsList()
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (data) => {this.tagsList = data;},
        (error: HttpErrorResponse) => {
          console.log(error.status + " " + error.message)
        }
      );
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

  show(item?: NewsItemModel) {
    if(item != undefined){
      this.editedItem = new NewsItemModel(item.id, item.date, item.head, item.desc, item.tag);
      this.editedItem.selected = item.selected;
    } else {
      this.editedItem = new NewsItemModel(-1, new Date(), "" , "", "");
    }

    this.isVisible = true;
    this._cd.markForCheck();
  }

  cancel() {
    this.isVisible = false;
  }

  saveItem() {
    this.isVisible = false;
    this.save.emit(this.editedItem);
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
