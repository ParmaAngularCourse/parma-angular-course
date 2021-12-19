import { Injectable } from '@angular/core';
import { NewsItem, NewsContent, Theme } from './news/news-types';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


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

  constructor(private httpClient: HttpClient) { }

  public getNews() : Observable<NewsItem[]> {
    console.log('GetNews');
    return this.httpClient.get<NewsData[]>(this._api + "GetNews").pipe(map(raw_items => 
      raw_items.map(item => {return { 
                  id: item.id,
                  content: { caption: item.caption, text: item.text, date: item.date, theme: item.theme },
                  checked: false  
               }})));
  }

  public deleteNews(id?: number){
    if (id !== undefined){
      this.allNews = this.allNews.filter(n=> n.id != id);
    } else {
      this.allNews = this.allNews.filter(n=> !n.checked);
    }
  }

  public addNews(newItem: NewsContent){
    let maxId = Math.max(... this.allNews.map(n=> n.id), 0);
    this.allNews.push( { id: maxId +1, content: newItem, checked: false });
  }

  public updateNewsItem(itemIndex: number, newsItem: NewsContent){
    const currentNews = this.allNews[itemIndex];
    this.allNews[itemIndex]  = {... currentNews, content: newsItem };
  }


}