import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from '../shared/context-menu/context-menu.component';
import { News, NewsTypeObjectEnum } from '../model/news-type';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsService } from './services/news.service';
import { UserAuthService } from '../user-authservice';
import { UserPermissions } from '../model/userPermissions';
import { FormControl } from '@angular/forms';
import { bufferCount, combineLatest, concatAll, debounceTime, distinctUntilChanged, filter, first, of, Subject, switchMap, takeUntil, toArray } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeEditNewsService } from './services/change-edit-news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public groupedNews: Array<Array<News>> = [];

  public chechedNewsIds: number[] = [];

  readonly currUser: UserPermissions;
  private ngUnsubscribe$!: Subject<void>;

  @ViewChild(ContextMenuComponent) menuComponent: ContextMenuComponent | undefined;

  searchControl!: FormControl;

  constructor(private _newsService: NewsService, 
    private cdr: ChangeDetectorRef,
    private _userAuthService: UserAuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _changeEditService: ChangeEditNewsService) {

    this.ngUnsubscribe$ = new Subject();
    this.currUser = this._userAuthService.getUserPermissions();
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();

    const searchValueChanges = this.searchControl.valueChanges;
    const queryParamChanges = this._route.queryParams;

    combineLatest([searchValueChanges, queryParamChanges]).pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(value => this._newsService.searchNews(value[0])),
      switchMap(value => of(value).pipe(
        concatAll(),
        filter(s => !this._route.snapshot.queryParams["typeId"]
          || s.newsType.id.toString() === this._route.snapshot.queryParams["typeId"]),
        bufferCount(3),
        toArray())),
      takeUntil(this.ngUnsubscribe$)).subscribe({
        next: (data) => { this.groupedNews = data; this.cdr.markForCheck(); },
        error: (error: HttpErrorResponse) => { console.log(error.status) }
      });

    this.searchControl.setValue("");
  }

  OnDeleteNews($event: number) {
    this._newsService.deleteNews($event).subscribe(
      (isOk) => {
        if (isOk) {
          const checkedIndex = this.chechedNewsIds.findIndex(id => id === $event);
          if (checkedIndex > -1) {
            this.chechedNewsIds.splice(checkedIndex, 1);
          }
        }
        else {
          console.log('Failed to delete the news');
        }
      }
    );
  }

  OnEditNews($event: number) {
    let allNews = this.groupedNews.flat();
    const index = allNews.findIndex(item => item.id === $event);
    if (index > -1) {
      this._changeEditService.selectedNews = allNews[index];
      this.subscribeOnChangeNews('Failed to update the news');

      this._router.navigate([{ outlets: { modal: 'add-edit-news' } }]);
    }
  }

  private subscribeOnChangeNews(message: string) {
    this._changeEditService.$safe.pipe(
      first(),
      switchMap((news) => combineLatest([of(news), this._newsService.addOrEditNews(news)]))
    ).subscribe(
      (result) => {
        if (result[1]) {
          this._router.navigate([{ outlets: { modal: null } }]);
          this._changeEditService.selectedNews = result[0];
        }
        else {
          console.log(message);
        }
      }
    );
  }

  OnClickAddButton() {
    let newNews = {
      id: 0,
      dateTime: '',
      title: '',
      text: '',
      newsType: NewsTypeObjectEnum.Politics
    };
    this._changeEditService.selectedNews = newNews;
    this.subscribeOnChangeNews('Failed to add the news');
    this._router.navigate([{outlets: {modal: 'add-edit-news'}}]);
  }

  onCheckedNews($event: number) {
    if (this.chechedNewsIds.includes($event)) {
      let index = this.chechedNewsIds.findIndex(item => item === $event);
      if (index > -1) {
        this.chechedNewsIds.splice(index, 1)
      }
    } else {
      this.chechedNewsIds.push($event);
    }
  }

  OnClickDeleteButton() {
    this._newsService.deleteSeveralNews(this.chechedNewsIds).subscribe(
      (isOk) => {
        if (isOk) {
          this.chechedNewsIds = [];
        }
        else {
          console.log('Failed to delete the news');
        }
      }
    );
  }

  onSelectAllNews() {
    this.chechedNewsIds = this.groupedNews.flat().map(item => item.id);
  }

  onContextMenu($event: MouseEvent) {
    this.menuComponent?.show({top: $event.pageY, left: $event.pageX});
    return false;
  }

  onClick() {
    this.menuComponent?.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
