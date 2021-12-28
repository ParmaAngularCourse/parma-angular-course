import { Injectable } from '@angular/core';
import { NewsItem, NewsContent, Theme } from './news/news-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  private allNews: NewsItem[] =[];
  private _api = 'https://localhost:44369/api/News/';
  private getThemeKeyFunc = getThemeKey;

  constructor(private httpClient: HttpClient) { }

  public getNews() : Observable<NewsItem[]> {
    this.printTime('GetNews');
    return this.httpClient.get<NewsData[]>(this._api + "GetNews", {
        headers: new HttpHeaders().set('Authorization','fff')
      }).pipe(map(raw_items => 
      raw_items.map(item => {return { 
                  id: item.id,
                  content: { caption: item.caption, text: item.text, date: item.date, theme: item.theme },
                  checked: false  
               }})));
  }

  public deleteNews(id?: number){   
    this.printTime('DeleteNews');
    if (id !== undefined){
       let isSuccess = false;
       this.httpClient.delete<boolean>(this._api + `DeleteNews/${id}`).subscribe((data: boolean) => isSuccess = data);
       console.log(`DeleteNews/${id} => ${isSuccess}`);
    } else {
        this.allNews.filter(n=> n.checked).forEach((el)=>
            this.httpClient.delete<boolean>(this._api + `DeleteNews/${el.id}`) 
        );       
    }
  }
  
  public addNews(newItem: NewsContent){
    this.printTime(`addNews`);
    this.httpClient.post<NewsData>(this._api + "AddNews", {id: 0, caption: newItem.caption, text: newItem.text, date: newItem.date, theme: this.getThemeKeyFunc(newItem.theme)})
        .subscribe(
          (data) => {console.log(JSON.stringify(data))},  //changed
          (err)=>console.log(err),
          ()=>console.log("Done")
      );
    // let maxId = Math.max(... this.allNews.map(n=> n.id), 0);
    // this.allNews.push( { id: maxId +1, content: newItem, checked: false });
  
  }

  public updateNewsItem(id: number, newsItem: NewsContent){
    this.printTime(`UpdateNews`)
    let isSuccess = false;
    this.httpClient.put<boolean>(this._api + `UpdateNews`, {id: id, caption: newsItem.caption,
            text: newsItem.text, date: newsItem.date, theme: this.getThemeKeyFunc(newsItem.theme)})
        .subscribe((data: boolean) => isSuccess = data);
    console.log(`UpdateNews/${id} => ${isSuccess}`);
    // const currentNews = this.allNews[itemIndex];
    // this.allNews[itemIndex]  = {... currentNews, content: newsItem };
  }

  public printTime(text: string | undefined){
     var date =  new Date();
     console.log(`${text} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);      
  }

}
