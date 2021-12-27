import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommentObj } from '../../models/post-types';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {

  @ViewChild('ModalWindow') modalComponent?: ModalComponent;  

  @Input() comments!: CommentObj[];
  @Output() addComment: EventEmitter<string> = new EventEmitter();
  @Output() resetChange: EventEmitter<void> = new EventEmitter();

  initialAddValue: CommentObj = { commentText: "" };

  saveComment(param: string) {
    this.addComment.emit(param);
    this.modalComponent?.hide();
  }

  showModal() {
    this.initialAddValue = { commentText: "" };
    this.modalComponent?.show();
  }

  closeModal() {
    this.resetChange.emit();
    this.modalComponent?.hide();    
  }
}
