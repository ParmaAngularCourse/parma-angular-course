import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NewsItem, NewsObj, Theme } from './news-types';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { SingleNewsComponent } from './single-news/single-news.component';

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

  public editDialogCaption: string = "";
  public editDialogNewsItem: NewsItem = this.getEmptyNews();
  unsavedNewsItem: NewsItem = this.getEmptyNews();
  public isDeleteButtonAvailable = false; 

  public ThemeEnum = Theme;

  @ViewChild('contextMenuComponent') menuComponent!: ContextMenuComponent;
  @ViewChild('popupDialog') popupDialog!: PopupDialogComponent;  
  @ViewChildren(SingleNewsComponent) singleNewsComponent!: QueryList<SingleNewsComponent>;

  @ViewChild('dataInpTemplate') dataInpTemplate!: TemplateRef<HTMLElement>;  
  @ViewChild('textInpTemplate') textInpTemplate!: TemplateRef<HTMLElement>;  
  @ViewChild('textareaTemplate') textareaTemplate!: TemplateRef<HTMLElement>;  
  @ViewChild('radioTemplate') radioTemplate!: TemplateRef<HTMLElement>;  
  
  
  constructor(private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) { 
      this.CheckCheckoxes();
  }

  ngOnInit(): void {
  }
 
  getEmptyNews(): NewsItem{
    return {id: 0, news: {  caption: "", text: "", date: new Date(), theme: Theme.Unknown },  checked: false };
  } 

  onShowAddNewsDialog(){
    this.editDialogCaption = "Добавление новости";
    this.editDialogNewsItem =  this.getEmptyNews();
    this.popupDialog.show();
  }

  onEditNews(id: number){
    var editedNews =  this.ourNews.find(n=> n.id == id) ;
    this.editDialogCaption = `Редактирование ${editedNews?.id} новости`;
    this.editDialogNewsItem = editedNews ?? this.getEmptyNews();
    this.unsavedNewsItem.news = {... this.editDialogNewsItem.news};
    this.popupDialog.show();
  } 


  onDeleteNews(id?: number){
    if (id !== undefined){
      this.ourNews = this.ourNews.filter(n=> n.id != id);
    } else {
      this.ourNews = this.ourNews.filter(n=> !n.checked);
    }
    this.CheckCheckoxes();
  }

  CheckCheckoxes(){
      var isAnyChecked = this.ourNews.some((el)=> el.checked);
      this.isDeleteButtonAvailable = isAnyChecked;
  }

  onMarkNews =() => this.CheckCheckoxes();

  onShowContextMenu(event: MouseEvent){    
    this.menuComponent.show({top: event.clientY , left: event.clientX});
    return false;
  }

  onClickClosePopupButton= ()=>{
    this.popupDialog.close(); 
  }  


  onClickSavePopupButton= ()=>{    
    let currentNews = this.ourNews.find((el)=> el.id == this.editDialogNewsItem.id);
    if (currentNews != null) {
     //currentNews.news = this.unsavedNewsItem.news;  // Не обновляет 
     //currentNews = {... currentNews, news: this.unsavedNewsItem.news}; // Не обновляет 

     this.ourNews = this.ourNews.map((newsEl)=>{
          return {...newsEl, news: newsEl == currentNews ?  this.unsavedNewsItem.news : newsEl.news}
        });    

    } else {
      var maxId = Math.max(... this.ourNews.map(n=> n.id), 0);
      this.ourNews.push( { id: maxId +1, news: this.unsavedNewsItem.news, checked: false } );
    }
    this.onClickClosePopupButton();
  }


  onContextCheckAll(){    
    this.ourNews = this.ourNews.map(function(news){
      return {...news, checked: true};
    });      
  }

  onJustClick=() => this.menuComponent.close();

  onRadioButChange(value: string){    
    this.unsavedNewsItem.news.theme = value as Theme;
  }

  onDialogInpChange(event: Event, fieldName: string){
    let newValue = (event.currentTarget as HTMLInputElement).value;
    switch(fieldName){
      case 'text':
        this.unsavedNewsItem.news.text = newValue;
        break;
        case 'caption':
          this.unsavedNewsItem.news.caption = newValue;
          break;
          case 'date':
            this.unsavedNewsItem.news.date = (event.currentTarget as HTMLInputElement).valueAsDate ?? new Date();
          break;
      }   
  }
}
