import { Injectable } from '@angular/core';
import { NewsItem, NewsContent, Theme } from './news/news-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { getThemeKey } from './news/news-types';

type NewsData = {
  id:	number,
  caption:	string, 
  text:	string,
  date:	Date
  theme:	Theme
}

@Injectable({
  providedIn: 'root'
})
export class NewsSourceService {
  private _api = 'https://localhost:44369/api/News/';
  private getThemeKeyFunc = getThemeKey;
  private getNewsSubject: BehaviorSubject<NewsItem[]> = new BehaviorSubject<NewsItem[]>([]) ;

  constructor(private httpClient: HttpClient) {
      this.loadNews();
  }

  public getNewsOberverble() : Observable<NewsItem[]> {    
    return this.getNewsSubject.asObservable();              
  }

  public loadNews() {
    this.httpClient.get<NewsData[]>(this._api + "GetNews"
           /*, {headers: new HttpHeaders().set('Authorization','fff')}*/
        ).pipe(map(raw_items => 
          raw_items.map(item => {          
            return { 
                id: item.id,
                content: { caption: item.caption, text: item.text, date: item.date, theme: item.theme },
                checked: false  
            }})
          ))
      .subscribe((value)=> this.getNewsSubject.next(value));
  }

  public deleteNews(id?: number){   
    if (id !== undefined){      
       this.httpClient.delete<boolean>(this._api + `DeleteNews/${id}`)
          .subscribe((isSuccess: boolean) => {         
              if (isSuccess){
                this.loadNews();
              }
            });
    } else {      
        var deletedIds = this.getNewsSubject.getValue().filter(n=> n.checked).map(el=> el.id);        
        deletedIds.forEach((id)=>{       
            this.httpClient.delete<boolean>(this._api + `DeleteNews/${id}`)
              .subscribe((isSuccess: boolean) => {
                  deletedIds.shift();             
                  if (!deletedIds.length){              
                    this.loadNews();
                  }
            });              
        });     
    }
  }
  
  public addNews(newItem: NewsContent){    
    this.httpClient.post<NewsData>(this._api + "AddNews",
       {id: 0, caption: newItem.caption, text: newItem.text, date: newItem.date, theme: this.getThemeKeyFunc(newItem.theme)})
        .subscribe({          
          next: (data) => {
            this.printTime(`addNews`);
            console.log(JSON.stringify(data));
            this.loadNews();
          },  
          error: (err)=>console.log(err)         
        }     
      );
  }

  public updateNewsItem(id: number, newsItem: NewsContent){  
      this.httpClient.put<boolean>(this._api + `UpdateNews`, {id: id, caption: newsItem.caption,
            text: newsItem.text, date: newsItem.date, theme: this.getThemeKeyFunc(newsItem.theme)})
        .subscribe({
            next: (isSuccess: boolean) => {
                this.printTime("UpdateNews => " + isSuccess);            
                this.loadNews();
            }
          });
  }

  public printTime(text: string | undefined){
     var date =  new Date();
     console.log(`${text} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);      
  }

}
