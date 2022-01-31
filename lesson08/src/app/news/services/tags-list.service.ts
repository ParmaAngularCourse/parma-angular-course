import { Injectable } from '@angular/core';
import {NewsTag} from "../news-types";
import {HttpClient} from "@angular/common/http";
import {Observable } from "rxjs";
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

  private readonly _url : string = "/api/tags";

  constructor(private _http: HttpClient) {  }

  public getTagsList() : Observable<NewsTag[]>{
      return this._http.get<Tag[]>(this._url)
        .pipe(
          map(data => data.map(i => {
            return new NewsTag(i.tag, i.text, i.color);
          }))
        );
  }
}
