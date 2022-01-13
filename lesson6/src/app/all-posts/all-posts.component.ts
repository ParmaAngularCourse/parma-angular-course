import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { HeaderPostDetailComponent } from './header-post-detail/header-post-detail.component';
import { PostObj } from './post-types';
import { SinglePostDetailComponent } from './single-post-detail/single-post-detail.component';
import { UserType } from './users';
import { UserInfoService } from '../user-info.service';
import { bufferCount, concatAll, debounceTime, from, map, merge, mergeAll, mergeMap, of, reduce, scan, Subject, switchMap, takeUntil, tap, toArray, windowCount, zip, Observable, EMPTY, distinctUntilChanged, filter, concatMap, switchAll } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent implements OnInit {

  public posts: PostObj[] = [];
  public posts2: PostObj[] = [];
  public posts3: PostObj[] = [];

  //editPost!:PostObj; Через свойство не работает, если есть вложенный компонент
  titleDialog:string = "";
  @ViewChild("popupPostDetailWindow") popupPostDetailWindow!: HeaderPostDetailComponent;
  @ViewChild("postDetailContent") postDetailContent!:SinglePostDetailComponent;
  isVisibleContextMenu: boolean = false;
  contextMenuX = 0;
  contextMenuY = 0;
  isActiveDeletePostBtn: boolean = false;

  user: UserType = {name: "", permissions: []};

  private ngUnsubscribe$!: Subject<void>;

  searchControl!:FormControl;
  searchValue: string = "";

  constructor(private postService: PostsService, private userInfoService: UserInfoService, private cdr: ChangeDetectorRef) {
    this.ngUnsubscribe$ = new Subject<void>();

      this.postService.getPostsOberverble().pipe(
        switchMap(value => {
            let t1: PostObj[] = [];
            let t2: PostObj[] = [];
            let t3: PostObj[] = [];
            return of(value).pipe(
              concatAll(),
              bufferCount(3),
              map((data)=>{
                if (data[0]) {
                  t1.push(data[0]);
                }
                if (data[1]) {
                  t2.push(data[1]);
                }
                if (data[2]) {
                  t3.push(data[2]);
                }
                return [t1, t2, t3]
              }),
          );
        }),
        takeUntil(this.ngUnsubscribe$),
      ).subscribe({
        next: (data) => {
          this.posts = data[0];
          this.posts2 = data[1];
          this.posts3 = data[2];
          this.cdr.markForCheck();
        },
        error: (e) => { console.log(e.status + ' '+ e.message); },
        complete: () => { 
          console.info('complete getPosts all-post component'); }
    });

    this.userInfoService.getUserObserverble()
    .pipe(
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.markForCheck();
      },
      error: (e) => { console.log(e.status + ' '+ e.message); },
      complete: () => { console.info('complete get user all-post component'); }
    });
  }

  splitArray(array: PostObj[]): PostObj[][] {
    let result: PostObj[][];
    result = [];
    const arrCount = 3;
    let countSearch = 0;
    const mod3 = array.length % arrCount;
    if (mod3 === 0) {
      countSearch = array.length / arrCount;
    } else {
      countSearch = Math.trunc(array.length / arrCount) + 1;
    }
    let next = 0;
    for(let i = 0; i < arrCount; i++) {
      result[i]=[];
      for(let j = 0; j < countSearch; j++) {
        if (array.length > next) {
          const element = array[next++];
          result[i][j]=element;
        }
      }
    }

    return result;
  }  

  ngOnInit(): void {
    this.searchControl = new FormControl(this.searchValue);
    this.searchControl.valueChanges
    .pipe(
      debounceTime(600),
      distinctUntilChanged(),
      // Если есть много потоков, и нужно прервать предыдущий
      switchMap(value => {
        return this.postService.searchPosts2(value);  
      }),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(value => {
      this.postService.setResultSearch(value);
    });
  }

  ngDoCheck() {
    //console.log('all-posts');
  }

  deletePostsHandler() {
    this.postService.deleteSelectedPosts(this.posts);
  }

  deletePostHandler(post:PostObj) {
    this.postService.deletePost(post);
  }

  addNewPostHandler() {
    this.popupPostDetailWindow.show(true);
    let editPost = {id:-1, date:"", title:"", text:"", isSelected:false, postType: null};
    this.postDetailContent.post = editPost;
    this.titleDialog = "Добавить новость";
  }

  saveNewPostHandler(post:PostObj) {
    if (post.id === -1){
      this.postService.addPost(post);
    }
    else {
      this.postService.updatePost(post);
    }
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

  rightClickHandler(event:MouseEvent):boolean {
    const html = document.documentElement;
    const body = document.body;

    const scrollTop = html.scrollTop || body && body.scrollTop || 0;

    this.contextMenuX=event.clientX;
    this.contextMenuY=event.clientY + scrollTop;
    this.isVisibleContextMenu = true;
    return false;
  }

  disableContextMenuHandler(){
    this.isVisibleContextMenu = false;
  }

  selectAllPostsHandler() {
    this.posts = this.posts?.map(e => {
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
    if (this.posts) {
      this.isActiveDeletePostBtn = Boolean(this.posts.find(e => e.isSelected));
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.unsubscribe();
    this.ngUnsubscribe$.complete();
  }

  changeUser(userName:string){
    this.userInfoService.loadUser(userName);
  }

}