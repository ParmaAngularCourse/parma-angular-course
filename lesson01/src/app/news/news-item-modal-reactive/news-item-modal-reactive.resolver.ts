import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {NewsService} from "../services/news.service";
import {NewsItemModel} from "../news-types";

@Injectable({
  providedIn: 'root'
})
export class NewsItemModalReactiveResolver implements Resolve<NewsItemModel | undefined> {
  constructor(private _newsService: NewsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NewsItemModel | undefined> {
    let id = route.params.id;
    if(id) {
      //return this._newsService.getItemById1(id);
      return of(this._newsService.getItemById(id));
    }
    return of(undefined);
  }
}
