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
    isVisible:boolean = false;

    savePostHandler(datePost: string, titlePost: string, textPost:string) {
      let post = {id:this.post.id, date:datePost, title:titlePost, text: textPost, isSelected:this.post.isSelected, postType: this.post.postType};
      this.saveNewPostEvent.emit(post);
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
}
