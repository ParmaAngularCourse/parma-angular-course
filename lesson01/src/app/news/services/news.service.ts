import {Injectable, OnDestroy} from '@angular/core';
import {NewsItemModel} from "../news-types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {map, takeUntil} from "rxjs/operators";

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

  private _url: string = "/api/";
  private _newsSubject?: BehaviorSubject<NewsItemModel[]>;
  private _getItemSub$: BehaviorSubject<boolean>;
  private _ngUnsubscribe$: Subject<number>;

  constructor(private _http: HttpClient) {
    this._ngUnsubscribe$ = new Subject<number>();
    this._getItemSub$ = new BehaviorSubject<boolean>(false);
  }

  public getNews(searchVal: string, selectedTag : string) : Observable<NewsItemModel[]>{
    this._newsSubject = new BehaviorSubject<NewsItemModel[]>([]);
    let _params = new HttpParams()
      .set('s', searchVal)
      .set('t', selectedTag);

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
        this._getItemSub$.next(true);
    });

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
    this._http.put<NewsItem>(this._url + "news",
      {
        id : item.id,
        date: item.date.toISOString(),
        head: item.head,
        desc: item.desc,
        tag: item.tag
      })
      .pipe(
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe({
        next: (val) => {
          item.id = val.id;
          this.addNewsItemComplete(item);
        },
        complete: () => {},
        error: (error: HttpErrorResponse) =>
          console.log(error.status + " " + error.message)
      });
  }

  private addNewsItemComplete(item: NewsItemModel) : void {
    if(this._newsSubject) {
      let news: NewsItemModel[] = this._newsSubject.getValue();
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

  public getItemById(newsId: number) : NewsItemModel | undefined {
    if (this._newsSubject) {
      let news: NewsItemModel[] = this._newsSubject.getValue();
      return  news.find(p => p.id == newsId);
    }
    return undefined;
  }

  public getItemById1(newsId: number) : Observable<NewsItemModel | undefined> {
    let o$ = new BehaviorSubject<NewsItemModel | undefined>(undefined);
    if(!this._newsSubject) {
      this._getItemSub$.subscribe({
        next: value => {
          if (!value) return;
          if (this._newsSubject) {
            let news: NewsItemModel[] = this._newsSubject.getValue();
            o$.next(news.find(p => p.id == newsId));
            //o$.complete();
          }
        }
      });
    } else {

      let news: NewsItemModel[] = this._newsSubject.getValue();
      let item = news.find(p => p.id == newsId);
      o$.next(item);
      //o$.complete();
    }
    return o$.asObservable();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
