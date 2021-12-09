import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AddEditNewsModalComponent } from './add-edit-news-modal/add-edit-news-modal.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { News, NewsType } from './news-type';



@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsListComponent implements OnInit {

  public newsTypes: Array<NewsType> = [
    {id: 1, text: "Политика", color:"green"},
    {id: 2, text: "Туризм", color:"lightblue"},
    {id: 3, text: "Экономика", color:"orange"},
    {id: 4, text: "Наука", color:"blue"},
    {id: 5, text: "Интернет", color:"grey"},
  ];

  public news: Array<News> = [
    { id: 1, title: "News 1", text: "this is a news 1 text", dateTime: "2021-08-15T14:23", isChecked: true, newsType: this.newsTypes[0]},
    { id: 2, title: "News 2", text: "this is a news 2 text", dateTime: "2021-09-23T21:23", isChecked: false, newsType: this.newsTypes[1] },
    { id: 3, title: "News 3", text: "this is a news 3 text", dateTime: "2021-10-26T09:00", isChecked: false, newsType: this.newsTypes[2] },
    { id: 4, title: "News 4", text: "this is a news 4 text", dateTime: "2021-11-01T15:03", isChecked: false, newsType: this.newsTypes[3] }
  ];

  public selectedTypeId: number = 1;
  public selectedNews: News | undefined;

  @ViewChild(ContextMenuComponent) menuComponent: ContextMenuComponent | undefined;
  @ViewChild(AddEditNewsModalComponent) modalComponent: AddEditNewsModalComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  OnDeleteNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.news.splice(index, 1);
    }
  }

  OnEditNews($event: number) {
    const index = this.news.findIndex(item => item.id === $event);
    if (index > -1) {
      this.selectedNews = this.news[index];
      this.selectedTypeId = this.selectedNews.newsType.id;
      this.modalComponent?.open();
    }
  }

  OnClickAddButton() {
    this.modalComponent?.open();
  }

  OnCancelModal() {
    this.modalComponent?.close();
    this.selectedNews = undefined;
    this.selectedTypeId = 1;
  }

  OnClickDeleteButton() {
    this.news = this.news.filter(item => !item.isChecked);
  }

  isAnyNewsChecked() {
    return this.news.some(item => item.isChecked);
  }

  onSelectAllNews() {
    this.news = this.news.map(item => {
      if (item.isChecked)
        return item;
      else {
        item.isChecked = true;
        return { ...item };
      }
    });
  }

  onContextMenu($event: MouseEvent) {
    this.menuComponent?.show({top: $event.y, left: $event.x});
    return false;
  }

  onClick() {
    this.menuComponent?.close();
  }

  clickSaveNews(date: string, title: string, text: string) {
    let id = this.selectedNews ? this.selectedNews.id : 0;
    let isChecked = this.selectedNews ? this.selectedNews.isChecked :false;
    let newNews = {
      id: id,
      title: title,
      text: text,
      dateTime: date,
      isChecked: isChecked,
      newsType: this.newsTypes.find( t => t.id === this.selectedTypeId)!
    }
    console.log(this.selectedTypeId);
    if (id === 0) {
      newNews.id = this.news.length + 1;
      this.news.push(newNews);
    } else {
      let index = this.news.findIndex(item => item.id === newNews.id);
      if (index > -1) {
        this.news[index] = newNews;
      }
    }
    this.modalComponent?.close();
    this.selectedNews = undefined;
    this.selectedTypeId = 1;
  }
}
