import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router, RouterOutlet } from '@angular/router';
import { bufferCount, combineLatest, debounceTime, distinctUntilChanged, from, fromEvent, map, Observable, startWith, Subject, switchMap, takeUntil, toArray } from 'rxjs';
import { INewsData } from 'src/model/INewsData';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { TypeNews } from 'src/model/TypeNews';
import { NewsContextMenuComponent } from './news-context-menu/news-context-menu.component';
import { NewsEditorComponent } from '../news-editor/news-editor.component';
import { NewsService } from '../../../service/news.service';
import { NewsBlockComponent } from './news-block/news-block.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  @ViewChild('contextMenu') newsContextMenu!: NewsContextMenuComponent
  @ViewChild('newsFilter') newsFilter!: ElementRef
  @ViewChildren(NewsBlockComponent) childrenComponents!:QueryList<NewsBlockComponent>  
  public newsArray: INewsData[][] = [];
  public enableDeleteButton:boolean = false;  
  private unsubscriptionSubj!:Subject<void>

  constructor(private newsService:NewsService, private cd:ChangeDetectorRef, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
  }

  ngAfterViewInit() {
    let newsTypeFilter$: Observable<TypeNews> = this.route.queryParams
    .pipe(
      map(paramObj => paramObj['type'] as TypeNews)
    );

    let searchTextFilter$: Observable<string> = fromEvent<Event>(this.newsFilter.nativeElement, 'keyup')
    .pipe(
      debounceTime(600),
      map(event => (event.target as HTMLInputElement).value as string),
      startWith(''),
      distinctUntilChanged()
    );

    combineLatest(      
      [searchTextFilter$, 
       newsTypeFilter$]
    ).pipe(
      map(([searchFilter, typeFilter]) => new NewsFilter(searchFilter, typeFilter)),
      switchMap(filter=> this.newsService.getNewsList(filter)),
      switchMap(value=> {
        return from(value).pipe(
        bufferCount(3),
        toArray()
        )
      }),
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe({
      next: (data) => this.setNewsData(data),
      error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
    });
  }

  private setNewsData(data:INewsData[][]):void{
    this.newsArray = data;
    this.childrenComponents.forEach(x=>x.onCheckboxChange(false));
    this.cd.markForCheck();
  }

  onDeleteNews(news:News){
    this.newsService.deleteNews(news);
  }

  onAddNews(){
    this.router.navigate([{ outlets: { editForm: ['add'] }}], { relativeTo: this.route, queryParamsHandling: 'merge'});
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
