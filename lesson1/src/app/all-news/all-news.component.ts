import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { NewsService } from 'src/services/newsService';
import { UserService } from 'src/services/userService';
import { NewsPost } from '../../models/NewsPost';
import { User } from '../auth-service.service';
import { ModalCommonComponent } from '../modal-common/modal-common.component';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';
import { NewsPostTag } from 'src/models/NewsPostTag';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllNewsComponent implements OnInit, OnDestroy {
  @ViewChild(ModalCommonComponent) public modalComponent!: ModalCommonComponent;

  public search!: FormControl;
  public Tags = NewsPostTag;

  private subscritionAdmin$!: Subscription;
  private subscritionUser$!: Subscription;
  private subscriptionTag$!: Subscription;
  private subscritionFilter$!: Subscription;
  isModalOpen: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  news!: NewsPost[];
  postToEdit: NewsPost = new NewsPost();
  userPermission!: boolean;
  private subscrition!: Subscription;
  private tagTitle: string | null = null;
  searchClause: string = '';
  private user!: User;

  storeNews$!: Observable<NewsPost[]>;
  storeNewsCount$!: Observable<number>;

  constructor(
    private _newsService: NewsService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.State>
  ) {
    this.PullData();

    this.storeNews$ = this.store.pipe(select(fromStore.selectPosts));
    this.storeNewsCount$ = this.store.pipe(select(fromStore.selectPostsCount));

    this.subscritionAdmin$ = this.userService
      .IsAdmin()
      .subscribe((x) => (this.userPermission = x));

    this.subscritionUser$ = this.userService
      .GetAll()
      .subscribe((x) => (this.user = x));

    router.events.subscribe((_) => {
      console.log('changed1');
      this.tagTitle = null;
      this.search = new FormControl('', Validators.required);
      this.search.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.search = new FormControl(this.searchClause, Validators.required);
    this.subscritionFilter$ = this.search.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(async (val) => this._newsService.Find(val))
      )
      .subscribe(() => {
        if (this.tagTitle)
          this.news = this.news.filter(
            (x) => x.tag.toString() === this.tagTitle
          );
      });

    this.subscriptionTag$ = this.activatedRoute.queryParams.subscribe(
      (params) => {
        if (typeof params['tag'] !== 'undefined') {
          this.tagTitle = params['tag'];
        } else {
          this.tagTitle = null;
        }

        this.PullData();
      }
    );
  }

  onDeletePost(postId: number) {
    this._newsService.Delete([postId]);
  }

  onEditPost(postId: number) {
    this.postToEdit = this.news.find((x) => x.id == postId)!;
    this.modalComponent.Open();
  }

  onAddPost() {
    this.postToEdit = new NewsPost();
    this.modalComponent.Open();
  }

  onCloseModal() {
    this.modalComponent.Close();
  }

  onAddNewsPost(newsPost: NewsPost) {
    const existedPostIndex = this.news.findIndex((x) => x.id === newsPost.id);
    if (existedPostIndex > -1) {
      this._newsService.Update(newsPost);
    } else {
      this._newsService.Add(newsPost);
    }
  }

  onDeleteSelected() {
    const keys = this.news.filter((x) => x.isSelected).map((x) => x.id);
    this._newsService.Delete(keys);
  }

  isAnyToDelete(): boolean {
    return this.news?.some((x) => x.isSelected);
  }

  onRightClick(event: MouseEvent) {
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
    return false;
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  onSelectAll() {
    this.news = this.news.map((x) => {
      x = new NewsPost(x);
      x.isSelected = true;
      return x;
    });
  }

  getTitle(): string {
    return this.postToEdit.id === -1 ? 'Добавление' : 'Редактирование';
  }

  onPermissionToggleClick() {
    this.user.admin = !this.userPermission;
    this.userService.Update(this.user);
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
    this.subscritionAdmin$.unsubscribe();
    this.subscritionUser$.unsubscribe();
    this.subscriptionTag$.unsubscribe();
    this.subscritionFilter$.unsubscribe();
  }

  private PullData() {
    this._newsService.GetAll().subscribe((result) => {
      this.store.dispatch(fromStore.loadPostSuccess({ news: result }));
    });

    this.subscrition = this._newsService.GetAll().subscribe({
      next: (data) => {
        this.news = data;
        if (this.tagTitle)
          this.news = this.news.filter(
            (x) => x.tag.toString() === this.tagTitle
          );
        this.PushToRefresh();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
      },
    });
  }

  private PushToRefresh() {
    this.cdr.markForCheck();
  }

  public isAnySelected(): boolean {
    return this.news.some((x) => x.isSelected);
  }

  public GetCountByTag(tag: NewsPostTag): Observable<number> {
    return this.store.pipe(select(fromStore.selectPostsByTag(tag)));
  }
}
