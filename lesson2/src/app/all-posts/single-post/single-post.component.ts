import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input("single_post_data") post!: PostObj;
  @Output() deletePost: EventEmitter<PostObj> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectedPostHandler(checked:boolean, post: PostObj)
  {
    post.isSelected=checked;
  }

  deletePostHandler(post:PostObj)
  {
    this.deletePost.emit(post);
  }

}
