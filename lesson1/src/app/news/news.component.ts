import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { Information, NewsTypes, UserRightsObj } from './news-types';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostsService } from './posts.service';


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
  private newsTypeFilter?: null;

  editForm!: FormGroup;
  private ngUnsubscribeValueChange$: Subject<void> = new Subject();


  private ngUnsubscribe$: Subject<void> = new Subject();
  searchTitle!: FormControl;
  searchTitleValue: string = "Поиск...";
  searchTitleStatus: string = "";

  public userRights: UserRightsObj = {isUsercanDeleteNews: true, isUsercanEditNews: true};

  constructor(private _postService: PostsService, private route: ActivatedRoute, private router: Router ) { 


    this.newsTypeFilter = route.snapshot.params['newstypeid'];
    
    
    //console.log(this.newsTypeFilter);

/*
    route.params.subscribe(params=> {
        
      
        //console.log(params);
        //console.log(params['newstypeid']);

        this.newsTypeFilter = params['newstypeid'];
        //this.posts = this.posts.filter(i=> i.newsType == newsFilter);

    });*/


  }
  

@ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
@ViewChild('contextMenuNews') contextMenu!: ContextMenuComponent;

/*getPosts(searchString: string){
  return this._postService.getPosts(searchString);
}*/


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
                
                // не происходит перенаправление, хоть и меняется строка адреса в браузере
                this.router.navigate([newsLink], {relativeTo: this.route});
                //this.router.navigateByUrl(newsLink);

                //console.log(newsLink);
              });
}


  allNews()
  {
    //this.router.navigate(['news'], {relativeTo: this.route});                
    //this.router.navigate([''], {relativeTo: this.route});                
  }


  ngOnInit(): void {
    

    this.router.events.pipe(filter(e=> e instanceof NavigationEnd)).subscribe(()=> this._postService.getPosts()
                                                                    .pipe(takeUntil(this.ngUnsubscribe$))
                                                                    .subscribe(posts => {
                                                                      this.posts = this.filterPostsByNewsType(posts);
                                                                    })) ;


    this._postService.getPosts()
                      .pipe(takeUntil(this.ngUnsubscribe$))
                      .subscribe(posts => {
                        this.posts = this.filterPostsByNewsType(posts);
                      });

    //this.searchTitle = new FormControl(this.searchTitleValue, [Validators.required, Validators.minLength(5)], [notOneAsyncValidator] );
    this.searchTitle = new FormControl(this.searchTitleValue, [], [notOneAsyncValidator] );

    this.searchTitleValue = this.searchTitle.value;
    this.searchTitleStatus = this.searchTitle.status;

    this.searchTitle.valueChanges   
                .pipe(debounceTime(600),
                      distinctUntilChanged(),
                      filter(() => this.searchTitle.valid),
                      switchMap(value => this._postService.getPosts(value)),
                      takeUntil(this.ngUnsubscribe$))
                .subscribe(
                  posts => {
                    this.posts = this.filterPostsByNewsType(posts);
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
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();

    this.ngUnsubscribeValueChange$.next();
    this.ngUnsubscribeValueChange$.complete();
  }

  ngDoCheck(){
    //console.log('news-component');
  }


  onEditPost($event: Information){   
    this.editorTitle = "Редактировать новость"; 
    this.editedPost = $event;
    this.modalWindowPost.show(true);
  }

  onDeletePost($event: Information){    
    this._postService.deletePost($event);
  }

  onCheckPost($event: Information){    
    this._postService.checkPost($event);
  }

  onNewPost(){    
    this.editorTitle = "Добавить новость";
    this.editedPost = {date: "", title: "", text: "" };
    this.modalWindowPost.show(true);
  }


  onSavePost($event: Information){    
    this._postService.savePost($event);
    this.modalWindowPost.show(false);
  }

  onCancelEditPost(){   
    this.modalWindowPost.show(false);
  } 

  onCheckAll(){   
    this._postService.checkAll(); 
  }

  onDeleteSelected(){
    this._postService.deleteSelected(); 
  }

  getIsAnySelect(){
    return this._postService.getIsAnySelect();
  }


  contextMenuShow($event: MouseEvent){
    this.contextMenu.show({top: $event.clientY + 15, left: $event.clientX + 15});
    return false;
  }

  contextMenuClose(){
    this.contextMenu.hide();
  }


}


/*function notOneValidator(formControl: FormControl): null| errorValidate{
  if(formControl.value == 'Петров') {
    return {notOneValidator: {message: 'Нельзя вводить'}}
  }
  
  return null;
}*/

function notOneAsyncValidator(formControl: AbstractControl): Observable<null| errorValidate>{

    if(formControl.value?.length < 4) {
      return of({notOneValidator: {message: 'Для поиска необходимо ввести больше 3х символов'}})
    }
  
  return of(null);
}