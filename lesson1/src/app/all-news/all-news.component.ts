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
import { select, Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  pipe,
  filter,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { NewsService } from 'src/services/newsService';
import { UserService } from 'src/services/userService';
import { NewsPost } from '../../models/NewsPost';
import { User } from '../auth-service.service';
import { ModalCommonComponent } from '../modal-common/modal-common.component';
import * as fromStore from '../store';

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
  news!: NewsPost[];

  private subscritionAdmin$!: Subscription;
  private subscritionUser$!: Subscription;
  private subscriptionTag$!: Subscription;
  private subscritionFilter$!: Subscription;
  isModalOpen: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  postToEdit: NewsPost = new NewsPost();
  userPermission!: boolean;
  private subscrition!: Subscription;
  private tagTitle: string | null = null;
  searchClause: string = '';
  private user!: User;

  storeNews$!: Observable<NewsPost[] | undefined>;
  storeNewsCount$!: Observable<number | undefined>;

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
    this.searchClause = '';
    this.activatedRoute.queryParamMap
      .pipe(filter((x) => x.has('clause')))
      .subscribe((x) => {
        this.searchClause = x.get('clause');
      });

    this.search = new FormControl(this.searchClause, Validators.required);

    this.subscritionFilter$ = this.search.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap((x: string) => {
          if (x !== '')
            this.router.navigate([], {
              queryParams: { clause: x },
              queryParamsHandling: 'merge',
            });
        }),
        switchMap(async (val) => {
          this._newsService.Find(val);
        })
      )
      .subscribe(() => {
        if (this.tagTitle)
          this.news = this.news.filter(
            (x) => x.tag.toString() === this.tagTitle
          );
      });
    this.search.updateValueAndValidity();

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

    this.activatedRoute.queryParamMap
      .pipe(
        filter((x) => x.has('operation')),
        debounceTime(200)
      )
      .subscribe((x) => {
        if (x.get('operation') === 'add') this.onAddPost();
        else {
          if (x.has('itemId') && x.get('operation') === 'edit')
            this.onEditPost(parseInt(x.get('itemId')!));
        }
      });
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
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        operation: 'add',
      },
      queryParamsHandling: 'merge',
    });
    this.modalComponent.Open();
  }

  onCloseModal() {
    this.modalComponent.Close();
  }

  onAddNewsPost(newsPost: NewsPost) {
    this.store.dispatch(fromStore.addNewsPost({ post: newsPost }));
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

    this.news = [];
  }

  private PullData() {
    this.store.dispatch(fromStore.loadPost());

    this._newsService.GetAll().subscribe((result) => {
      this.store.dispatch(fromStore.loadPostSuccess({ news: result }));
    });
  }

  public GetCountByTag(tag: NewsPostTag): Observable<number | undefined> {
    return this.store.pipe(select(fromStore.selectPostsByTag(tag)));
  }
}
