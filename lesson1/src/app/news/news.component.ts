import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EditedDataObj, Information } from './news-types';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {

  public isEditorOpen: boolean = false;
  public editedPost!: Information;

  public informationList: Information[] = [
    {
      date: "1.1.1900", 
      title: "Новость 1", 
    },
    {
      date: "1.12.1900", 
      title: "Новость 2", 
    },
    {
      date: "1.1.2000", 
      title: "Новость 3", 
    },
    {
      date: "1.12.2000", 
      title: "Новость 4", 
    }    
  ];

  constructor() { }

  ngOnInit(): void 
  {
  }

  ngDoCheck(){
    //console.log('news-component');
  }


  onEditPost($event: Information){    
    this.isEditorOpen = true;
    this.editedPost = $event;
  }

  onDeletePost($event: Information){    
    this.informationList.splice(this.informationList.indexOf($event), 1);
  }

  onCheckPost($event: Information){    
    $event.isCheck = !$event.isCheck;
  }

  onNewPost(){    
    this.isEditorOpen = true;
    this.editedPost = {date: "", title: "", text: "" };
  }


  onSavePost($event: Information){    

    let currentPostIndex = this.informationList.indexOf($event);
    if(currentPostIndex == -1)
    {
      this.informationList.push($event);
    }

    this.isEditorOpen = false;
  }

  onCancelEditPost(){    
    this.isEditorOpen = false;
    this.editedPost = {date: "", title: "", text: "" };
  } 





}
