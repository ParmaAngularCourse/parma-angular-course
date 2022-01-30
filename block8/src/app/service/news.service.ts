import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { ServerResponse } from 'src/model/ServerResponse';
import * as fromStore from '../../app/store';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private newsListSubject:BehaviorSubject<INewsData[]>;
  private state?: fromStore.State;

  constructor(
    private httpService:HttpClient,
    private store: Store<fromStore.State>){
    this.newsListSubject = new BehaviorSubject<INewsData[]>([]);
    store.subscribe(s=> this.state = s);    
  }

  public getNewsList(filter:NewsFilter):Observable<ServerResponse<INewsData[]>>{
    return this.httpService.post<ServerResponse<INewsData[]>>('/api/NewsData/GetNews', filter)
    /*.pipe(
      map((response)=> { 
        if (response.isSuccess === false) {
          console.error(`Ошибка при получении данных c сервера: ${response.errorText}`);           
        }
        
        return this.CreateNewsList(response?.data);
      })
    )    */  
    /*.subscribe({
      next: (response)=> { 
        if (response.isSuccess === false) {
          console.error(`Ошибка при получении данных c сервера: ${response.errorText}`)            
        }
        else{
          this.CreateNewsList(response?.data);            
        }
      },
      error:(err)=> { 
        console.error(`Ошибка при получении данных c сервера: ${err.message}`)
        return []
      }        
    });

    return this.newsListSubject.asObservable();*/
  }

  public addNews(news: INewsData):Observable<ServerResponse<INewsData>>{
    return this.httpService.post<ServerResponse<INewsData>>('/api/NewsData/AddNews', news)
    /*.subscribe({
      next: (response)=> {
        if (response.isSuccess === false) {
          console.error(`При попытке изменить список новостей возникла ошибка: ${response.errorText}`)            
        }
        else{
          if(response?.data){
            var editNews = this.NewsDataToNews(response.data);            
            if(this.isExistingNews(editNews)){
              this.updateNewsItem(editNews);
            }
            else{
              this.addNewsItem(editNews);
            } 
          }
        }           
      },
      error:(err)=> { console.error(`При попытке изменить список новостей возникла ошибка: ${err.message}`)}        
    }); */   
  }  

  public deleteNews(news:News){
    var params = new HttpParams().set('newsId',news.id)    
    this.httpService.delete<ServerResponse<void>>('/api/NewsData/DeleteNews',{
      params: params
    })
    .subscribe({
      next: (response)=> {                 
        if (response.isSuccess === false) {
          console.error(`При попытке удалить новость возникла ошибка: ${response.errorText}`)            
        }
        else{
          this.DeleteNewsItem(news);            
        }           
      },        
      error:(err)=> { console.error(`При попытке удалить новость возникла ошибка: ${err.message}`)}        
    });    
  }

  public GetNewsById(id:number): Observable<INewsData|null>{
    if(id){
      return this.store.pipe(select(fromStore.selectNewsById(id)))
      /*return this.newsListSubject.pipe(
        map(newsArray => newsArray.find(x=>x.id == id) ?? null))*/
    }
    else{
      return of(null);
    }
  }

  public CreateNewsList(newsDataList: INewsData[]|undefined): INewsData[] 
  {
    var newsList = newsDataList?.map(sNews=> this.NewsDataToNews(sNews)) ?? []
    if(newsList.length > 0){
      newsList = this.SortNewsList(newsList);
    }
    return newsList;
    //this.newsListSubject?.next(newsList);
  }

  public isExistingNewsInStore(news: INewsData): boolean 
  {
    return this.GetNewsIndex(news) >= 0;
  }

  private updateNewsItem(news: INewsData): void 
  {
    var newsArray = this.newsListSubject?.value ?? [];
    var newsIndex = this.GetNewsIndex(news);
    newsArray[newsIndex] = news;
    newsArray = this.SortNewsList(newsArray);
    this.newsListSubject?.next(newsArray);
  }

  private addNewsItem(news: INewsData): void 
  {
    var newsArray = this.newsListSubject?.value ?? [];
    newsArray.push(news);
    newsArray = this.SortNewsList(newsArray);
    this.newsListSubject?.next(newsArray);
  }

  private DeleteNewsItem(news: INewsData): void 
  {
    if(this.isExistingNewsInStore(news)){
      var newsArray = this.newsListSubject?.value ?? [];
      var newsIndex = this.GetNewsIndex(news);
      newsArray.splice(newsIndex, 1);      
      this.newsListSubject?.next(newsArray);
    }
  }

  private GetNewsIndex(news: INewsData): number{
    return this.state?.newsObjects?.newsData?.findIndex(x=>x.id == news.id) ?? -1
  }

  private NewsDataToNews(newsData: INewsData): News{
    return new News(newsData.id,
                    new Date(newsData.date),
                    newsData.title,
                    newsData.body,
                    newsData.type)
  }

  public SortNewsList(newsList: News[]):News[]{
    return newsList.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
  }
}
