import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { HeaderPostDetailComponent } from './header-post-detail/header-post-detail.component';
import { PostObj, PostType } from './post-types';
import { SinglePostDetailComponent } from './single-post-detail/single-post-detail.component';
import { PermissionUser, user1, user2, UserType } from './users';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent {

  public posts: PostObj[] = [
    {
      id: 0,
      date: "2021-01-01T08:09",
      title: "post 1",
      text:"Text Post 1",
      isSelected: false,
      postType: PostType.economic,
    },
    {
      id: 1,
      date: "2021-01-01T10:16",
      title: "post 2",
      text:"Text Post 2",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 2,
      date: "2021-01-02T11:18",
      title: "post 3",
      text:"Text Post 3",
      isSelected: false,
      postType: PostType.politic,
    },
    {
      id: 3,
      date: "2021-01-03T14:16",
      title: "post 4",
      text:"Text post 4",
      isSelected: false,
      postType: PostType.tourism,
    },
    {
      id: 4,
      date: "2021-01-04T10:16",
      title: "post 5",
      text:"Text Post 5",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 5,
      date: "2021-01-06T16:16",
      title: "post 6",
      text:"Text Post 6",
      isSelected: false,
      postType: PostType.science,
    },
    {
      id: 6,
      date: "2021-01-07T17:16",
      title: "post 7",
      text:"Text Post 7",
      isSelected: false,
      postType: PostType.politic,
    },
  ]

  //editPost!:PostObj; Через свойство не работает, если есть вложенный компонент
  titleDialog:string = "";
  @ViewChild("popupPostDetailWindow") popupPostDetailWindow!: HeaderPostDetailComponent;
  @ViewChild("postDetailContent") postDetailContent!:SinglePostDetailComponent;
  isVisibleContextMenu: boolean = false;
  contextMenuX = 0;
  contextMenuY = 0;
  isActiveDeletePostBtn: boolean = false;
  user: UserType = user1;

  get permissions(): PermissionUser[] { return this.user.permissions; };

  

  ngDoCheck() {
    console.log('all-posts');
  }

  deletePostsHandler() {
    this.posts = this.posts.filter(e => !e.isSelected);
  }

  deletePostHandler(post:PostObj) {
    const index = this.posts.findIndex((e) => e.id === post.id);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

  addNewPostHandler() {
    this.popupPostDetailWindow.show(true);
    let editPost = {id:-1, date:"", title:"", text:"", isSelected:false, postType:PostType.politic};
    this.postDetailContent.post = editPost;
    this.titleDialog = "Добавить новость";
  }

  saveNewPostHandler(post:PostObj) {
    if (post.id === -1)
    {
      this.posts.push({
        ...post,
        id: this.posts.reduce((maxValue, post)=> maxValue > post.id ? maxValue: post.id, -1) + 1,
      });
    }
    else{
      const id = this.posts.findIndex((e) => e.id === post.id);
      this.posts[id] = post;
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
    this.isActiveDeletePostBtn = Boolean(this.posts.find(e => e.isSelected));
  }

}