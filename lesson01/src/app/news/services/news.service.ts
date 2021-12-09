import { Injectable } from '@angular/core';
import {NewsItemModel} from "../news-types";
import {AsyncSubject, BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/internal/operators/map';

type NewsItem = {
  id: number,
  date: string,
  head: string,
  desc: string,
  tag: string
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _url: string = "http://localhost:3000/api/";
  private _newsSubject?: BehaviorSubject<NewsItemModel[]>;

  constructor(private _http: HttpClient) { }

  public getNews() : Observable<NewsItemModel[]>{
    if(!this._newsSubject) {
      this._newsSubject = new BehaviorSubject<NewsItemModel[]>([]);

      this._http.get<NewsItem[]>(this._url + "news")
        .pipe(
          map(item => item.map(i => {
            return new NewsItemModel(i.id, new Date(i.date), i.head, i.desc, i.tag);
          }))
        )
        .subscribe((value) => {
          this._newsSubject?.next(value);
      });
    }
    return this._newsSubject.asObservable();
  }

  public removeNewsItem(id: number) {
    let removeSubject = new AsyncSubject();
    this._http.delete(this._url + "news/" + id)
      .subscribe(
        value => {
          this.removeItemCompleted(id);
          removeSubject?.next(value);
          removeSubject?.complete();
        }
      );
    return removeSubject.asObservable();
  }

  private removeItemCompleted(id: number){
    if(this._newsSubject){
      let news: NewsItemModel[] = this._newsSubject.getValue();
      let index = news.findIndex(p => p.id == id);
      if(index > -1) {
        news.splice(index, 1);
      }
      this._newsSubject?.next(news);
    }
  }

  public addNewsItem(item: NewsItemModel){
    let addSubject = new AsyncSubject();
    this._http.put(this._url + "news", item)
      .subscribe(
        value => {
          this.addNewsItemComplete(item);
          addSubject?.next(value);
          addSubject?.complete();
        }
      )
    return addSubject.asObservable();
  }

  private addNewsItemComplete(item: NewsItemModel){
    if(this._newsSubject) {
      let news: NewsItemModel[] = this._newsSubject.getValue();
      let maxId = news
        .map((v) => { return v.id;})
        .sort()[news.length - 1];
      maxId = maxId == undefined ? 1 : maxId;
      item.id = maxId + 1;
      news.push(item);
      this._newsSubject?.next(news);
    }
  }

  public editNewsItem(item: NewsItemModel){
    let editSubject = new AsyncSubject();
    this._http.post(this._url + "news", item)
      .subscribe(
        value => {
          this.editNewsItemComplete(item);
          editSubject?.next(value);
          editSubject?.complete();
        }
      )
    return editSubject.asObservable();
  }

  private editNewsItemComplete(item: NewsItemModel){
    if(this._newsSubject) {
      let news: NewsItemModel[] = this._newsSubject.getValue();
      let index = news.findIndex(p => p.id == item.id);
      news[index] = item;
      this._newsSubject?.next(news);
    }
  }
}
