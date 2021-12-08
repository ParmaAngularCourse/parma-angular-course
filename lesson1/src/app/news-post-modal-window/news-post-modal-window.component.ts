import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsPost } from 'src/models/news-single';

@Component({
  selector: 'app-news-post-modal-window',
  templateUrl: './news-post-modal-window.component.html',
  styleUrls: ['./news-post-modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostModalWindowComponent {

  @Input() newsPost: NewsPost | null | undefined;
  @Input() isOpen = false;

  @Output() saveNews = new EventEmitter<NewsPost>();
  @Output() cancel = new EventEmitter<void>();
  constructor() { }

  onEditSave(date: string, title: string, text: string) {
    const editedNewsPost = this.newsPost ?? new NewsPost();
    editedNewsPost.title = title;
    editedNewsPost.text = text;
    editedNewsPost.uploadDate = new Date(date);
    editedNewsPost.isSelected = false;
    this.cancel.emit();
    this.saveNews.emit(editedNewsPost);
    this.isOpen = false;
  }

  onCancel() {
    this.isOpen = false;
    this.cancel.emit();
  }
}
