import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News, NewsType } from './news-list/news-types';

type NewsObj = {
  id: number,
  date: string,
  title: string,
  text: string,
  type: NewsType
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private serverUrl: string  = 'http://localhost:3000';
  private newsSubject?: BehaviorSubject<News[]>;

  constructor(private http: HttpClient) { }

  public getNewsList(): Observable<News[]> {
    if (!this.newsSubject) {
    this.newsSubject = new BehaviorSubject<News[]>([]);

    this.http.get<NewsObj[]>(`${this.serverUrl}/api/news`).pipe(
        map(item => item.map(news => {
          return {
            id: news.id,
            date: new Date(news.date),
            title: news.title,
            text: news.text,
            type: news.type,
            selected: false
          };
        }))
      )
      .subscribe((value) => {
        this.newsSubject?.next(value);
      });
    }
    return this.newsSubject.asObservable();   
  }

  public getFilteredNewsList(searchText: string, newsType: NewsType | null): Observable<News[]> {
    this.newsSubject = new BehaviorSubject<News[]>([]);

    var newsTypeKeyValue = newsType ? (Object.entries(NewsType).find(item => item[0] === newsType)) : null;
    var newsTypeText = newsTypeKeyValue ? newsTypeKeyValue[1] : '';

    let params = new HttpParams()
      .set('searchText', searchText)
      .set('newsType', newsTypeText);
    this.http.get<NewsObj[]>(
        `${this.serverUrl}/api/news`,
        { params: params }
      ).pipe(
        map(item => item.map(news => {
          return {
            id: news.id,
            date: new Date(news.date),
            title: news.title,
            text: news.text,
            type: news.type,
            selected: false
          };
        }))
      ).subscribe((value) => {
        this.newsSubject?.next(value);
      });
    return this.newsSubject.asObservable();
  }

  public addNews(newsItem: News): Observable<News> {
    return this.http.post<NewsObj>(
        `${this.serverUrl}/api/news`,
        newsItem,
        { headers: new HttpHeaders().set("content-type","application/json") }
      ).pipe(
      map(news => {
        let newsAdded = {
          id: news.id,
          date: new Date(news.date),
          title: news.title,
          text: news.text,
          type: news.type,
          selected: false
        };
        if(this.newsSubject){
          const data = this.newsSubject.value;
          data.push(newsAdded);
          this.newsSubject?.next(data);
        }
        return newsAdded;
      })
    );
  }

  public updateNews(newsItem: News): Observable<News> {
    return this.http.put<NewsObj>(
        `${this.serverUrl}/api/news`,
        newsItem,
        { headers: new HttpHeaders().set("content-type","application/json") }
      ).pipe(
      map(news => {
        let newsEdited = {
          id: news.id,
          date: new Date(news.date),
          title: news.title,
          text: news.text,
          type: news.type,
          selected: false
        };

        if(this.newsSubject){
          const data = this.newsSubject.value;
          const replaceIndex = data.findIndex(item => item.id == newsEdited.id);
          data[replaceIndex] = newsEdited;
          this.newsSubject?.next(data);
        }
        return newsEdited;
      })
    );
  }

  public removeNews(id: number): Observable<News> {
    return this.http.delete<NewsObj>(`${this.serverUrl}/api/news/${id}`).pipe(
      map(news => {
        if(this.newsSubject){
          const data = this.newsSubject.value;
          const removeIndex = data.findIndex(item => item.id == news.id);
          data.splice(removeIndex, 1);
          this.newsSubject?.next(data);
        }
        return {
          id: news.id,
          date: new Date(news.date),
          title: news.title,
          text: news.text,
          type: news.type,
          selected: false
        };
      })
    );
  }
}
