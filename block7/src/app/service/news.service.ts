import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { ServerResponse } from 'src/model/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private unsubscriptionSubj!:Subject<void>
  private newsListSubject:BehaviorSubject<INewsData[]>;

  constructor(private httpService:HttpClient){
    this.unsubscriptionSubj = new Subject(); 
    this.newsListSubject = new BehaviorSubject<INewsData[]>([]);   
  }

  public getNewsList(filter:NewsFilter):Observable<INewsData[]>{
    this.httpService.post<ServerResponse<INewsData[]>>('/api/NewsData/GetNews', filter)
    .pipe(takeUntil(this.unsubscriptionSubj))      
    .subscribe({
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

    return this.newsListSubject.asObservable();
  }

  public addNews(news: INewsData){
    this.httpService.post<ServerResponse<INewsData>>('/api/NewsData/AddNews', news)
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe({
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
    });    
  }  

  public deleteNews(news:News){
    var params = new HttpParams().set('newsId',news.id)    
    this.httpService.delete<ServerResponse<void>>('/api/NewsData/DeleteNews',{
      params: params
    })
    .pipe(takeUntil(this.unsubscriptionSubj))
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
      return this.newsListSubject.pipe(
        map(newsArray => newsArray.find(x=>x.id == id) ?? null))
    }
    else{
      return of(null);
    }
  }

  private CreateNewsList(newsDataList: INewsData[]|undefined): void 
  {
    var newsList = newsDataList?.map(sNews=> this.NewsDataToNews(sNews)) ?? []
    if(newsList.length > 0){
      newsList = this.SortNewsList(newsList);
    }

    this.newsListSubject?.next(newsList);
  }

  private isExistingNews(news: INewsData): boolean 
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
    if(this.isExistingNews(news)){
      var newsArray = this.newsListSubject?.value ?? [];
      var newsIndex = this.GetNewsIndex(news);
      newsArray.splice(newsIndex, 1);      
      this.newsListSubject?.next(newsArray);
    }
  }

  private GetNewsIndex(news: INewsData): number{
    var newsArray = this.newsListSubject?.value ?? [];
    return newsArray.findIndex(x=>x.id == news.id)
  }

  private NewsDataToNews(newsData: INewsData): News{
    return new News(newsData.id,
                    new Date(newsData.date),
                    newsData.title,
                    newsData.body,
                    newsData.type)
  }

  private SortNewsList(newsList: News[]):News[]{
    return newsList.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
