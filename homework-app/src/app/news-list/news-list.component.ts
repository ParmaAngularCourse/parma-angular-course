import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { News } from './news-types';

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
      selected: false
    },
    {
      id: 2,
      date: new Date(2021,10,18),
      title: 'В Германии вырастили гриб со вкусом и ароматом земляники',
      text: 'Планируются эксперименты с вареньем из грибов',
      selected: false
    },
    {
      id: 3,
      date: new Date(2021,10,19),
      title: 'Трение человеческой кожи оказалось идеальным для щелчков пальцами',
      text: 'Отличная кожа, повезло нам',
      selected: false
    }
  ];
  public newsToEdit: News = this.generateEmptyNews();
  public showEditForm: boolean = false;
  public isEditMode: boolean = false;

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
    this.showEditForm = false;
    this.newsToEdit = this.generateEmptyNews();
  }

  onCloseEditForm($event: News) {
    this.showEditForm = false;
    this.newsToEdit = this.generateEmptyNews();
  }

  openAddNewsDialog() {
    this.isEditMode = false;
    this.openEditForm(this.generateEmptyNews());
  }

  openEditNewsDialog(newsToEdit: News) {
    this.isEditMode = true;
    this.openEditForm(newsToEdit);
  }

  openEditForm(news: News) {
    this.newsToEdit = news;
    this.showEditForm = true;
  }

  private generateEmptyNews() : News {
    let generatedNews : News = {
      id: 0,
      date: new Date(),
      title: '',
      text: '',
      selected: false
    };
    return generatedNews;
  }
}
