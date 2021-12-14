import { Injectable } from '@angular/core';
import {NewsTag} from "../news-types";
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

type Tag = {
  tag: string,
  text: string,
  color: string
};

@Injectable({
  providedIn: 'root'
})
export class TagsListService {

  private readonly _url : string = "http://localhost:3000/api/tags";
  private _tagsSubject?: AsyncSubject<NewsTag[]>;

  constructor(private _http: HttpClient) {  }

  public getTagsList() : Observable<NewsTag[]>{
    if(!this._tagsSubject) {
      this._tagsSubject = new AsyncSubject<NewsTag[]>();

      this._http.get<Tag[]>(this._url)
        .pipe(
          map(data => data.map(i => {
            return new NewsTag(i.tag, i.text, i.color);
          }))
        )
        .subscribe((value) => {
          this._tagsSubject?.next(value);
          this._tagsSubject?.complete();
        })
    }
    return this._tagsSubject.asObservable();
  }
}
