import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input("sinle_post_data") single_post!: PostObj;
  @Output() addComment: EventEmitter<string> = new EventEmitter();
  title: string = "Заголовок";
  constructor() { }

  ngOnInit(): void {
  }

  onAddComment($event: string) {
    this.addComment.emit($event);
  }
}
