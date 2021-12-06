import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { newsType } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public modalVisible : boolean = false;
  public emptyNews: newsType = {
    id: 0,
    dt: "", 
    title: "",
    text: "",
    checked: false
  }

  public selectNews: newsType = {
    id: 0,
    dt: "", 
    title: "",
    text: "",
    checked: false
  }

  constructor() { }

  ngOnInit(): void {

  }

  public showModal($event: newsType){
    this.modalVisible = true;
    
    if ($event.id == 0)
    {
      $event.dt = new Date().toLocaleString();
      $event.id = this.newsItems.length+1;
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
      var news: newsType =  (JSON.parse(JSON.stringify($event)));
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

  public newsItems: newsType[] = [
    {
      id: 1, 
      dt: "20.11.2021 10:20", 
      title: "«Газпром» может прекратить поставки газа в Молдавию за долги", 
      text: "«Газпром» может прекратить поставки газа в Молдавию за долги - полный текст новости", 
      checked: false
    },
    {
      id: 2, 
      dt: "21.11.2021 11:10", 
      title: "Роскомнадзор потребовал от 13 компаний открыть представительства в России", 
      text: "Роскомнадзор потребовал от 13 компаний открыть представительства в России - полный текст новости", 
      checked: false
    },
    {
      id: 3, 
      dt: "22.11.2021 14:30", 
      title: "Исследования детской вакцины от COVID-19 начнутся после одобрения препарата для подростков",  
      text: "Исследования детской вакцины от COVID-19 начнутся после одобрения препарата для подростков - полный текст новости", 
      checked: false
    },
    {
      id: 4, 
      dt: "22.11.2021 18:20", 
      title: "В Югре ввели режим самоизоляции для непривитых жителей четырех муниципалитетов",  
      text: "В Югре ввели режим самоизоляции для непривитых жителей четырех муниципалитетов - полный текст новости", 
      checked: false
    }
  ]
 
}

