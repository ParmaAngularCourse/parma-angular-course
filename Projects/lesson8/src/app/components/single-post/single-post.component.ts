import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostObj } from '../../models/post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

  @Input() single_post!: PostObj;

  @Output() addComment: EventEmitter<string> = new EventEmitter();
  @Output() resetChange: EventEmitter<void> = new EventEmitter();
  title: string = "Заголовок";

  constructor(private router: Router) {}

  onAddComment($event: string) {
    this.addComment.emit($event);
  }

  onResetChange() {
    this.resetChange.emit();
  }

  viewPost() {
    this.router.navigate(['post/' + this.single_post.id]);
  }
}
