import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewsService } from 'src/services/newsService';
import { NewsPost } from '../../models/news-single';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllNewsComponent {

  public news: NewsPost[] = new NewsService().GetNews();
  public isOpenedModalCommon: boolean = false;
  public postToEdit: NewsPost | undefined | null = new NewsPost();
  constructor() { }

  onDeletePost(postId: number) {
    this.news = this.news.filter(item => item.id != postId);
  }

  onEditPost(postId: number) {
    this.postToEdit = this.news.find(x => x.id == postId) ?? null;
    this.onOpenModal();
  }

  onOpenModal() {
    this.isOpenedModalCommon = true;
  }

  onCloseModal() {
    this.isOpenedModalCommon = false;
    this.postToEdit = new NewsPost();
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
    
    this.onCloseModal();
  }
}
