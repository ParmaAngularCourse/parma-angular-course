import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostObj, PostType } from '../post-types';
@Component({
  selector: 'app-single-post-detail',
  templateUrl: './single-post-detail.component.html',
  styleUrls: ['./single-post-detail.component.css']
})
export class SinglePostDetailComponent {
    @Input() post: PostObj = {id:-1, date:"", title: "", text:"", isSelected: false, postType: PostType.politic};
    @Output() saveNewPostEvent: EventEmitter<PostObj> = new EventEmitter<PostObj>();
    @Output() closePopupEvent: EventEmitter<void> = new EventEmitter();
    

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
