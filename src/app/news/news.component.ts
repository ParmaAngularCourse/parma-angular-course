import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ComponentCanDeactivate, NewsType, newsTypeColors, Report } from './news-types';
import { Role } from './roles';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
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
  private searchSubject: Subject<string> = new Subject();
  private routerSubscription!: any;

  constructor(private store: Store<fromStore.State>, private authService: AuthService, private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.routerSubscription = this.route.queryParams.subscribe(
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

  showModal() {
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

  updateSearch(searchTextValue: any) {
    this.searchSubject.next(searchTextValue.target.value);
  }

  updateFilter() {
    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams:
        { newsType: this.newsType }
    });
  }

  clickAddButton() {
  }

  clickDeleteButton() {
  }

  saveReport($event: Report) {
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
  }

  rightClick(e: { clientX: any; clientY: any; }) {
    this.contextMenuPosition.left = e.clientX;
    this.contextMenuPosition.top = e.clientY;
    this.isContextMenuVisible = !this.isContextMenuVisible;
    return false;
  }

  noOneChecked() {
  }

  clickCheckAllButton() {
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.modal.isModalVisible && this.isDirty ? confirm("Изменения в открытом модальном окне не сохранены. Вы точно хотите покинуть страницу?") : true;
  }

  setIsDirty() {
    this.isDirty = true;
  }
}
