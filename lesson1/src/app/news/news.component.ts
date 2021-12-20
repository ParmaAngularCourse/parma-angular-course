import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NewsItem, NewsContent, Theme } from './news-types';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { AdThemeDirective } from './ad-theme.directive';
import { User } from './user-rights';
import { NewsSourceService } from '../news-source.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  public currentUser: User = { Name: "Петр",Rights: {CanDelete: true, CanSave: true } };

  public ThemeEnum = Theme;

  @ViewChild('contextMenuComponent') menuComponent!: ContextMenuComponent;
  @ViewChild('popupDialog') popupDialog!: PopupDialogComponent;  
  
  constructor(private viewContainerRef: ViewContainerRef,
         private cdr: ChangeDetectorRef,
         private _newsSourceService: NewsSourceService)
 {     
      this.checkCheckboxes();     
      // this._newsSourceService.getNews().subscribe({
      //     complete: (data: NewsItem[]) => { 
      //       this.ourNews = data;
      //       return data;
      //     } ,
      //     error: (e: HttpErrorResponse) => {console.log(e.status + ' ' + e.message );}
      //   });

      this._newsSourceService.getNews().subscribe(
        (data) => {
          this.ourNews = data; 
          console.log("Данные "+ data.length);   
          this.cdr.detectChanges();            
        },
        (e: HttpErrorResponse) => console.log(e.status + ' ' + e.message )
      );

  }

  ngOnInit(){
   
  }

   refreshNewsList(){
     this._newsSourceService.getNews().subscribe((data: NewsItem[]) => {
        this.ourNews = data;
        console.log("refreshNews "+ data.length);   
        this.cdr.detectChanges();    
      }
      );   
      
   }  
 
  getEmptyNews(): NewsItem{
    return {id: 0, content: {  caption: "", text: "", date: new Date(), theme: Theme.Unknown },  checked: false };
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
    this.unsavedNewsItem.content = {... this.editDialogNewsItem.content};
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
        this._newsSourceService.updateNewsItem(currentNewsIndex,this.unsavedNewsItem.content);            
    } else {
        this._newsSourceService.addNews(this.unsavedNewsItem.content);
    }   
    this.onClickClosePopupButton();
    this.refreshNewsList();
    this.cdr.detectChanges();  
  }


  onContextCheckAll(){    
    this.ourNews = this.ourNews.map(function(news){
      return {...news, checked: true};
    });      
  }

  onJustClick=() => this.menuComponent.close();

  onRadioButChange(value: string){    
    this.unsavedNewsItem.content.theme = value as Theme;
  }

  onDialogInpChange(event: Event, fieldName: string){
    let newValue = (event.currentTarget as HTMLInputElement).value;
    switch(fieldName){
      case 'text':
        this.unsavedNewsItem.content.text = newValue;
        break;
      case 'caption':
        this.unsavedNewsItem.content.caption = newValue;
        break;
      case 'date':
        this.unsavedNewsItem.content.date = (event.currentTarget as HTMLInputElement).valueAsDate ?? new Date();
        break;
      }   
  }
}
