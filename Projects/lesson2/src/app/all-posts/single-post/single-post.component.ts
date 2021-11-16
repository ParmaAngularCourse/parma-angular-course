import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostObj } from '../post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent implements OnInit {

  @Input("sinle_post_data") single_post!: PostObj;
  @Output() addComment: EventEmitter<string> = new EventEmitter();
  title: string = "Заголовок";
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.title = 'Загоовок 2';
      this.cd.detectChanges();
    }, 3000)
  }

  onAddComment($event: string) {
    this.addComment.emit($event);
  }

  ngDoCheck() {
    console.log('single-post ' + this.single_post.id);
  }
}
