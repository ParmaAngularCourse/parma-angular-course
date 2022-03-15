import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsPost } from 'src/models/NewsPost';

@Component({
  selector: 'app-singe-card-news',
  templateUrl: './singe-card-news.component.html',
  styleUrls: ['./singe-card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingeCardNewsComponent {
  @Input() singlePost!: NewsPost;
  @Input() userPermissions = false;
  @Output() deletePost = new EventEmitter<number>();
  @Output() editPost = new EventEmitter<number>();

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  onSelect() {
    this.singlePost.isSelected = !this.singlePost.isSelected;
  }

  onDeletePost() {
    this.deletePost.emit(this.singlePost.id);
  }

  onAddNewsPost($event: NewsPost) {
    this.singlePost = $event;
  }

  onEdit() {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        operation: 'edit',
        itemId: this.singlePost.id,
      },
      queryParamsHandling: 'merge',
    });
    this.editPost.emit(this.singlePost.id);
  }
}
