import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { takeUntil, map, first } from 'rxjs/operators';
import { NewsPart, NewsType } from '../news/news-types';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

type NewsPartBackend = {
  Id: number | null,
  Title: string,
  Text: string,
  Date: string,
  Type: string
}

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnDestroy {

  private readonly baseUrl: string = 'http://localhost:62499/api/News';
  private readonly ngUnsubscribe$: Subject<number>;
  private newsItemsSubject?: BehaviorSubject<NewsPart[]>;

  constructor(private readonly http: HttpClient) {
    this.ngUnsubscribe$ = new Subject();
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(0);
    this.ngUnsubscribe$.complete();
  }

  getAllNewsItems() : Observable<NewsPart[]> {
    if(!this.newsItemsSubject) {
      this.newsItemsSubject = new BehaviorSubject<NewsPart[]>([]);

      this.http.get<NewsPartBackend[]>(this.baseUrl)
        .pipe
        (
          map(item => item.map(x => new NewsPart(x.Id, new Date(x.Date), x.Title, x.Text, NewsType[x.Type as keyof typeof NewsType]))),
          takeUntil(this.ngUnsubscribe$)
        )
        .subscribe
        (
          value => { this.newsItemsSubject?.next(value); }
        );
    }

    return this.newsItemsSubject.asObservable();
  }

  addNewsItem(newsItem: NewsPart) {
    // id новой сущности генерится на бэке и возвращается post-запросом.
    let body: NewsPartBackend = this.mapToBackendItem(newsItem);

    this.http.post<number>(this.baseUrl, body)
      .pipe
      (
        first(),        
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe
      (
        value => {
          if(this.newsItemsSubject) {
            let news: NewsPart[] = this.newsItemsSubject.getValue();
            newsItem.id = value;
            news.push(newsItem);
            this.newsItemsSubject.next(news);
          }
        }
      );
  }

  editNewsItem(newsItem: NewsPart) {
    let body: NewsPartBackend = this.mapToBackendItem(newsItem);

    this.http.put(this.baseUrl, body)
      .pipe
      (
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe
      ({
        complete: () => {
          if(this.newsItemsSubject) {
            let news: NewsPart[] = this.newsItemsSubject.getValue();
            let index = news.findIndex(item => item.id === newsItem.id);
            news[index] = newsItem;
            this.newsItemsSubject.next(news);
          }
        }
      });
  }

  removeNewsItem(id: number) {
    this.http.delete(this.baseUrl, {
      params: new HttpParams().set('id', id)
    })
    .pipe
    (
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe
    ({
      complete: () => {
        if(this.newsItemsSubject) {
          let news: NewsPart[] = this.newsItemsSubject.getValue();
          let index = news.findIndex(item => item.id === id);
          news.splice(index, 1);
          this.newsItemsSubject.next(news);
        }
      }
    });
  }

  private mapToBackendItem(newsItem: NewsPart) : NewsPartBackend {
    return {
      Id: newsItem.id,
      Text: newsItem.text,
      Title: newsItem.title,
      Date: newsItem.createDateLocal(),
      Type: Object.keys(NewsType)[Object.values(NewsType).indexOf(newsItem.type)]
    };
  }
}
