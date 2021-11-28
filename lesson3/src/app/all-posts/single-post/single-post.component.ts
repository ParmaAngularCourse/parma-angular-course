import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent {

  @Input() post!: PostObj;
  @Output() deletePostEvent: EventEmitter<PostObj> = new EventEmitter();
  @Output() editPostEvent: EventEmitter<PostObj> = new EventEmitter();

  selectedPostHandler(checked:boolean, post: PostObj)
  {
    post.isSelected=checked;
  }

  deletePostHandler()
  {
    this.deletePostEvent.emit(this.post);
  }

  ngDoCheck() {
    console.log('single-post ' + this.post.id);
  }

  editPostHandler(){
    this.editPostEvent.emit(this.post);
  }

}
