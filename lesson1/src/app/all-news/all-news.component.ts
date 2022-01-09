import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserHasPemission } from 'src/models/userPermissions';
import { NewsService } from 'src/services/newsService';
import { NewsPost } from '../../models/NewsPost';
import { ModalCommonComponent } from '../modal-common/modal-common.component';
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllNewsComponent {
  constructor(
    private _newsService: NewsService,
    private cdr: ChangeDetectorRef
  ) {
    this.PullData(); 
  }

  @ViewChild(ModalCommonComponent) public modalComponent!: ModalCommonComponent;

  isModalOpen: boolean = false;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  news!: NewsPost[];
  postToEdit: NewsPost = new NewsPost();
  userPermission: boolean = UserHasPemission;
  private subscrition!: Subscription;

  onDeletePost(postId: number) {
    this._newsService.Delete([postId]);
  }

  onEditPost(postId: number) {
    this.postToEdit = this.news.find(x=>x.id==postId)!;
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
    const existedPostIndex = this.news.findIndex((x) => x.id === newsPost.id);
    if (existedPostIndex > -1) {
      this._newsService.Update(newsPost);
    } else {
      this._newsService.Add(newsPost);
    }
  }

  onDeleteSelected() {
    const keys = this.news.filter((x) => x.isSelected).map((x) => x.id);
    this._newsService.Delete(keys);
  }

  isAnyToDelete(): boolean {
    return this.news?.some((x) => x.isSelected);
  }

  onRightClick(event: MouseEvent) {
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
    return false;
  }

  disableContextMenu() {
    this.contextmenu = false;
  }

  onSelectAll() {
    this.news = this.news.map((x) => {
      x = new NewsPost(x);
      x.isSelected = true;
      return x;
    });  }

  getTitle(): string {
    return this.postToEdit.id === -1 ? 'Добавление' : 'Редактирование';
  }

  onPermissionToggleClick() {
    this.userPermission = !this.userPermission;
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

  private PullData() {
    this.subscrition = this._newsService.GetAll().subscribe({
      next: (data) => {
        this.news = data;
        this.PushToRefresh();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
      },
    });
  }

  private PushToRefresh() {
    this.cdr.markForCheck();
  }


  public isAnySelected(): boolean {
    return this.news.some((x) => x.isSelected);
  }
}
