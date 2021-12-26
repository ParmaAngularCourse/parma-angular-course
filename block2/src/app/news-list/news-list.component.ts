import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { NewsContextMenuComponent } from '../news-context-menu/news-context-menu.component';
import { NewsEditorComponent } from '../news-editor/news-editor.component';
import { NewsService } from '../service/news.service';
import { NewsBlockComponent } from './news-block/news-block.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {
  @ViewChild('newsEditForm') newsEditForm!: NewsEditorComponent
  @ViewChild('contextMenu') newsContextMenu!: NewsContextMenuComponent
  @ViewChildren(NewsBlockComponent) childrenComponents!:QueryList<NewsBlockComponent>
  public newsArray:News[] = [];
  public editFormCaption: string = "";
  public enableDeleteButton:boolean = false;  
  private unsubscriptionSubj!:Subject<void>

  constructor(private newsService:NewsService, private cd:ChangeDetectorRef)
  {
  }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.newsService.getNewsList()
    .pipe(
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe({
      next: (data) => {
        this.newsArray = data;
        this.cd.markForCheck();
      },
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message) 
    });
  }

  onDeleteNews(news:News){
    this.newsService.deleteNews(news);
  }

  onAddNews(){
    this.editFormCaption = "Добавить новость";    
    this.newsEditForm.openForm(null);
  }

  onEditNews(news:News){
    this.editFormCaption = "Изменить новость";
    this.newsEditForm.openForm(news);
  }
  
  onSaveNews(news: INewsData){
    this.newsService.addNews(news);
  }

  ngDoCheck(){
    console.log('app-news-list');
  }

  onRightClick(event: MouseEvent) { 
    event.preventDefault(); 
    this.newsContextMenu.showMenu(event);   
  }
  
  onSelectAllNews(){
    this.childrenComponents.forEach(x=>x.onCheckboxChange(true));
    this.newsContextMenu.closeMenu();    
  }

  onSelectedNews(news:News){
    var items = this.childrenComponents.find(x=>x.checkBoxState);
    if(items){
      this.enableDeleteButton = true;
    }
    else{
      this.enableDeleteButton = false;
    }
  }

  onDeleteAllSelectedNews(){
    var components = this.childrenComponents.filter(x=>x.checkBoxState);
    components.forEach(component => {
      component.onDeleteNew();
    });
    this.enableDeleteButton = false;
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
