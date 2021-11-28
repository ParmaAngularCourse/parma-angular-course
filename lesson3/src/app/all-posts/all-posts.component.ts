import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { PostObj, PostType } from './post-types';
import { SinglePostDetailComponent } from './single-post-detail/single-post-detail.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsComponent {

  public posts: PostObj[] = [
    {
      id: 0,
      date: "2021-01-01T08:09",
      title: "Post 1",
      text:"Text Post 1",
      isSelected: false,
      postType: PostType.economic,
    },
    {
      id: 1,
      date: "2021-01-01T10:16",
      title: "Post 2",
      text:"Text Post 2",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 2,
      date: "2021-01-02T11:18",
      title: "Post 3",
      text:"Text Post 3",
      isSelected: false,
      postType: PostType.politic,
    },
    {
      id: 3,
      date: "2021-01-03T14:16",
      title: "Post 4",
      text:"Text Post 5",
      isSelected: false,
      postType: PostType.tourism,
    },
    {
      id: 4,
      date: "2021-01-04T10:16",
      title: "Post 5",
      text:"Text Post 5",
      isSelected: false,
      postType: PostType.internet,
    },
    {
      id: 5,
      date: "2021-01-06T16:16",
      title: "Post 6",
      text:"Text Post 6",
      isSelected: false,
      postType: PostType.science,
    },
    {
      id: 6,
      date: "2021-01-07T17:16",
      title: "Post 7",
      text:"Text Post 7",
      isSelected: false,
      postType: PostType.politic,
    },
  ]
  editPost!:PostObj;
  titleDialog!:string;
  @ViewChild("popupPostDetailWindow") popupPostDetailWindow!: SinglePostDetailComponent;

  deletePostHandler(post:PostObj) {
    const index = this.posts.findIndex((e) => e.id == post.id);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

  ngDoCheck() {
    console.log('all-posts');
  }

  addNewPostHandler() {
    this.popupPostDetailWindow.isVisible = true;
    this.editPost = {id:-1, date:"", title:"", text:"", isSelected:false, postType:PostType.politic};
    this.titleDialog = "Добавить новость";
  }

  saveNewPostHandler(post:PostObj) {
    const findPost = this.posts.find((e) => e.id == post.id);
    if (findPost) {
      findPost.date = post.date;
      findPost.title = post.title;
      findPost.text = post.text;
      findPost.isSelected = post.isSelected;
    }
    else {
      let maxIndex = -1;
      this.posts.forEach((e) => {
        if (e.id > maxIndex) {
          maxIndex = e.id;
        }
      });
      maxIndex+=1;
      post.id = maxIndex;
      this.posts.push(post);
    }
    this.popupPostDetailWindow.isVisible = false;
  }

  closePopupPostDetailsHandler() {
    this.popupPostDetailWindow.isVisible = false;
  }

  editPostHandler(post:PostObj) {
    this.popupPostDetailWindow.isVisible = true;
    this.editPost = post;
    this.titleDialog = "Изменить новость";
  }

}
