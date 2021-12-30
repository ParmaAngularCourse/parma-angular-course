import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ContextMenuComponent } from '../shared/context-menu/context-menu.component';
import { News, NewsTypeObjectEnum } from '../model/news-type';
import { HttpErrorResponse } from '@angular/common/http';
import { NewsService } from './services/news.service';
import { UserAuthService } from '../user-authservice';
import { UserPermissions } from '../model/userPermissions';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public news: Array<News> = [];

  public chechedNewsIds: number[] = [];

  readonly  currUser: UserPermissions;

  public selectedNews: News | undefined;

  @ViewChild(ContextMenuComponent) menuComponent: ContextMenuComponent | undefined;
  @ViewChild(ModalComponent) modalComponent: ModalComponent | undefined;

  constructor(private _newsService: NewsService, 
    private cdr: ChangeDetectorRef,
    private _userAuthService: UserAuthService) {

    this._newsService.getNews().subscribe({
        next: (data) => { this.news = data; this.cdr.markForCheck();},
        error: (error: HttpErrorResponse) => {console.log(error.status)}
    });

    this.currUser = this._userAuthService.getUserPermissions();
  }

  ngOnInit(): void {
  }

  OnDeleteNews($event: number) {
    this._newsService.deleteNews($event).subscribe(
      (isOk) => {
        if (isOk) {
          const checkedIndex = this.chechedNewsIds.findIndex(id => id === $event);
          if (checkedIndex > -1) {
            this.chechedNewsIds.splice(checkedIndex, 1);
          }
        }
        else {
          console.log('Failed to delete the news');
        }
      }
    );
  }

  OnEditNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.selectedNews = this.news[index];
      this.modalComponent?.open();
    }
  }

  onCheckedNews($event: number) {
    if (this.chechedNewsIds.includes($event)) {
      let index = this.chechedNewsIds.findIndex(item => item === $event);
      if (index > -1) {
        this.chechedNewsIds.splice(index, 1)
      }
    } else {
      this.chechedNewsIds.push($event);
    }
  }

  OnClickAddButton() {
    this.selectedNews = {
      id: 0,
      dateTime: '',
      title: '',
      text: '',
      newsType: NewsTypeObjectEnum.Politics
    };
    this.modalComponent?.open();
  }

  onCancelModal() {
    this.modalComponent?.close();
    this.selectedNews = undefined;
  }

  OnClickDeleteButton() {
    let newsToDelete = this.news.filter(item => this.chechedNewsIds.includes(item.id)).map(item => item.id);

    this._newsService.deleteSeveralNews(newsToDelete).subscribe(
      (isOk) => {
        if (isOk) {
          this.chechedNewsIds = [];
        }
        else {
          console.log('Failed to delete the news');
        }
      }
    );
  }

  onSelectAllNews() {
    this.chechedNewsIds = this.news.map(item => item.id);
  }

  onContextMenu($event: MouseEvent) {
    this.menuComponent?.show({top: $event.pageY, left: $event.pageX});
    return false;
  }

  onClick() {
    this.menuComponent?.close();
  }

  onSaveNews($event: News) {
    this._newsService.addOrEditNews($event).subscribe(
      (isOk) => {
        if (isOk) {
          this.modalComponent?.close();
          this.selectedNews = undefined;
        }
        else {
          console.log('Failed to update the news');
        }
      });
  }
}
