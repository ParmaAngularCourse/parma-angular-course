import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NewsEditformComponent } from './news-editform/news-editform.component';
import { News, NewsType } from './news-types';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public allNews: News[] = [
    {
      id: 1,
      date: new Date(2021,10,17),
      title: 'В Бразилии обнаружены останки редкого вида беззубых динозавров',
      text: 'Беззубые динозавры не так страшны, как те, что с зубами',
      type: NewsType.Science,
      selected: false
    },
    {
      id: 2,
      date: new Date(2021,10,18),
      title: 'В Германии вырастили гриб со вкусом и ароматом земляники',
      text: 'Планируются эксперименты с вареньем из грибов',
      type: NewsType.Science,
      selected: false
    },
    {
      id: 3,
      date: new Date(2021,10,19),
      title: 'Трение человеческой кожи оказалось идеальным для щелчков пальцами',
      text: 'Отличная кожа, повезло нам',
      type: NewsType.Science,
      selected: false
    }
  ];
  public newsToEdit: News = this.generateEmptyNews();
  public isEditMode: boolean = false;

  @ViewChild(NewsEditformComponent) private viewEditForm!: NewsEditformComponent;
  @ViewChild("contextMenuComponent") private viewContextMenu!: ContextMenuComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveNews($event: number) {
    this.allNews = this.allNews.filter(item => item.id !== $event);
  }

  onSaveNews(newsToSave: News) {
    if(this.isEditMode) {
      var replaceIndex = this.allNews.findIndex(item => item.id == newsToSave.id);
      this.allNews[replaceIndex] = newsToSave;
    }
    else {
      newsToSave.id = Math.max(...(this.allNews.map(el => el.id))) + 1;
      this.allNews.push(newsToSave);
    }
    this.viewEditForm.closeWindow();
  }

  onCloseEditForm($event: any) {
    this.viewEditForm.closeWindow();
  }

  openAddNewsDialog() {
    this.isEditMode = false;
    this.openEditForm(this.generateEmptyNews());
  }

  hasSelectedNews() {
    return this.allNews.some(item => item.selected);
  }
  
  removeSelectedNews() {
    this.allNews = this.allNews.filter(item => !item.selected);
  }

  openEditNewsDialog(newsToEdit: News) {
    this.isEditMode = true;
    this.openEditForm(newsToEdit);
  }

  openEditForm(news: News) {
    this.newsToEdit = news;
    this.viewEditForm.showWindow();
  }

  openContextMenu($event: any) {
    $event.preventDefault();
    this.viewContextMenu.show($event.clientY, $event.clientX);
  }

  hideContextMenu() {
    this.viewContextMenu.hide();
  }

  onSelectAll() {
    this.allNews = this.allNews.map(el => { return {...el, selected: true} });
  }

  private generateEmptyNews() : News {
    let generatedNews : News = {
      id: 0,
      date: new Date(),
      title: '',
      text: '',
      type: NewsType.Politics,
      selected: false
    };
    return generatedNews;
  }
}
