import { Injectable } from '@angular/core';
import { Subject, first } from 'rxjs';
import { News, NewsTypeObjectEnum } from 'src/app/model/news-type';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeEditNewsService {

  public $safe = new Subject<News>();

  constructor(private _newsService: NewsService) { }

  public getSelectedNews(id: number | undefined): News {
    console.log("getSelectedNews", id);

    let selectedNews: News = {
      id: 0,
      dateTime: '',
      title: '',
      text: '',
      newsType: NewsTypeObjectEnum.Politics
    };

    if (id)
      this._newsService.getOneNews(id).pipe(first()).subscribe(
        {
          next: news => {
            if (news) selectedNews = news;
            else {
              console.log("нужная новость не найдена");
            }
          }
        }
      );

    return selectedNews;
  }
}
