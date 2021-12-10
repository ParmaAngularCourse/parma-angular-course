import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NewsItem, NewsObj } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  public ourNews: NewsItem[] =[
    { id: 1,
     checked : true, 
     news: { 
        date : new Date(2021, 12, 5),
        caption: "Запуск ракеты Atlas V с военным спутником перенесён из-за утечки горючего в наземном хранилище", 
        text: "По сообщениям сетевых источников, старт ракеты-носителя Atlas V со спутником Космических сил США, который должен был состояться сегодня, перенесён на сутки из-за утечки горючего в наземном хранилище. Об этом пишет информационное агентство ТАСС со ссылкой на данные пресс-службы американского консорциума United Launch Alliance (ULA)."
    }},
    { id: 2, 
      checked : false, 
      news: { 
          date : new Date(2021, 12, 4),
          caption: "Бюджетные видеокарты окончательно можно отправлять на пенсию? iGPU в мобильном APU Ryzen 6000 обходит GeForce GTX 1050 Ti", 
          text: "Согласно первой утечке, неизвестный процессор этой линейки набирает в 3DMark Time Spy около 2700 баллов. И это внушительно для встроенного графического ядра. Для сравнения, Ryzen 7 5800U набирает около 1200-1300 баллов и даже настольный Ryzen 7 5700G может похвастаться лишь около 1700 баллами. То есть относительно прямого предшественника новинка AMD будет быстрее более чем вдвое! К слову, это уже результат уровня разогнанной GTX 1050 Ti."
    }},
    { id: 3,
      checked : true, 
      news: { 
          date : new Date(2021, 12, 3),
          caption: "Выбраны самые популярные смайлики в мире", 
          text: "Консорциум Unicode опубликовал рейтинг самых популярных смайликов в 2021 году. В тройку лидеров входят «лицо со слезами радости», «красное сердце» и «катание по полу от смеха». Популярный смайлик «слегка улыбающееся лицо» даже не вошел в десятку, он оказался только на 28 месте."
    }}    
];

  public isNewNewsShowed: boolean = false;
  public editDialogCaption: string = "";
  public editDialogNewsItem: NewsItem = this.getEmptyNews();
  
  constructor() {
   }

  ngOnInit(): void {
  }

  onSaveNews(eventObj: NewsObj, id: number){
      var editedNews = this.ourNews.find(n=> n.id == id);
      if (editedNews){
        editedNews.news.caption = eventObj.caption;
        editedNews.news.text = eventObj.text;
        editedNews.news.date = eventObj.date;
      }
  }

  onAddNews(eventObj: NewsObj){
    var maxId = Math.max(... this.ourNews.map(n=> n.id), 0);
    this.ourNews.push( { id: maxId +1, news: eventObj, checked: false } );
  }

  onDeleteNews(id: number){
    this.ourNews = this.ourNews.filter(n=> n.id != id);
  }

  onEditNews(id: number){
    var editedNews =  this.ourNews.find(n=> n.id == id) ;
    this.editDialogCaption = `Редактирование ${editedNews?.id} новости`;
    this.editDialogNewsItem = editedNews ?? this.getEmptyNews();
    this.isNewNewsShowed = true;
  } 

  onShowAddNewsDialog(){
    this.editDialogCaption = "Добавление новости"
    this.isNewNewsShowed = true;
    this.editDialogNewsItem =  this.getEmptyNews();
  }

  getEmptyNews(): NewsItem{
    return {id: 0, news: {  caption: "", text: "", date: new Date() },  checked: false };
  }

  ngDoCheck(){
    console.log("app-news");
  }

}
