import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NewsService } from 'src/services/newsService';
import { NewsPost } from '../../models/NewsPost';
import { NewsPostModalWindowComponent } from '../news-post-modal-window/news-post-modal-window.component';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllNewsComponent {

  public news: NewsPost[] = new NewsService().GetNews();
  public postToEdit: NewsPost | undefined | null = new NewsPost();
  @ViewChild(NewsPostModalWindowComponent) public modalComponent!: NewsPostModalWindowComponent;


  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  constructor() { }

  onDeletePost(postId: number) {
    this.news = this.news.filter(item => item.id != postId);
  }

  onEditPost(postId: number) {
    this.postToEdit = this.news.find(x => x.id == postId) ?? null;
    this.modalComponent.onOpen(this.postToEdit);
  }

  onOpenModal() {
    this.modalComponent.onOpen(new NewsPost());
  }


  onAddNewsPost(newsPost: NewsPost) {
    const existedPostIndex = this.news.findIndex(x => x.id == newsPost.id);
    if (existedPostIndex > -1) {
      this.news[existedPostIndex] = newsPost;
    }
    else {
      newsPost.id = this.news.length + 1;
      this.news.push(newsPost);
    }

  }

  onDeleteSelected() {
    this.news = this.news.filter(item => item.isSelected == false);
  }

  isAnyToDelete(): boolean {
    return this.news.some(x => x.isSelected);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.contextmenu = true;
    return false;
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  onSelectAll() {
    this.news = this.news.map(x => { x = new NewsPost(x); x.isSelected = true; return x; });
  }

}

