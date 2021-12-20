import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { Information, NewsTypes } from './news-types';
import { PostEditorComponent } from './post-editor/post-editor.component';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewsComponent implements OnInit {

  public editedPost!: Information;
  public editorTitle?: string;

  public informationList: Information[] = [
    {
      date: "1900-01-01",
      title: "Новость 1", 
      newsType: NewsTypes.Politic,
    },
    {
      date: "1900-12-01",
      title: "Новость 2", 
      newsType: NewsTypes.Travel,
    },
    {
      date: "2000-01-01",
      title: "Новость 3", 
      newsType: NewsTypes.Economic,
    },
    {
      date: "2000-12-01",
      title: "Новость 4", 
      newsType: NewsTypes.Since,
    }    
  ];

  constructor() { }

@ViewChild('modalWindowPostEdit') modalWindowPost!: PostEditorComponent;
@ViewChild('contextMenuNews') contextMenu!: ContextMenuComponent;


  ngOnInit(): void 
  {
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
    this.informationList.splice(this.informationList.indexOf($event), 1);
  }

  onCheckPost($event: Information){    
    $event.isCheck = !$event.isCheck;
  }

  onNewPost(){    
    this.editorTitle = "Добавить новость";
    this.editedPost = {date: "", title: "", text: "" };
    this.modalWindowPost.show(true);
  }


  onSavePost($event: Information){    

    let currentPostIndex = this.informationList.indexOf($event);
    if(currentPostIndex == -1)
    {
      this.informationList.push($event);
    }

    this.modalWindowPost.show(false);
  }

  onCancelEditPost(){   
    this.modalWindowPost.show(false);
  } 


  onCheckAll(){    
    this.informationList.map(i=> i.isCheck = true);
  }

  onDeleteSelected(){
    this.informationList = this.informationList.filter(i=> !i.isCheck)
  }

  getIsAnySelect(){
    return this.informationList.filter(i=> i.isCheck).length > 0;
  }


  contextMenuShow($event: MouseEvent){

    this.contextMenu.show({top: $event.clientY + 15, left: $event.clientX + 15});
    return false;
  }


}
