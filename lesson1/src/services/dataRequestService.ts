import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  JsonpInterceptor,
} from '@angular/common/http';
import { KeyedWrite } from '@angular/compiler';
import { partitionArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { API_URL } from 'src/api';
import { NewsPost } from 'src/models/NewsPost';
import { NewsPostTag } from 'src/models/NewsPostTag';
import { toDateString } from 'src/utils/DateUtils';

@Injectable({ providedIn: 'root' })
export class DataRequestService {
  constructor(private readonly http: HttpClient) {}
  private newsSubject?: BehaviorSubject<Array<NewsPost>>;

  public Get(): Observable<Array<NewsPost>> {
    if (!this.newsSubject) {
      this.newsSubject = new BehaviorSubject<NewsPost[]>([]);

      this.http
        .get<newsObj[]>(API_URL, {
          observe: 'body',
          responseType: 'json',
        })
        .pipe(
          map((item) =>
            item.map((x) => {
              const post = new NewsPost();
              post.id = x.id;
              console.log(post.id);
              post.text = x.text;
              post.title = x.title;
              post.isSelected = false;
              post.tag = Object.values(NewsPostTag).find((t) => t === x.tag)!;
              post.uploadDate = toDateString(new Date(x.date));
              return post;
            })
          )
        )
        .subscribe((value) => this.newsSubject?.next(value));
    }
    return this.newsSubject.asObservable();
  }

  public Delete(keys: Array<number>) {
    const body = {
      keys: keys,
    };
    this.http
      .delete(API_URL, {
        body: body,
      }).pipe(
          tap(isOk =>
            {
                if(isOk && this.newsSubject){
                    const posts = this.newsSubject?.value.filter(x=>!keys.includes(x.id));
                    this.newsSubject.next(posts);
                }
            })
      )
      .subscribe();
  }

  public Add(item: NewsPost) {
    console.log(item);
    const body = {
      title: item.title,
      text: item.text,
      date: item.uploadDate,
      tag: item.tag,
    };
    this.http
      .post(API_URL, {
        body: body,
      })
      .subscribe();
  }

  public Update(item: NewsPost) {
    console.log(item);
    const body = {
      id: item.id,
      title: item.title,
      text: item.text,
      date: item.uploadDate,
      tag: item.tag,
    };
    this.http
      .put(API_URL, {
        body: body,
      })
      .subscribe();
  }
}

type newsObj = {
  id: number;
  text: string;
  title: string;
  date: string;
  tag: string;
};
