import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ContextMenuComponent } from '../shared/context-menu/context-menu.component';
import { News, NewsTypeObjectEnum } from '../model/news-type';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public news: Array<News> = [
    { id: 1, title: "News 1", text: "this is a news 1 text", dateTime: "2021-08-15T14:23", newsType: NewsTypeObjectEnum.Economics},
    { id: 2, title: "News 2", text: "this is a news 2 text", dateTime: "2021-09-23T21:23", newsType: NewsTypeObjectEnum.Politics },
    { id: 3, title: "News 3", text: "this is a news 3 text", dateTime: "2021-10-26T09:00", newsType: NewsTypeObjectEnum.Science },
    { id: 4, title: "News 4", text: "this is a news 4 text", dateTime: "2021-11-01T15:03", newsType: NewsTypeObjectEnum.Tourism }
  ];

  public chechedNewsIds: number[] = [];

  public selectedNews: News | undefined;

  @ViewChild(ContextMenuComponent) menuComponent: ContextMenuComponent | undefined;
  @ViewChild(ModalComponent) modalComponent: ModalComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  OnDeleteNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.news.splice(index, 1);
    }

    const checkedIndex = this.chechedNewsIds.findIndex(id => id === $event);
    if (checkedIndex > -1) {
      this.chechedNewsIds.splice(index, 1);
    }
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
    this.news = this.news.filter(item => !this.chechedNewsIds.includes(item.id));
    this.chechedNewsIds = [];
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
    if ($event.id === 0) {
      $event.id = this.news.length + 1;
      this.news.push($event);
    } else {
      let index = this.news.findIndex(item => item.id === $event.id);
      if (index > -1) {
        this.news[index] = $event;
      }
    }
    this.modalComponent?.close();  
    this.selectedNews = undefined;
  }
}
