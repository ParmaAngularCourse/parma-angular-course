import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { HeaderPostDetailComponent } from './header-post-detail/header-post-detail.component';
import { PostObj, PostType } from './post-types';
import { SinglePostDetailComponent } from './single-post-detail/single-post-detail.component';
import { UserType } from './users';
import { UserInfoService } from '../user-info.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent {

  public posts: PostObj[] = []

  //editPost!:PostObj; Через свойство не работает, если есть вложенный компонент
  titleDialog!:string;
  @ViewChild("popupPostDetailWindow") popupPostDetailWindow!: HeaderPostDetailComponent;
  @ViewChild("postDetailContent") postDetailContent!:SinglePostDetailComponent;
  isVisibleContextMenu: boolean = false;
  contextMenuX = 0;
  contextMenuY = 0;
  isActiveDeletePostBtn: boolean = false;

  isShowDeleteButton: boolean = true;

  user: UserType;

  private ngUnsubscribe$!: Subject<void>;

  constructor(private postService: PostsService, private userInfoService: UserInfoService, private cdr: ChangeDetectorRef) {
    this.ngUnsubscribe$ = new Subject<void>();
    postService.getPosts().pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(
      (data) => {
        this.posts = data;
        this.cdr.markForCheck();
      },
      (error: HttpErrorResponse) => {console.log(error.status + ' '+ error.message)},
      () => console.info('complete')
    );
    this.user = userInfoService.getUser();
  }

  ngDoCheck() {
    console.log('all-posts');
  }

  deletePostsHandler() {
    this.posts = this.postService.deleteSelectedPosts();
  }

  deletePostHandler(post:PostObj) {
    this.posts = this.postService.deletePost(post);
  }

  addNewPostHandler() {
    this.popupPostDetailWindow.show(true);
    let editPost = {id:-1, date:"", title:"", text:"", isSelected:false, postType:PostType.politic};
    this.postDetailContent.post = editPost;
    this.titleDialog = "Добавить новость";
  }

  saveNewPostHandler(post:PostObj) {
    this.posts = this.postService.saveNewPost(post);
    this.popupPostDetailWindow.show(false);
  }

  closePopupPostDetailsHandler() {
    this.popupPostDetailWindow.show(false);
  }

  editPostHandler(post:PostObj) {
    this.postDetailContent.post = post;
    this.titleDialog = "Изменить новость";
    this.popupPostDetailWindow.show(true);
  }

  rightClickHandler(event:any):boolean {
    var html = document.documentElement;
    var body = document.body;

    var scrollTop = html.scrollTop || body && body.scrollTop || 0;

    this.contextMenuX=event.clientX;
    this.contextMenuY=event.clientY + scrollTop;
    this.isVisibleContextMenu = true;
    return false;
  }

  disableContextMenuHandler(){
    this.isVisibleContextMenu = false;
  }

  selectAllPostsHandler() {
    this.posts = this.posts.map(e => {
      if (!e.isSelected) {
        e.isSelected= true;
        return {...e}
    }
      else return e;
    });
    this.isActiveDeletePostBtn = true;
    this.disableContextMenuHandler();
  }

  selectPostHandler(post:PostObj) {
    let findPost = this.posts.find(e => e.id == post.id);
    if (findPost) {
      findPost.isSelected = post.isSelected;
    }
    this.isActiveDeletePostBtn = false;
    this.posts.forEach(e => {
      if (e.isSelected) {
        this.isActiveDeletePostBtn = true;
        return;
      }
    });
  }

}
