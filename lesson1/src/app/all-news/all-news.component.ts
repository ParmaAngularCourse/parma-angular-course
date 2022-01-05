import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { UserHasPemission } from 'src/models/userPermissions';
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
  constructor(private _newsService: NewsService) {
    this.updateValue();
  }
  @ViewChild(ModalCommonComponent) public modalComponent!: ModalCommonComponent;

  isModalOpen: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  news!: NewsPost[];
  postToEdit: NewsPost = new NewsPost();
  userPermission: boolean = UserHasPemission;

  onDeletePost(postId: number) {
    this._newsService.Delete(item => item.id != postId);
    this.updateValue();
  }

  onEditPost(postId: number) {
    this.postToEdit = this._newsService.GetFirstOrDefault(x => x.id === postId);
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
      this._newsService.Update(newsPost);
    }
    else {
      this._newsService.Add(newsPost);
    }
    this.updateValue();
  }

  onDeleteSelected() {
    this._newsService.Delete(item => item.isSelected === false);
    this.updateValue();
  }

  isAnyToDelete(): boolean {
    return this._newsService.isAnySelected();
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
    this._newsService.selectAll();
    this.updateValue();
  }

  getTitle(): string {
    return this.postToEdit.id === -1 ? 'Добавление' : 'Редактирование'
  }


  updateValue() {
    this.news = this._newsService.GetAll();
  }
  onPermissionToggleClick(){
    this.userPermission = !this.userPermission;
  }
}