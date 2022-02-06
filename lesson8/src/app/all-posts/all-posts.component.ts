import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PostsService } from '../services/posts.service';
import { PostObj, PostType } from './post-types';
import { UserType } from './users';
import { UserInfoService } from '../services/user-info.service';
import {
  bufferCount,
  concatAll,
  debounceTime,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  distinctUntilChanged,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs';
import { CountPostTypes } from './count-post-types';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent implements OnInit {

  public countPostTypes$: Observable<CountPostTypes[] | undefined>
  public count$: Observable<number | undefined>;
  public posts$: Observable<PostObj[] | undefined>;
  public posts2: PostObj[] = [];
  public posts3: PostObj[] = [];

  isVisibleContextMenu: boolean = false;
  contextMenuX = 0;
  contextMenuY = 0;
  isActiveDeletePostBtn: boolean = false;

  user: UserType | null = null;

  postTypes: string[] = [];
  selectPostTypeValue: PostType | null = null;

  private ngUnsubscribe$!: Subject<void>;
  private subjectPostTypeMenu: Subject<PostType | null>;

  searchControl!: FormControl;
  searchValue: string = '';

  constructor(
    private postService: PostsService,
    private userInfoService: UserInfoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.State>
  ) {
    this.ngUnsubscribe$ = new Subject<void>();
    this.subjectPostTypeMenu = new Subject<PostType | null>();


    // this.postService
    //   .getPostsOberverble()
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe(results => this.store.dispatch(fromStore.actionPostsSuccess({posts:results})));

    this.store.dispatch(fromStore.actionLoadPosts());

    this.posts$ = this.store.pipe(select(fromStore.selectorPosts));
    this.count$ = this.store.pipe(select(fromStore.selectorCountPosts));
    this.countPostTypes$ = this.store.pipe(select(fromStore.selectorPostTypesCount));

    // this.postService
    //   .getPostsOberverble()
    //   .pipe(
    //     switchMap((value) => {
    //       let t1: PostObj[] = [];
    //       let t2: PostObj[] = [];
    //       let t3: PostObj[] = [];
    //       //TODO: здесь не выводятся данные, если массив пустой, нужно подумать как поправить
    //       return of(value).pipe(
    //         concatAll(),
    //         bufferCount(3),
    //         map((data) => {
    //           if (data[0]) {
    //             t1.push(data[0]);
    //           }
    //           if (data[1]) {
    //             t2.push(data[1]);
    //           }
    //           if (data[2]) {
    //             t3.push(data[2]);
    //           }
    //           return [t1, t2, t3];
    //         })
    //       );
    //     }),
    //     takeUntil(this.ngUnsubscribe$)
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       this.posts = data[0];
    //       this.posts2 = data[1];
    //       this.posts3 = data[2];
    //       this.cdr.markForCheck();
    //     },
    //     error: (e) => {
    //       console.log(e.status + ' ' + e.message);
    //     },
    //     complete: () => {
    //       console.info('complete getPosts all-post component');
    //     },
    //   });

    this.userInfoService
      .getUserObserverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (data) => {
          this.user = data;
          this.cdr.markForCheck();
        },
        error: (e) => {
          console.log(e.status + ' ' + e.message);
        },
        complete: () => {
          console.info('complete get user all-post component');
        },
      });

    for (const item in PostType) {
      this.postTypes.push(item);
    }
  }

  ngOnInit(): void {
    this.searchControl = new FormControl(this.searchValue);
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        // Если есть много потоков, и нужно прервать предыдущий
        switchMap((value) => {
          return this.postService.searchPosts2({
            title: value,
            postType: this.selectPostTypeValue,
          });
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((value) => {
        this.postService.setResultSearch(value);
      });
  }

  ngAfterViewInit(): void {
    //Тут важен порядок подписки
    this.subjectPostTypeMenu
      .pipe(
        switchMap((value) => {
          return this.postService.searchPosts2({
            title: (this.searchControl?.value as string) || '',
            postType: this.selectPostTypeValue,
          });
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((value) => {
        this.postService.setResultSearch(value);
      });

    this.route.queryParams
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        this.setValuePostType(params['filter'] as PostType);
      });
  }

  ngDoCheck() {
    //console.log('all-posts');
  }

  deletePostsHandler() {
    //TODO: здесь меняется тип на Observeble
    //this.postService.deleteSelectedPosts(this.posts$);
  }

  deletePostHandler(post: PostObj) {
    this.postService.deletePost(post);
  }

  addNewPostHandler() {
    this.router.navigate(['/posts/add']);
  }

  editPostHandler(post: PostObj) {
    this.router.navigate(['/posts/edit', post.id], {
      relativeTo: this.route,
    });
  }

  rightClickHandler(event: MouseEvent): boolean {
    const html = document.documentElement;
    const body = document.body;

    const scrollTop = html.scrollTop || (body && body.scrollTop) || 0;

    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY + scrollTop;
    this.isVisibleContextMenu = true;
    return false;
  }

  disableContextMenuHandler() {
    this.isVisibleContextMenu = false;
  }

  selectAllPostsHandler() {
    //TODO: здесь меняется тип на Observeble
    // this.posts$ = this.posts$?.map((e) => {
    //   if (!e.isSelected) {
    //     e.isSelected = true;
    //     return { ...e };
    //   } else return e;
    // });
    this.isActiveDeletePostBtn = true;
    this.disableContextMenuHandler();
  }

  selectPostHandler(post: PostObj) {
    //TODO: здесь меняется тип на Observeble
    // if (this.posts$) {
    //   this.isActiveDeletePostBtn = Boolean(
    //     this.posts$.find((e) => e.isSelected)
    //   );
    // }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  changeUser(userName: string) {
    this.userInfoService.loadUser(userName);
  }

  setValuePostType(value: PostType | null) {
    this.selectPostTypeValue = value;
    this.subjectPostTypeMenu.next(value);
  }

  selectPostTypeFilter(value: PostType | string) {
    switch (value as PostType) {
      case PostType.politic:
        this.setValuePostType(value as PostType);
        break;
      case PostType.tourism:
        this.setValuePostType(value as PostType);
        break;
      case PostType.economic:
        this.setValuePostType(value as PostType);
        break;
      case PostType.science:
        this.setValuePostType(value as PostType);
        break;
      case PostType.internet:
        this.setValuePostType(value as PostType);
        break;
      default:
        this.setValuePostType(null);
        break;
    }
    this.router.navigate(['/posts'], {
      relativeTo: this.route,
      queryParams: !(value === '' || value === null) ? { filter: value } : null,
    });
  }
}
