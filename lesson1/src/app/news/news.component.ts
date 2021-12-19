import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NewsItem, NewsObj, Theme } from './news-types';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { AdThemeDirective } from './ad-theme.directive';
import { User } from './user-rights';
import { NewsSourceService } from '../news-source.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {

  public ourNews: NewsItem[] = [];

  public editDialogCaption: string = "";
  public editDialogNewsItem: NewsItem = this.getEmptyNews();
  public unsavedNewsItem: NewsItem = this.getEmptyNews();
  public isDeleteButtonAvailable = false; 
  public currentUser: User = { Name: "Петр",Rights: {CanDelete: false, CanSave: false } };

  public ThemeEnum = Theme;

  @ViewChild('contextMenuComponent') menuComponent!: ContextMenuComponent;
  @ViewChild('popupDialog') popupDialog!: PopupDialogComponent;  
  
  constructor(private viewContainerRef: ViewContainerRef,
         private cdr: ChangeDetectorRef,
         private _newsSourceService: NewsSourceService)
 { 
    this.refreshNewsList();
      this.checkCheckboxes();     
  }

  refreshNewsList(){
    this.ourNews = this._newsSourceService.getNews();
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
    this._newsSourceService.deleteNews(id);
    this.refreshNewsList();
  }

  checkCheckboxes(){
      let isAnyChecked = this.ourNews.some((el)=> el.checked);
      this.isDeleteButtonAvailable = isAnyChecked;
  }

  onMarkNews =() => this.checkCheckboxes();

  onShowContextMenu(event: MouseEvent){    
    this.menuComponent.show({top: event.clientY , left: event.clientX});
    return false;
  }

  onClickClosePopupButton= ()=>{
    this.popupDialog.close(); 
  }  

  onClickSavePopupButton= ()=>{    
    const currentNewsIndex= this.ourNews.findIndex((el)=> el.id === this.editDialogNewsItem.id);

    if (currentNewsIndex > -1) { 
        this._newsSourceService.updateNewsItem(currentNewsIndex,this.unsavedNewsItem.news);            
    } else {
        this._newsSourceService.addNews(this.unsavedNewsItem.news);
    }   
    this.onClickClosePopupButton();
    this.refreshNewsList();
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
