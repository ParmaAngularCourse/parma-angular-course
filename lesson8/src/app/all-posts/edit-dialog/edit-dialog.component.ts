import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderPostDetailComponent } from '../header-post-detail/header-post-detail.component';
import { PostObj } from '../post-types';
import { UserType } from '../users';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SinglePostDetailComponent } from '../single-post-detail/single-post-detail.component';
import { UserInfoService } from '../../services/user-info.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

type paramRequest = {
  id: number;
};

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  private ngUnsubscribe$: Subject<void> = new Subject();
  private posts: PostObj[] = [];
  private id: number | null = null;
  titleDialog: string = '';
  user: UserType | null = null;
  @ViewChild('popupPostDetailWindow')
  popupPostDetailWindow!: HeaderPostDetailComponent;
  @ViewChild('postDetailContent') postDetailContent!: SinglePostDetailComponent;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private router: Router,
    private store$: Store<fromStore.State>
  ) {}

  ngOnInit(): void {
    //this.popupPostDetailWindow.show(true);
  }

  ngAfterViewInit(): void {
    this.postService
      .getPostsOberverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        this.posts = value;
        this.ResolvePost();
      });
    this.userInfoService
      .getUserObserverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        this.user = value;
      });
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        const valueParam = params as paramRequest;
        if (valueParam && valueParam.id) {
          this.id = +valueParam.id;
          this.ResolvePost();
        } else {
          if (this.popupPostDetailWindow && this.postDetailContent) {
            let editPost = {
              id: -1,
              date: '',
              title: '',
              text: '',
              isSelected: false,
              postType: null,
            };
            this.postDetailContent.post = editPost;
            this.titleDialog = 'Добавить новость';
          }
        }
        this.popupPostDetailWindow.show(true);
      });
  }

  private ResolvePost() {
    let post = this.posts.find((e) => e.id === this.id);
    if (post && this.popupPostDetailWindow) {
      this.postDetailContent.post = { ...post };
      this.titleDialog = 'Изменить новость';
    }
  }

  closePopupPostDetailsHandler() {
    this.router.navigate(['/posts'], { relativeTo: this.route });
    this.store$.dispatch(fromStore.actionEditPostCancel());
  }

  show(isVisible: boolean) {
    this.popupPostDetailWindow.show(isVisible);
  }

  saveNewPostHandler(post: PostObj) {
    if (post.id === -1) {
      this.postService.addPost(post);
    } else {
      //this.postService.updatePost(post);
      this.store$.dispatch(fromStore.actionEditPost({editPost: post}));
    }
    this.popupPostDetailWindow.show(false);
    this.router.navigate(['/posts'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.postDetailContent.canDeactivate();
  }
}
