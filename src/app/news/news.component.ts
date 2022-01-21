import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NewsService } from '../news.service';
import { ComponentCanDeactivate, NewsType, newsTypeColors, Report } from './news-types';
import { Role } from './roles';
import { Subject } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, mergeAll, mergeMap, reduce, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements ComponentCanDeactivate {

  public news$!: Observable<Report[]>;
  public count$!: Observable<number | undefined>;
  public typeCounts$!: Observable<any[] | undefined>;
  //public news: Report[] = [];
  //private ngUnsubscribe$!: Subject<number>;
  private searchSubject: Subject<string> = new Subject();

  constructor(private store: Store<fromStore.State>, private authService: AuthService, /*private _newsService: NewsService,*/ private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    //this.ngUnsubscribe$ = new Subject();
    //this.setSearchSubscription();
    //this._newsService.getNewsSubscription().pipe(
    //  takeUntil(this.ngUnsubscribe$),
    //  map((r: Report[]) => {
    //    let colNum = 0;
    //    r.forEach(x => x.colNum = colNum < 3 ? ++colNum : colNum = 1);
    //    return r;
    //  }))
    //  .subscribe((data: any) => this.updateView(data));
    //this._newsService.getNewsSubscription().pipe(
    //  takeUntil(this.ngUnsubscribe$),
    //  mergeMap(x => of(x).pipe(
    //    mergeAll(),
    //    bufferCount(3),
    //    reduce((acc: any, arr: any) => [...acc, arr], []))))
    //  .subscribe((tally: any) => {
    //    console.log(tally);
    //  });
    this.route.queryParams.subscribe(
      (params: any) => {
        this.newsType = params['newsType'] ?? "";
        this.isModalShow = params['isModalShow'] ?? false;
        this.modalIndex = params['modalIndex'] ?? -1;
      }
    );
    this.store.dispatch(fromStore.loadPosts());
    this.news$ = this.store.select(fromStore.selectPosts);
    this.count$ = this.store.select(fromStore.selectPostsCount);
    this.typeCounts$ = this.store.select(fromStore.filters);
  }

  ngOnInit() {
    //this.getNews();
  }

  showModal() {
    //if (this.isModalShow) {
    //  if (this.news.length <= this.modalIndex)
    //    this.clickAddButton();
    //  else this.initReport(this.news[this.modalIndex], this.modalIndex);
    //  this.isModalShow = false;
    //}
  }

  @ViewChild('modal') modal!: ModalComponent;

  defaultReport = {
    id: 0,
    header: "",
    body: "",
    timestamp: "",
    isChecked: false,
    type: null
  };
  modalIndex = -1;
  modalData: Report = this.defaultReport;
  modalHeader!: string;
  isContextMenuVisible = false;
  contextMenuPosition: { left: number, top: number; } = { left: 0, top: 0 };
  roleEnum = Role;
  searchText: string | null = null;
  newsTypeEnum = NewsType;
  newsTypeColors = newsTypeColors;
  newsType = "";
  canSubmit = this.authService.isAuth();
  isModalShow = false;
  isDirty = false;

  //getNews() {
  //  return this._newsService
  //    .getNews(this.searchText ?? "", this.newsType);
  //}

  //updateView(data: Report[]) {
  //  this.store.dispatch(fromStore.loadPostsSuccess({ posts: data }));
  //  this.news = data;
  //  this.ref.markForCheck();
  //  this.showModal();
  //}

  //setSearchSubscription() {
  //  this.searchSubject.pipe(
  //    takeUntil(this.ngUnsubscribe$),
  //    debounceTime(600),
  //    distinctUntilChanged()
  //  ).subscribe((searchText: string) => {
  //    this.searchText = searchText;
  //    this.getNews();
  //  });
  //}

  updateSearch(searchTextValue: any) {
    this.searchSubject.next(searchTextValue.target.value);
  }

  updateFilter() {
    //this.getNews();
    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams:
        { newsType: this.newsType }
    });
  }

  clickAddButton() {
    //this.modalIndex = this.news.length;
    //this.modalHeader = "Добавить новость";
    //this.modalData = Object.assign({}, this.defaultReport);
    //this.modal.show();
    //this.isDirty = false;
  }

  clickDeleteButton() {
    //this._newsService.deleteCheckedReports();
  }

  saveReport($event: Report) {
    //this._newsService.saveReport($event, this.modalIndex);
    this.store.dispatch(fromStore.updateReport({ report: $event }));
    this.modal.hide();
  }

  initReport($event: Report, i: number) {
    this.modalIndex = i;
    this.modalHeader = "Изменить новость";
    this.modalData = Object.assign({}, $event);
    this.modal.show();
    this.isDirty = false;
  }

  deleteReport(i: number) {
    //this._newsService.deleteReport(i);
  }

  rightClick(e: { clientX: any; clientY: any; }) {
    this.contextMenuPosition.left = e.clientX;
    this.contextMenuPosition.top = e.clientY;
    this.isContextMenuVisible = !this.isContextMenuVisible;
    return false;
  }

  noOneChecked() {
    //return this.news.every(x => !x.isChecked);
  }

  clickCheckAllButton() {
    //return this.news.forEach(x => x.isChecked = true);
  }

  ngOnDestroy() {
    //this.ngUnsubscribe$.next(0);
    //this.ngUnsubscribe$.complete();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.modal.isModalVisible && this.isDirty ? confirm("Изменения в открытом модальном окне не сохранены. Вы точно хотите покинуть страницу?") : true;
  }

  setIsDirty() {
    this.isDirty = true;
  }
}
