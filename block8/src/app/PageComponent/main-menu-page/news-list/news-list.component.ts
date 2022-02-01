import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { bufferCount, combineLatest, debounceTime, distinctUntilChanged, from, fromEvent, map, Observable, startWith, Subject, switchMap, takeUntil, toArray } from 'rxjs';
import { News } from 'src/model/News';
import { NewsFilter } from 'src/model/NewsFilter';
import { TypeNews } from 'src/model/TypeNews';
import { NewsContextMenuComponent } from './news-context-menu/news-context-menu.component';
import { NewsBlockComponent } from './news-block/news-block.component';

import { select, Store } from '@ngrx/store'
import * as fromStore from '../../../store';

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
  public newsArray: News[][] = [];
  public newsTypesArray$!: { [key in TypeNews]?: Observable<number> }//Observable<number>;
  public newsCount$!: Observable<number>;
  public enableDeleteButton:boolean = false;  
  private unsubscriptionSubj!:Subject<void>

  constructor(
    private store: Store<fromStore.State>,
    private cd:ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router){}

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
    )
    .pipe(
      map(([searchFilter, typeFilter]) => new NewsFilter(searchFilter, typeFilter)),
      takeUntil(this.unsubscriptionSubj)
    )
    .subscribe(filter => this.store.dispatch(fromStore.loadNews({ filter: filter})));    

    this.store.pipe(select(fromStore.selectNews))
    .pipe(        
        switchMap(value=> {
        return from(value)
              .pipe(                
                bufferCount(3),
                toArray()
               )
    }),
    takeUntil(this.unsubscriptionSubj)
    )
    .subscribe(data=> this.setNewsData(data));
    this.newsCount$= this.store.pipe(select(fromStore.selectNewsCount));
    this.getNewsTypeCount();
  }

  private getNewsTypeCount()
  {
    if(!this.newsTypesArray$){
      this.newsTypesArray$ = {}
    }
    
    this.newsTypesArray$[TypeNews.Type1_Policy] = this.store.pipe(select(fromStore.selectNewsByType(TypeNews.Type1_Policy)));
    this.newsTypesArray$[TypeNews.Type2_Tourism] = this.store.pipe(select(fromStore.selectNewsByType(TypeNews.Type2_Tourism)));
    this.newsTypesArray$[TypeNews.Type3_Economics] = this.store.pipe(select(fromStore.selectNewsByType(TypeNews.Type3_Economics)));
    this.newsTypesArray$[TypeNews.Type4_Science] = this.store.pipe(select(fromStore.selectNewsByType(TypeNews.Type4_Science)));
    this.newsTypesArray$[TypeNews.Type5_Internet] = this.store.pipe(select(fromStore.selectNewsByType(TypeNews.Type5_Internet)));
  }

  private setNewsData(data:News[][] | undefined):void{
    this.newsArray = data ?? [];
    this.childrenComponents.forEach(x=>x.onCheckboxChange(false));
    this.cd.markForCheck();
  }

  onDeleteNews(news:News){
    this.store.dispatch(fromStore.deleteNews({deletingNews: news}));
  }

  onAddNews(){
    this.router.navigate([{ outlets: { editForm: ['add'] }}], { relativeTo: this.route, queryParamsHandling: 'merge'});
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
