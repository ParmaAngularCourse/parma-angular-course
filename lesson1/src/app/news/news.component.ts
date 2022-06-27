import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, observable, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { Information, UserRightsObj } from './news-types';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostsService } from './posts.service';

import {select, Store} from '@ngrx/store';
import * as formStore from '../store';



type errorValidate = {
  notOneValidator: {message: string}
}


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsComponent implements OnInit, OnDestroy  {

  public posts: Information[] = [];
  public editedPost!: Information;
  public editorTitle?: string;
  private newsTypeFilter?: number;

  editForm!: FormGroup;
  private ngUnsubscribeValueChange$: Subject<void> = new Subject();


  //private ngUnsubscribe$: Subject<void> = new Subject();
  searchTitle!: FormControl;
  searchTitleValue: string = "";
  searchTitleStatus: string = "";

  public userRights!: UserRightsObj;

  public posts$ = this.store.pipe(select(formStore.selectPosts));
  public count$ = this.store.pipe(select(formStore.selectPostsCount));
  public countWithoutSomething$ = this.store.pipe(select(formStore.selectPostsWithoutSomethingCount));
  
  public countNewsPolitic$ = this.store.pipe(select(formStore.selectPostsPolitic));
  public countNewsTravel$ = this.store.pipe(select(formStore.selectPostsTravel));
  public countNewsEconomic$ = this.store.pipe(select(formStore.selectPostsEconomic));
  public countNewsSince$ = this.store.pipe(select(formStore.selectPostsSince));
  public countNewsInternet$ = this.store.pipe(select(formStore.selectPostsInternet));
  
  constructor(
    private store: Store<formStore.State>,
    private _postService: PostsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthServiceService) { 

    this.searchTitleValue = this._postService.getSearchString();

    this.userRights = this.authService.getUserRights();

    this.newsTypeFilter = route.snapshot.params['newstypeid'];
    
    this.router.events.pipe(filter(e=> e instanceof NavigationEnd), takeUntil(this.ngUnsubscribeValueChange$))
                          .subscribe(() => {
                                              this.store.dispatch(formStore.LoadPosts({searchData: {titleValue: this.searchTitleValue, newsTypeValue: this.newsTypeFilter}}));
                                          });


    route.params.pipe(takeUntil(this.ngUnsubscribeValueChange$)).subscribe(() => {
                        this.store.dispatch(formStore.LoadPosts({searchData: {titleValue: this.searchTitleValue, newsTypeValue: this.newsTypeFilter}}));
      });
  }
  

@ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
@ViewChild('contextMenuNews') contextMenu!: ContextMenuComponent;

initFormGroup()
{
  this.editForm = new FormGroup({
    newsTypeFilter: new FormControl(this.newsTypeFilter, []),
  });

  this.editForm.valueChanges
              .pipe(takeUntil(this.ngUnsubscribeValueChange$))
              .subscribe((value)=>{
                this.newsTypeFilter = value.newsTypeFilter;

                let newsLink = '/news/'+this.newsTypeFilter;
                this.router.navigate([newsLink], {relativeTo: this.route});
              });
}
  ngOnInit(): void {
       
    this.store.dispatch(formStore.LoadPosts({searchData: {titleValue: this.searchTitleValue, newsTypeValue: this.newsTypeFilter}}));

    this.searchTitle = new FormControl(this.searchTitleValue, [], [notOneAsyncValidator] );

    this.searchTitleValue = this.searchTitle.value;
    this.searchTitleStatus = this.searchTitle.status;

    this.searchTitle.valueChanges   
                  .pipe(debounceTime(600),
                        distinctUntilChanged(),
                        filter(() => this.searchTitle.valid),
                        takeUntil(this.ngUnsubscribeValueChange$)
                      )
                      .subscribe(value => {
                        this.store.dispatch(formStore.LoadPosts({searchData: {titleValue: value, newsTypeValue: this.newsTypeFilter}}));

                      });

    this.initFormGroup();
  }


  filterPostsByNewsType(posts: Information[])
  {
    if(this.newsTypeFilter)
      posts = posts.filter(n=> n.newsType == this.newsTypeFilter);
    
    return posts;
  }



  ngOnDestroy(){
    //this.ngUnsubscribe$.next();
    //this.ngUnsubscribe$.complete();

    this.ngUnsubscribeValueChange$.next();
    this.ngUnsubscribeValueChange$.complete();
  }

  ngDoCheck(){

  }


  onEditPost($event: Information){   
    this.editorTitle = "Редактировать новость"; 
       
    this.editedPost = $event;
   
    //this.router.navigate([{outlets: {modalPostEditor: 'modal'}}]);
    this.modalWindowPost.show(true);
  }

  onDeletePost($event: Information){    
    //this._postService.deletePost($event);
  }

  onCheckPost($event: Information){    
    //this._postService.checkPost($event);
  }

  onNewPost(){    
    this.modalWindowPost.editorTitle = "Добавить новость";
    this.modalWindowPost.edit_post = {date: "", title: "", text: "" };

    this.modalWindowPost.show(true);
    //this.router.navigate([{outlets: {modalPostEditor: 'modal'}}]);
  }


  onSavePost($event: Information){    

/*
    this.editedPost.date = $event.date;
    this.editedPost.title = $event.title;
    this.editedPost.text = $event.text;
    this.editedPost.newsType = $event.newsType;
*/
    this.store.dispatch(formStore.addPost({post: $event}));

    //this._postService.savePost($event);
    this.modalWindowPost.show(false);

    //this.router.navigate([{outlets: {modalPostEditor: null}}]);
  }

  onCancelEditPost(){   
    
    //this.router.navigate([{outlets: {modalPostEditor: null}}]);
    this.modalWindowPost.show(false);
  } 

  onCheckAll(){   
    //this._postService.checkAll(); 
  }

  onDeleteSelected(){
    //this._postService.deleteSelected(); 
  }

  getIsAnySelect(){
    return false; 
    //return this._postService.getIsAnySelect();
  }


  contextMenuShow($event: MouseEvent){
    this.contextMenu.show({top: $event.clientY + 15, left: $event.clientX + 15});
    return false;
  }

  contextMenuClose(){
    this.contextMenu.hide();
  }


}


function notOneAsyncValidator(formControl: AbstractControl): Observable<null| errorValidate>{

    if(formControl.value?.length < 4 && formControl.value?.length > 0) {
      return of({notOneValidator: {message: 'Для поиска необходимо ввести больше 3х символов'}})
    }
  
  return of(null);
}