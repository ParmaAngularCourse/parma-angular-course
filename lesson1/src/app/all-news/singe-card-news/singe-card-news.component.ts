import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsPost } from 'src/models/NewsPost';

@Component({
  selector: 'app-singe-card-news',
  templateUrl: './singe-card-news.component.html',
  styleUrls: ['./singe-card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingeCardNewsComponent {

  @Input() singlePost!: NewsPost
  @Output() deletePost =  new EventEmitter<number>();
  @Output() editPost = new EventEmitter<number>();

  constructor() { }


  onSelect() {
    this.singlePost.isSelected = !this.singlePost.isSelected;
  }

  onDeletePost() {
    this.deletePost.emit(this.singlePost.id);
  }

  onAddNewsPost($event: NewsPost) {
    this.singlePost = $event;
  }

  onEdit(){
    this.editPost.emit(this.singlePost.id);
  }
}
