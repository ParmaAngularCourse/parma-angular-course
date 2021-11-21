import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostObj } from './post-types';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

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
  ]

  constructor() { }

  ngOnInit(): void {
  }

  deletePostHandler($event:PostObj){
    const index = this.posts.findIndex((e) => e.id == $event.id);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

}
