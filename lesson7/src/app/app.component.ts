import { Component } from '@angular/core';
import { PostType } from './all-posts/post-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lesson7';

  filterPostType: PostType | null = null;

  selectPostTypeFilter(value: PostType | string | null) {
    this.filterPostType = value as PostType;
  }
}
