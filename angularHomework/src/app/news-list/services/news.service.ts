import { Injectable } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { News, NewsTypeObjectEnum } from '../../model/news-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { HttpNewsService } from './http-news.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpNewsService: HttpNewsService) { }

  private newsSubject?: BehaviorSubject<News[]>
  public getNews(): Observable<News[]> {

    if (!this.newsSubject) {
    this.newsSubject = new BehaviorSubject<News[]>([]);

    this.httpNewsService.getNews().pipe(
      map(item => item.map(item1 => { return {
        id: item1.id,
        title: item1.title,
        dateTime: item1.dateTime,
        text: item1.text,
        newsType: Object.values(NewsTypeObjectEnum).find(t => t.id === item1.newsType)!
      }})
    )).subscribe((value) => this.newsSubject?.next(value));
  }

  return this.newsSubject.asObservable();
}

  public deleteNews(id: number): Observable<boolean> {
    return this.httpNewsService.deleteNews(id).pipe(
      tap(isOk => {
        if (isOk && this.newsSubject) {
          let news: News[] = this.newsSubject.value;

          const index = news.findIndex(item => item.id === id);
          if (index > -1) {
            news.splice(index, 1);
          }

          this.newsSubject.next(news);
      }})
    );
  }

  public addOrEditNews(news: News): Observable<boolean> {

    var newsObj = {
      id: news.id,
      title: news.title,
      dateTime: news.dateTime,
      text: news.text,
      newsType: news.newsType.id
    }

    return this.httpNewsService.addOrEditNews(newsObj).pipe(
      tap(isOk => {
        if (isOk && this.newsSubject) {
          let newslist: News[] = this.newsSubject.value;

          if (news.id === 0) {
            news.id = newslist.length + 1;
            newslist.push(news);
          } else {
            let index = newslist.findIndex(item => item.id === news.id);
            if (index > -1) {
              newslist[index] = news;
            }
          }

          this.newsSubject.next(newslist);
      }})
    );
  }
}
