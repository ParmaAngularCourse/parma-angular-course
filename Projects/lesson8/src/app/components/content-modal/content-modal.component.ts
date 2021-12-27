import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommentObj } from '../../models/post-types';

@Component({
  selector: 'app-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent implements OnChanges {
  @Input() initialValue: CommentObj = { commentText: "" };

  @Output() saveModal: EventEmitter<string> = new EventEmitter();
  @Output() closeModal: EventEmitter<void> = new EventEmitter(); 

  value: string = "";

  saveValue($event: Event) {
    this.value = ($event.target as HTMLInputElement).value;       
  }

  saveComment() {    
    this.saveModal.emit(this.value); 
  }

  close() {
    this.closeModal.emit();
  }

  ngOnChanges() {
    this.value = this.initialValue.commentText;
  }
}
