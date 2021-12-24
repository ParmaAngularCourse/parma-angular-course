import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { flatMap } from 'rxjs';
import { UserPemission } from 'src/models/userPermissions';
import { NewsService } from 'src/services/newsService';
import { NewsPost } from '../../models/NewsPost';
import { ModalCommonComponent } from '../modal-common/modal-common.component';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllNewsComponent {


  @ViewChild(ModalCommonComponent) public modalComponent!: ModalCommonComponent;

  isModalOpen: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  news: NewsPost[] = new NewsService().GetNews();
  postToEdit: NewsPost = new NewsPost();
  userPermission = UserPemission;
  
  onDeletePost(postId: number) {
    this.news = this.news.filter(item => item.id != postId);
  }

  onEditPost(postId: number) {
    this.postToEdit = this.news.find(x => x.id === postId) ?? new NewsPost();
    this.modalComponent.Open();
  }

  onAddPost() {
    this.postToEdit = new NewsPost();
    this.modalComponent.Open();
  }
  onCloseModal() {
    this.modalComponent.Close();
  }

  onAddNewsPost(newsPost: NewsPost) {
    const existedPostIndex = this.news.findIndex(x => x.id === newsPost.id);
    if (existedPostIndex > -1) {
      this.news[existedPostIndex] = newsPost;
    }
    else {
      newsPost.id = this.news.length + 1;
      this.news.push(newsPost);
    }
  }

  onDeleteSelected() {
    this.news = this.news.filter(item => item.isSelected === false);
  }

  isAnyToDelete(): boolean {
    return this.news.some(x => x.isSelected);
  }

  onRightClick(event: MouseEvent) {
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

  getTitle(): string {
    return this.postToEdit.id === -1 ? 'Добавление' : 'Редактирование'
  }

}