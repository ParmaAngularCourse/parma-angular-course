import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PostObj, PostType } from '../post-types';
import { PermissionUser, UserType } from '../users';
@Component({
  selector: 'app-single-post-detail',
  templateUrl: './single-post-detail.component.html',
  styleUrls: ['./single-post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostDetailComponent {
    private _post: PostObj = {id:-1, date:"", title: "", text:"", isSelected: false, postType: PostType.politic};
    get post() {
      return this._post;
    }
    @Input() set post(value){
      this._post = value;
      this.cdr.markForCheck();
    };
    @Output() saveNewPostEvent: EventEmitter<PostObj> = new EventEmitter<PostObj>();
    @Output() closePopupEvent: EventEmitter<void> = new EventEmitter();

    PostType: PostType = PostType.politic;

    @Input() user!: UserType;
    get isShowSaveButton(): boolean { return this.user.permissions.includes(PermissionUser.save); }

    constructor(private cdr: ChangeDetectorRef) {}

    savePostHandler() {
      this.saveNewPostEvent.emit(this.post);
    }

    cancelSavePostHandler(){
      this.closePopupEvent.emit();
    }

    ngDoCheck() {
      console.log('single-post-detail');
    }

    selectPostType(postType:string) {
      this.post.postType = postType as PostType;
    }

    changeDate = (value:string) => {this.post.date = value;}
    changeTitle = (value:string) => {this.post.title = value;}
    changeText = (value:string) => {this.post.text = value;}
}
