import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { Information, UserRightsObj } from './news-types';
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

  private ngUnsubscribe$: Subject<void> = new Subject();
  searchTitle!: FormControl;
  searchTitleValue: string = "Поиск...";
  searchTitleStatus: string = "";

  public userRights: UserRightsObj = {isUsercanDeleteNews: true, isUsercanEditNews: true};

  constructor(private _postService: PostsService) { 

  }

@ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
@ViewChild('contextMenuNews') contextMenu!: ContextMenuComponent;

/*getPosts(searchString: string){
  return this._postService.getPosts(searchString);
}*/

  ngOnInit(): void {
    
    this._postService.getPosts()
                      .pipe(takeUntil(this.ngUnsubscribe$))
                      .subscribe(posts => {this.posts = posts;});

    //this.searchTitle = new FormControl(this.searchTitleValue, [Validators.required, Validators.minLength(5)], [notOneAsyncValidator] );
    this.searchTitle = new FormControl(this.searchTitleValue, [], [notOneAsyncValidator] );

    this.searchTitleValue = this.searchTitle.value;
    this.searchTitleStatus = this.searchTitle.status;

    this.searchTitle.valueChanges   
                .pipe(debounceTime(600))
                .pipe(filter(() => this.searchTitle.valid))
                .subscribe((value)=>{
                                      if(this.searchTitleValue != value){
                                        this.searchTitleValue = value;
                                      
                                        this._postService.getPosts(value)
                                                          .pipe(takeUntil(this.ngUnsubscribe$))
                                                          .subscribe(posts => {this.posts = posts;});
                                      }
                });

      /*this.searchTitle.statusChanges.subscribe((value)=>{
        this.searchTitleStatus = value;
    });*/
  }

  ngOnDestroy(){
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
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

  
  if(formControl.value){
    if(formControl.value.length < 4) {
      return of({notOneValidator: {message: 'Для поиска необходимо ввести больше 3х символов'}})
    }
  }
  
  return of(null);
}