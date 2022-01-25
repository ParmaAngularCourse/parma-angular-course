import { Component, Input } from '@angular/core';
import { PostType } from '../all-posts/post-types';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  constructor() {}

  @Input() filterPostType: PostType | null = null;

  selectPostTypeFilter(value: PostType | null) {
    this.filterPostType = value;
  }
}
