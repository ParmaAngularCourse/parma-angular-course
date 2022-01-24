import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { newsType, positionType, subjectType } from './news-types';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public emptyNews: newsType = {
    id: 0,
    dt: new Date(), 
    title: "",
    text: "",
    subject: subjectType.politics,
    checked: false
  }

  public selectNews: newsType = {...this.emptyNews }

  public title!: string;
  get isVisibleDelete(): boolean{
    return this.newsItems.some(news => news.checked);
  }

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

  @ViewChild('modalWindow') editNews!: EditNewsComponent;
  @ViewChild('contextMenu') contextMenu!: ContextMenuComponent;

  ngOnInit(): void {

  }

  public showModal($event: newsType){
    console.log('showModal');
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
    this.editNews.show();
  }

  public closeModal($event: newsType): void{
    let editNewsIndex = this.newsItems.findIndex(item => item.id === $event.id);
   
    if (editNewsIndex > -1) {
      //edit
      this.newsItems[editNewsIndex] = {...$event}
    } else {
      // add
      this.newsItems.push($event);
    }

    this.editNews.hide();      
  }

  public deleteItem(id: number){
    if (this.newsItems[id-1].checked)
    {
      this.newsItems.splice(id-1, 1);
      this.refreshIds();
    }
  }

  public cancelModal(){
  }

  onShowContextMenu($event: MouseEvent){
    console.log("onShowContextMenu");
    this.contextMenu.show({top: $event.clientY, left: $event.clientX});
    return false;
  }

  onClick(){
    this.contextMenu.hide();
  }

  selectAll(){
    console.log("select all");
    for (let i=0; i<this.newsItems.length; i++){
      this.newsItems[i].checked = true;
    }
  }

  checkNews(id:number){
    console.log("check news id=",id);
    this.newsItems[id-1].checked = !this.newsItems[id-1].checked;
  }

  deleteCheckedNews(){
    for (let i=this.newsItems.length-1; i>=0; i--){
      if (this.newsItems[i].checked)
      {
        this.newsItems.splice(i, 1);
      }
    }
    this.refreshIds();
  }

  refreshIds(){
    for (let i=0; i<this.newsItems.length; i++){
      this.newsItems[i].id = i+1;
    }
  }
}

