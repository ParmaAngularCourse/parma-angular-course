import { Injectable } from '@angular/core';
import { NewsItem, NewsObj, Theme } from './news/news-types';

@Injectable({
  providedIn: 'root'
})
export class NewsSourceService {

  private allNews: NewsItem[] =[
    { id: 1,
      checked : true,   
      news: { 
        date : new Date(2021, 12, 5),
        caption: "Запуск ракеты Atlas V с военным спутником перенесён из-за утечки горючего в наземном хранилище", 
        text: "По сообщениям сетевых источников, старт ракеты-носителя Atlas V со спутником Космических сил США, который должен был состояться сегодня, перенесён на сутки из-за утечки горючего в наземном хранилище. Об этом пишет информационное агентство ТАСС со ссылкой на данные пресс-службы американского консорциума United Launch Alliance (ULA).",
        theme: Theme.Science
      }},
    { id: 2, 
      checked : false, 
      news: { 
          date : new Date(2021, 12, 4),
          caption: "Бюджетные видеокарты окончательно можно отправлять на пенсию? iGPU в мобильном APU Ryzen 6000 обходит GeForce GTX 1050 Ti", 
          text: "Согласно первой утечке, неизвестный процессор этой линейки набирает в 3DMark Time Spy около 2700 баллов. И это внушительно для встроенного графического ядра. Для сравнения, Ryzen 7 5800U набирает около 1200-1300 баллов и даже настольный Ryzen 7 5700G может похвастаться лишь около 1700 баллами. То есть относительно прямого предшественника новинка AMD будет быстрее более чем вдвое! К слову, это уже результат уровня разогнанной GTX 1050 Ti.",
          theme: Theme.Economics
        }},
    { id: 3,
      checked : true, 
      news: { 
          date : new Date(2021, 12, 3),
          caption: "Выбраны самые популярные смайлики в мире", 
          text: "Консорциум Unicode опубликовал рейтинг самых популярных смайликов в 2021 году. В тройку лидеров входят «лицо со слезами радости», «красное сердце» и «катание по полу от смеха». Популярный смайлик «слегка улыбающееся лицо» даже не вошел в десятку, он оказался только на 28 месте.",
          theme: Theme.Internet
        }}    
  ];

  public getNews(){
    return this.allNews;
  }

  public deleteNews(id?: number){
    if (id !== undefined){
      this.allNews = this.allNews.filter(n=> n.id != id);
    } else {
      this.allNews = this.allNews.filter(n=> !n.checked);
    }
  }

  public addNews(newItem: NewsObj){
    let maxId = Math.max(... this.allNews.map(n=> n.id), 0);
    this.allNews.push( { id: maxId +1, news: newItem, checked: false });
  }

  public updateNewsItem(itemIndex: number, newsItem: NewsObj){
    const currentNews = this.allNews[itemIndex];
    this.allNews[itemIndex]  = {... currentNews, news: newsItem };
  }

  constructor() { }
}
