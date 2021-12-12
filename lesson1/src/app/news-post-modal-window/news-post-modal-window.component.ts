import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NewsPost } from 'src/models/NewsPost';
import { NewsPostTag } from 'src/models/NewsPostTag';

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
  public _date!: string;

  selectedTag: NewsPostTag | undefined;
  newsTags = Object.values(NewsPostTag).filter(x => x != NewsPostTag.noTag);
  constructor() {
    this.selectedTag = this.newsPost?.tag;
  }
  @ViewChild('modalInput_title') titleInput: ElementRef | undefined;
  @ViewChild('title') textInput: ElementRef | undefined;

  onEditSave() {
    const editedNewsPost = new NewsPost();
    editedNewsPost.id = this.newsPost?.id ?? -1;
    editedNewsPost.title = this.titleInput?.nativeElement.value;
    editedNewsPost.text = this.textInput?.nativeElement.value;
    editedNewsPost.uploadDate = this.parseDateString(this._date);
    editedNewsPost.isSelected = false;
    editedNewsPost.tag = this.selectedTag ?? NewsPostTag.noTag;
    this.cancel.emit();
    this.saveNews.emit(editedNewsPost);
    this.isOpen = false;
  }

  onOpen(post: NewsPost | null | undefined) {
    this.newsPost = null;
    this.isOpen = true;
  }
  onCancel() {
    this.isOpen = false;
    this.newsPost = null;
    this.cancel.emit();
  }

  private parseDateString(date: string): Date {

    if(date == undefined) return new Date();
    console.log(date);
    date = date?.replace('T', '-');
    var parts = date?.split('-');
    var timeParts = parts[3]?.split(':');

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), Number(timeParts[0]), Number(timeParts[1]));     
    // Note: months are 0-based
  }
}
