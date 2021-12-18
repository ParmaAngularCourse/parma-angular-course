import {Injectable, OnDestroy} from '@angular/core';
import {NewsItemModel} from "../news-types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {map} from 'rxjs/internal/operators/map';
import {takeUntil} from "rxjs/operators";

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
export class NewsService implements OnDestroy {

  private _url: string = "http://localhost:3000/api/";
  private _newsSubject?: BehaviorSubject<NewsItemModel[]>;
  private _ngUnsubscribe$: Subject<number>;
  private _subjectDictionary : { subject: BehaviorSubject<NewsItemModel[]>, searchVal : string }[] = [];

  constructor(private _http: HttpClient) {
    this._ngUnsubscribe$ = new Subject<number>();
  }

  public getNews(searchVal: string) : Observable<NewsItemModel[]>{
    this._newsSubject = this._subjectDictionary.find(p => p.searchVal === searchVal)?.subject;

    if(!this._newsSubject) {
      this._newsSubject = new BehaviorSubject<NewsItemModel[]>([]);
      let _params = new HttpParams().set('s', searchVal);

      this._http.get<NewsItem[]>(this._url + "news", {
        params: _params
      })
        .pipe(
          map(item => item.map(i => {
            return new NewsItemModel(i.id, new Date(i.date), i.head, i.desc, i.tag);
          })),
          takeUntil(this._ngUnsubscribe$)
        )
        .subscribe((value) => {
          this._newsSubject?.next(value);
      });

      this._subjectDictionary.push({
        subject : this._newsSubject,
        searchVal : searchVal
      });
    }
    return this._newsSubject.asObservable();
  }

  public removeNewsItem(id: number) : void {
    this._http.delete(this._url + "news/" + id)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        complete: () =>
          this.removeItemCompleted(id),
        error: (error: HttpErrorResponse) =>
          console.log(error.status + " " + error.message)
      });
  }

  private removeItemCompleted(id: number) : void {
    if(this._newsSubject){
      let news: NewsItemModel[] = this._newsSubject.getValue();
      let index = news.findIndex(p => p.id == id);
      if(index > -1) {
        news.splice(index, 1);
      }
      this._newsSubject?.next(news);
    }
  }

  public addNewsItem(item: NewsItemModel) : void {
    this._http.put<NewsItemModel>(this._url + "news", item)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        complete: () =>
          this.addNewsItemComplete(item),
        error: (error: HttpErrorResponse) =>
          console.log(error.status + " " + error.message)
      });
  }

  private addNewsItemComplete(item: NewsItemModel) : void {
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

  public editNewsItem(item: NewsItemModel) : void {
    this._http.post<NewsItemModel>(this._url + "news", item)
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        complete: () =>
          this.editNewsItemComplete(item),
        error: (error: HttpErrorResponse) =>
          console.log(error.status + " " + error.message)
      });
  }

  private editNewsItemComplete(item: NewsItemModel) : void {
    if(this._newsSubject) {
      let news: NewsItemModel[] = this._newsSubject.getValue();
      let index = news.findIndex(p => p.id == item.id);
      news[index] = item;
      this._newsSubject?.next(news);
    }
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
