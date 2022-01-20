import {Injectable} from '@angular/core';
import {NewsItem } from "../news-types";
import { Observable } from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _url: string = "/api/";

  constructor(private _http: HttpClient) { }

  public getNews(searchVal: string, selectedTag : string) : Observable<NewsItem[]>{
    return this._http.get<NewsItem[]>(this._url + "news", {
      params: new HttpParams()
        .set('s', searchVal)
        .set('t', selectedTag)
    });
  }

  public removeNewsItem(id: number) : Observable<void> {
    return this._http.delete<void>(this._url + "news/" + id);
  }

  public addNewsItem(item: NewsItem) : Observable<NewsItem> {
    return this._http.put<NewsItem>(this._url + "news", item);
  }

  public editNewsItem(item: NewsItem) : Observable<NewsItem> {
     return this._http.post<NewsItem>(this._url + "news", item);
  }
}
