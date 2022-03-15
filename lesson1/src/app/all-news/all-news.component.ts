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
  filter,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { NewsService } from 'src/services/newsService';
import { UserService } from 'src/services/userService';
import { NewsPost } from '../../models/NewsPost';
import { User } from '../auth-service.service';
import { ModalCommonComponent } from '../modal-common/modal-common.component';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllNewsComponent implements OnInit, OnDestroy {
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
  public search!: FormControl;
  private tagTitle: string | null = null;
  private user!: User;
  private searchClause: string | null = '';

  constructor(
    private _newsService: NewsService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.PullData();

    this.subscritionAdmin$ = this.userService
      .IsAdmin()
      .subscribe((x) => (this.userPermission = x));

    this.subscritionUser$ = this.userService
      .GetAll()
      .subscribe((x) => (this.user = x));
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
          if (x!== '')
            this.router.navigate([], {
              queryParams: {'clause': x},
              queryParamsHandling: 'merge',
            });
        }),
        switchMap(async (val) => {
          this._newsService.Find(val);
        }),
        
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
  }

  @ViewChild(ModalCommonComponent) public modalComponent!: ModalCommonComponent;

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

    this.news = [];
  }

  private PullData() {
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
}
