import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { ServerResponse } from 'src/model/ServerResponse';
import * as fromStore from '../../app/store';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(
    private httpService:HttpClient,
    private store: Store<fromStore.State>){        
  }

  public getNewsList(filter:NewsFilter):Observable<ServerResponse<News[]>>{
    return this.httpService.post<ServerResponse<News[]>>('/api/NewsData/GetNews', filter)
  }

  public addNews(news: News):Observable<ServerResponse<News>>{
    return this.httpService.post<ServerResponse<News>>('/api/NewsData/AddNews', news)
  }  

  public deleteNews(news:News):Observable<ServerResponse<void>>{
    var params = new HttpParams().set('newsId', news.id)    
    return this.httpService.delete<ServerResponse<void>>('/api/NewsData/DeleteNews',{
      params: params
    })
  }

  public GetNewsById(id:number): Observable<News|null>{
    if(id){
      return this.store.pipe(select(fromStore.selectNewsById(id)))
    }
    else{
      return of(null);
    }
  }

  public SortNewsList(newsList: News[]|undefined):News[]{
    if(newsList){
      return newsList.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
    }
    else{
      return [];
    }      
  }

  public CreateNewsList(newsDataList: News[]|undefined): News[] 
  {
    var newsList = newsDataList?.map(sNews=> this.NewsDataToNews(sNews)) ?? []
    if(newsList.length > 0){
      newsList = this.SortNewsList(newsList);
    }

    return newsList;
  }

  public NewsDataToNews(newsData: News): News{
    return new News(newsData.id,
                    new Date(newsData.date),
                    newsData.title,
                    newsData.body,
                    newsData.type)
  }
}
