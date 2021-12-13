import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostObj } from './post-types';

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
      date: "01.01.2021 08:09",
      title: "Post 1",
      text:"Text Post 1",
      isSelected: false
    },
    {
      id: 1,
      date: "01.01.2021 10:16",
      title: "Post 2",
      text:"Text Post 2",
      isSelected: false
    },
    {
      id: 2,
      date: "02.01.2021 11:18",
      title: "Post 3",
      text:"Text Post 3",
      isSelected: false
    },
    {
      id: 3,
      date: "03.01.2021 14:16",
      title: "Post 4",
      text:"Text Post 5",
      isSelected: false
    },
    {
      id: 4,
      date: "04.01.2021 10:16",
      title: "Post 5",
      text:"Text Post 5",
      isSelected: false
    },
    {
      id: 5,
      date: "06.01.2021 16:16",
      title: "Post 6",
      text:"Text Post 6",
      isSelected: false
    },
    {
      id: 6,
      date: "07.01.2021 17:16",
      title: "Post 7",
      text:"Text Post 7",
      isSelected: false
    },
  ]

  @Input() isVisiblePostDetailPopup: boolean = false;
  editPost!:PostObj;

  deletePostHandler(post:PostObj) {
    const index = this.posts.findIndex((e) => e.id === post.id);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

  ngDoCheck() {
    console.log('all-posts');
  }

  addNewPostHandler() {
    this.isVisiblePostDetailPopup = true;
    this.editPost = {id:-1, date:"", title:"", text:"", isSelected:false};
  }

  saveNewPostHandler(post:PostObj) {
    const findPost = this.posts.find((e) => e.id === post.id);
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
    this.isVisiblePostDetailPopup = false;
  }

  closePopupPostDetailsHandler() {
    this.isVisiblePostDetailPopup = false;
  }

  editPostHandler(post:PostObj) {
    this.isVisiblePostDetailPopup = true;
    this.editPost = post;
  }

}
