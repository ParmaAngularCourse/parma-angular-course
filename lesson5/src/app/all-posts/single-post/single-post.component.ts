import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PostObj } from '../post-types';
import { PermissionUser, user1, user2, UserType } from '../users';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent {
  private _post!: PostObj;
  @Input() set post(value:PostObj) { 
    this._post = value;
    this.cdr.markForCheck();
  }
  get post():PostObj {
    return this._post;
  }

  @Input() user!: UserType;

  get isShowDeleteButton():boolean { return this.user.permissions.includes(PermissionUser.delete); }

  @Output() deletePostEvent: EventEmitter<PostObj> = new EventEmitter();
  @Output() editPostEvent: EventEmitter<PostObj> = new EventEmitter();
  @Output() selectPostEvent: EventEmitter<PostObj> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  selectedPostHandler(checked:boolean, post: PostObj)
  {
    post.isSelected=checked;
    this.selectPostEvent.emit(post);
  }

  deletePostHandler()
  {
    this.deletePostEvent.emit(this.post);
  }

  ngDoCheck() {
    console.log('single-post ' + this.post.id);
  }

  editPostHandler(){
    let post = {id: this.post.id, 
      date: this.post.date, 
      title: this.post.title, 
      text: this.post.text, 
      isSelected: this.post.isSelected, 
      postType: this.post.postType};
    this.editPostEvent.emit(post);
  }

}
