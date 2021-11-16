import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentObj } from '../../post-types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

  @Input() comments!: CommentObj[];
  @Output() addComment: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickAddButton(param: string) {
    this.addComment.emit(param);
  }

  ngDoCheck() {
    console.log('comment-list');
  }
}
