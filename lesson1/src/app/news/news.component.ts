import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { Information, UserRightsObj } from './news-types';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostsService } from './posts.service';


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

  public userRights: UserRightsObj = {isUsercanDeleteNews: true, isUsercanEditNews: true};

  constructor(private _postService: PostsService) { 

  }

@ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
@ViewChild('contextMenuNews') contextMenu!: ContextMenuComponent;


getPosts(){
  return this._postService.getPosts();
}

  ngOnInit(): void {
    this._postService.getPosts().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(posts => {
      this.posts = posts;
    });
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
