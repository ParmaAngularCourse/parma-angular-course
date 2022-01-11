import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { ServerResponse } from 'src/model/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsListSubject?:BehaviorSubject<INewsData[]>;

  constructor(private httpService:HttpClient){}

  public getNewsList(filter:NewsFilter):Observable<INewsData[]>{
    if(!this.newsListSubject){
      this.newsListSubject = new BehaviorSubject<INewsData[]>([]);
    }

    this.httpService.post<ServerResponse<INewsData[]>>('http://localhost:5000/api/NewsData/GetNews', filter)      
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
        console.error(`Ошибка при получении данных c сервера: ${err}`)
        return []
      }        
    });

    return this.newsListSubject.asObservable();
  }

  public addNews(news: INewsData){
    this.httpService.post<ServerResponse<INewsData>>('http://localhost:5000/api/NewsData/AddNews', news)
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
      error:(err)=> { console.error(`При попытке изменить список новостей возникла ошибка: ${err}`)}        
    });    
  }  

  public deleteNews(news:News){
    var params = new HttpParams().set('newsId',news.id)    
    this.httpService.delete<ServerResponse<void>>('http://localhost:5000/api/NewsData/DeleteNews',{
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
      error:(err)=> { console.error(`При попытке удалить новость возникла ошибка: ${err}`)}        
    });    
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
}
