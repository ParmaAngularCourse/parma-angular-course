import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostObj } from '../post-types';
import { PermissionUser, UserType } from '../users';
import * as fromStore from './../../store'

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent {

  @Input() post!:PostObj;

  @Input() user!: UserType | null;

  @Output() deletePostEvent = new EventEmitter<PostObj>();
  @Output() editPostEvent = new EventEmitter<PostObj>();
  @Output() selectPostEvent = new EventEmitter<PostObj>();

  constructor(private cdr: ChangeDetectorRef,
    private store$: Store<fromStore.State>) { }

  selectedPostHandler(checked:boolean, post: PostObj)
  {
    this.store$.dispatch(fromStore.actionPostSelected({selectedPost: post}));
    this.selectPostEvent.emit(post);
  }

  deletePostHandler()
  {
    this.deletePostEvent.emit(this.post);
  }

  ngDoCheck() {
    //console.log('single-post ' + this.post.id);
  }

  editPostHandler(){
    this.editPostEvent.emit({...this.post});
  }

}
