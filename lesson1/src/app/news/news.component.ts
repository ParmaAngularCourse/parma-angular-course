import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { newsType, subjectType } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public modalVisible : boolean = false;
  public emptyNews: newsType = {
    id: 0,
    dt: new Date(), 
    title: "",
    text: "",
    subject: subjectType.politics,
    checked: false
  }

  public selectNews: newsType = {
    id: 0,
    dt: new Date(), 
    title: "",
    text: "",
    subject: subjectType.politics,
    checked: false
  }

  public title!: string;

  public newsItems: newsType[] = [
    {
      id: 1, 
      dt: new Date('2021-11-20T10:20'), 
      title: "«Газпром» может прекратить поставки газа в Молдавию за долги", 
      text: "«Газпром» может прекратить поставки газа в Молдавию за долги - полный текст новости", 
      subject: subjectType.economy,
      checked: false
    },
    {
      id: 2, 
      dt: new Date('2021-11-21T11:10'), 
      title: "Роскомнадзор потребовал от 13 компаний открыть представительства в России", 
      text: "Роскомнадзор потребовал от 13 компаний открыть представительства в России - полный текст новости", 
      subject: subjectType.internet,
      checked: false
    },
    {
      id: 3, 
      dt: new Date('2021-11-22T14:30'), 
      title: "Исследования детской вакцины от COVID-19 начнутся после одобрения препарата для подростков",  
      text: "Исследования детской вакцины от COVID-19 начнутся после одобрения препарата для подростков - полный текст новости", 
      subject: subjectType.science,
      checked: false
    },
    {
      id: 4, 
      dt: new Date('2021-11-22T18:20'), 
      title: "В Югре ввели режим самоизоляции для непривитых жителей четырех муниципалитетов",  
      text: "В Югре ввели режим самоизоляции для непривитых жителей четырех муниципалитетов - полный текст новости", 
      subject: subjectType.politics,
      checked: false
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

  public showModal($event: newsType){
    this.modalVisible = true;
    
    if ($event.id == 0)
    {
      $event.dt = new Date();
      $event.id = this.newsItems.length+1;
      this.title = "Добавить новость";
    }
    else{
      this.title = "Изменить новость";
    }
    this.selectNews = $event;

    console.log(this.modalVisible);
  }

  public closeModal($event: newsType){
    console.log("close modal");
    if ($event.id < this.newsItems.length+1)
    {
      this.newsItems[$event.id-1] =  (JSON.parse(JSON.stringify($event)));
    }
    else
    {
      let news: newsType =  (JSON.parse(JSON.stringify($event)));
      this.newsItems.push(news);
      this.emptyNews.id = 0;
    }
      
    this.modalVisible = false;
  }

  public deleteItem(id: number){
    if (this.newsItems[id-1].checked)
    {
      this.newsItems.splice(id-1, 1);
      for (let i=0; i<this.newsItems.length; i++){
        this.newsItems[i].id = i+1;
      }
    }
  }

  public cancelModal(){
    this.modalVisible = false;
  }
 
}

