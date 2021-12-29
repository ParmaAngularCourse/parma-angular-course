import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsObj } from '../../model/news-type';

@Injectable({
  providedIn: 'root'
})
export class HttpNewsService {

  private rootUrl = 'http://localhost:5185/';

  constructor(private http: HttpClient) { }

  public getNews(): Observable<NewsObj[]> {
    return this.http.get<NewsObj[]>(this.rootUrl + 'News');
  }

  public deleteNews(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.rootUrl + 'News/' + id);
  }

  public addOrEditNews(news: NewsObj): Observable<boolean> {
    return this.http.post<boolean>(this.rootUrl + 'News', news);
  } 
}
