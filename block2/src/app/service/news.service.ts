import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { ServerResponse } from 'src/model/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsListSubject?:BehaviorSubject<INewsData[]>;

  constructor(private httpService:HttpClient){}

  public getNewsList():Observable<INewsData[]>{
    if(!this.newsListSubject){
      this.newsListSubject = new BehaviorSubject<INewsData[]>([]);
      this.httpService.get<ServerResponse<INewsData[]>>('https://localhost:44379/api/NewsData/GetNews')
      .pipe()
      .subscribe({
        next: (response)=> { 
          var newsList:News[] = [];
          if (response.isSuccess === false) {
            console.error(`Ошибка при получении данных c сервера: ${response.errorText}`)
            //throw new TypeError(`Ошибка при получении данных сервера ${response.errorText}`)
          }
          else{
            newsList = response?.data?.map(sNews=>new News(sNews.id,
                                                       new Date(sNews.date),
                                                       sNews.title,
                                                       sNews.body,
                                                       sNews.type)) ?? []
          }
          newsList = newsList.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
          this.newsListSubject?.next(newsList); 
        },
        error:(err)=> { console.error(`Ошибка при получении данных c сервера: ${err}`)}        
      });
    }

    return this.newsListSubject.asObservable();
  }

  public addNews(news: INewsData){
    if(this.newsListSubject){
      var newsArray = this.newsListSubject?.value ?? [];
      var editNews = new News(news.id, news.date, news.title, news.body, news.type);
      if(newsArray.length > 0){
        var newsIndex = newsArray.findIndex(x=>x.id == editNews.id);
        if(newsIndex < 0){
          var maxNewsId = Math.max.apply(Math, newsArray.map(function(n) { return n.id; }));
          editNews.id = maxNewsId + 1;
        }
      }
      else{
        editNews.id = 0;
      }
      this.httpService.post<ServerResponse<void>>('https://localhost:44379/api/NewsData/AddNews',editNews)
      .pipe()
      .subscribe({
        next: (response)=> {
          if (response.isSuccess === false) {
            console.error(`При попытке изменить список новостей возникла ошибка: ${response.errorText}`)            
          }
          else{            
            var newsIndex = newsArray.findIndex(x=>x.id == editNews.id);
            if(newsIndex > -1){
              newsArray[newsIndex] = editNews;
            }
            else{
              newsArray.push(editNews);      
            }       
            newsArray = newsArray.sort((newsF, newsS)=>newsS.date.getTime() - newsF.date.getTime());
            this.newsListSubject?.next(newsArray);
          }           
        },
        error:(err)=> { console.error(`При попытке изменить список новостей возникла ошибка: ${err}`)}        
      });
    }
  }  

  public deleteNews(news:News){
    if(this.newsListSubject){  
      var params = new HttpParams().set('newsId',news.id)    
      this.httpService.delete<ServerResponse<void>>('https://localhost:44379/api/NewsData/DeleteNews',{
        params: params
      })
      .pipe()
      .subscribe({
        next: (response)=> {  
          var newsArray = this.newsListSubject?.value ?? [];         
          if (response.isSuccess === false) {
            console.error(`При попытке удалить новость возникла ошибка: ${response.errorText}`)            
          }
          else{
            var newsIndex = newsArray.indexOf(news, 0);
            if (newsIndex > -1) {

              newsArray.splice(newsIndex, 1);
            }
            this.newsListSubject?.next(newsArray);
          }           
        },
        error:(err)=> { console.error(`При попытке удалить новость возникла ошибка: ${err}`)}        
      });
    }
  }
}
