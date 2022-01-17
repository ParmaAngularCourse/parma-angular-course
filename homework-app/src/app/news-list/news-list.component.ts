import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, forkJoin, Subject, switchMap, takeUntil, from, toArray, bufferCount } from 'rxjs';
import { NewsService } from '../news.service';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { NewsEditformComponent } from './news-editform/news-editform.component';
import { News, NewsType } from './news-types';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {

  public allNews: News[] = [];
  public newsToEdit: News = this.generateEmptyNews();
  public isEditMode: boolean = false;
  public search!: FormControl;
  public searchStr: string = '';

  public newsColumn1: News[] = [];
  public newsColumn2: News[] = [];
  public newsColumn3: News[] = [];

  @ViewChild(NewsEditformComponent) private viewEditForm!: NewsEditformComponent;
  @ViewChild("contextMenuComponent") private viewContextMenu!: ContextMenuComponent;

  private ngUnsubscribe$: Subject<boolean>;

  constructor(private _newsService: NewsService, private cdr: ChangeDetectorRef) {
    this.ngUnsubscribe$ = new Subject();
    this.getAllNews();
  }

  ngOnInit(): void {
    this.search = new FormControl(this.searchStr);
    this.search.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((value) => {
        return this._newsService.getFilteredNewsList(value);
      }),
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe(
      { next: (data) => {
        let selectedNewsIds = this.allNews.filter(n => n.selected).map(n => n.id);
        this.allNews = data;
        this.allNews.forEach((value: News) => {
          if(selectedNewsIds.includes(value.id))
            value.selected = true;
        });
        this.newsColumn1 = [];
        this.newsColumn2 = [];
        this.newsColumn3 = [];
        this.updateNewsColumns();        
        },
        error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
      }
    );
  }

  ngOnDestroy(): void {
      this.ngUnsubscribe$.next(true);
      this.ngUnsubscribe$.complete();
  }

  updateNewsColumns() {
    from(this.allNews).pipe(
      bufferCount(3),
      toArray()
    )
    .subscribe(result => {
      this.newsColumn1 = [];
      this.newsColumn2 = [];
      this.newsColumn3 = [];
      result.forEach(item => {
          this.newsColumn1.push(item[0]);
          if (item.length > 1) {
            this.newsColumn2.push(item[1]);
            if (item.length > 2) 
              this.newsColumn3.push(item[2]);
          }
        }
      );
      this.cdr.markForCheck();
    }); 
  }

  getAllNews() {
    this._newsService.getNewsList().pipe(
      takeUntil(this.ngUnsubscribe$)
    )
    .subscribe(
      { next: (data) => {
        let selectedNewsIds = this.allNews.filter(n => n.selected).map(n => n.id);
        this.allNews = data;
        this.allNews.forEach((value: News) => {
          if(selectedNewsIds.includes(value.id))
            value.selected = true;
        });
        this.newsColumn1 = [];
        this.newsColumn2 = [];
        this.newsColumn3 = [];
        this.updateNewsColumns();  
        },
        error: (error: HttpErrorResponse) => { console.log(`${error.status} ${error.message}`); }
      }
    );
  }

  onRemoveNews($event: number) {
    this._newsService.removeNews($event).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(result => 
      this.updateNewsColumns()
    );
  }

  onSaveNews(newsToSave: News) {
    if(this.isEditMode) {
      this._newsService.updateNews(newsToSave).pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(result => 
        this.updateNewsColumns()
      );
    }
    else {
      newsToSave.id = Math.max(...(this.allNews.map(el => el.id))) + 1;
      this._newsService.addNews(newsToSave).pipe(
        takeUntil(this.ngUnsubscribe$)
      ).subscribe(result => 
        this.updateNewsColumns()
      );
    }
    this.viewEditForm.closeWindow();
  }

  onCloseEditForm($event: any) {
    this.newsToEdit = this.generateEmptyNews();
    this.viewEditForm.closeWindow();
    this.cdr.markForCheck();
  }

  openAddNewsDialog() {
    this.isEditMode = false;
    this.openEditForm(this.generateEmptyNews());
  }

  hasSelectedNews() {
    return this.allNews.some(item => item.selected);
  }
  
  removeSelectedNews() {
    let removeCalls: any[] = this.allNews.filter(item => item.selected)
      .map(item => this._newsService.removeNews(item.id));
    forkJoin(removeCalls).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(result => 
      this.updateNewsColumns()
    );
  }

  openEditNewsDialog(newsToEdit: News) {
    this.isEditMode = true;
    this.openEditForm(newsToEdit);
  }

  openEditForm(news: News) {
    this.newsToEdit = news;
    this.viewEditForm.showWindow();
  }

  openContextMenu($event: any) {
    $event.preventDefault();
    this.viewContextMenu.show($event.clientY, $event.clientX);
  }

  hideContextMenu() {
    this.viewContextMenu.hide();
  }

  onSelectAll() {
    this.allNews = this.allNews.map(el => { return {...el, selected: true} });
    this.updateNewsColumns();
  }

  private generateEmptyNews() : News {
    let generatedNews : News = {
      id: 0,
      date: new Date(),
      title: '',
      text: '',
      type: NewsType.Politics,
      selected: false
    };
    return generatedNews;
  }
}
