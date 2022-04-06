import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ContextMenuComponent } from '../shared/context-menu/context-menu.component';
import { News, NewsTypeObjectEnum } from '../model/news-type';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsService } from './services/news.service';
import { UserAuthService } from '../user-authservice';
import { UserPermissions } from '../model/userPermissions';
import { FormControl } from '@angular/forms';
import { bufferCount, combineLatest, concatAll, debounceTime, distinctUntilChanged, filter, from, map, mergeAll, mergeMap, of, Subject, switchMap, take, takeUntil, tap, toArray } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public groupedNews: Array<Array<News>> = [];

  public chechedNewsIds: number[] = [];

  readonly  currUser: UserPermissions;

  public selectedNews: News | undefined;

  private ngUnsubscribe$!: Subject<void>;

  @ViewChild(ContextMenuComponent) menuComponent: ContextMenuComponent | undefined;
  @ViewChild(ModalComponent) modalComponent: ModalComponent | undefined;

  searchControl!: FormControl;

  constructor(private _newsService: NewsService, 
    private cdr: ChangeDetectorRef,
    private _userAuthService: UserAuthService,
    private _route: ActivatedRoute,
    private _router: Router) {

    this.ngUnsubscribe$ = new Subject();

    this._newsService.getNews().pipe(
      switchMap(value => of(value).pipe(concatAll(),
        bufferCount(3),
        toArray())),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe({
      next: (data) => { this.groupedNews = data; this.cdr.markForCheck(); },
      error: (error: HttpErrorResponse) => { console.log(error) }
    });

    this.currUser = this._userAuthService.getUserPermissions();
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();

    const searchValueChanges = this.searchControl.valueChanges;
    const queryParamChanges =  this._route.queryParams;

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
      this.selectedNews = allNews[index];
      this._router.navigate([{outlets: {modal: 'add-edit-news'}}]);
      //this.modalComponent?.open();
    }
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

  OnClickAddButton() {
    this.selectedNews = {
      id: 0,
      dateTime: '',
      title: '',
      text: '',
      newsType: NewsTypeObjectEnum.Politics
    };
    this._router.navigate([{outlets: {modal: 'add-edit-news'}}]);
    //this.modalComponent?.open();
  }

  onCancelModal() {
    //this.modalComponent?.close();
    this._router.navigate([{outlets: {modal: null}}]);
    this.selectedNews = undefined;
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

  onSaveNews($event: News) {
    this._newsService.addOrEditNews($event).subscribe(
      (isOk) => {
        if (isOk) {
          this._router.navigate([{outlets: {modal: null}}]);
          //this.modalComponent?.close();
          this.selectedNews = undefined;
        }
        else {
          console.log('Failed to update the news');
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
