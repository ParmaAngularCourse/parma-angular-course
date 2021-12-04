import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { news_single } from 'src/models/news-single';

@Component({
  selector: 'app-news-post-modal-window',
  templateUrl: './news-post-modal-window.component.html',
  styleUrls: ['./news-post-modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostModalWindowComponent {

  @Input("news_post") news_post: news_single | undefined;

  @Output() saveNews: EventEmitter<news_single> = new EventEmitter<news_single>();
  @Output() cancel = new EventEmitter();
  constructor() { }

  onEditSave(date: string, title: string, text: string) {
    const edited_news_post = this.news_post ?? new news_single();
    edited_news_post.title = title;
    edited_news_post.text = text;
    edited_news_post.uploadDate = new Date(date);
    edited_news_post.isSelected = false;
    this.saveNews.emit(edited_news_post);
    this.cancel.emit();

  }

  onCancel() {
    this.cancel.emit();
  }
  
}
