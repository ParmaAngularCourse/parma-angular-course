import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Information, NewsTypes, UserRightsObj } from '../news-types';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostEditorComponent implements OnInit {

  @Input("edit_post_data") edit_post!: Information;
  @Input("user_data") userRights!: UserRightsObj;
  
  @Output() savePost: EventEmitter<Information> = new EventEmitter(); 
  @Output() cancelEditPost: EventEmitter<boolean> = new EventEmitter(); 
  
  public localData: Information = {
    date: "",
    title: "",
    text: "",
  };

  public isEditorOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  show(isShow: boolean)
  {
    this.isEditorOpen = isShow;
  }


  ngOnChanges(): void {
    this.localData.date = this.edit_post?.date;
    this.localData.title = this.edit_post?.title;
    this.localData.text = this.edit_post?.text == undefined ? "": this.edit_post?.text;
    this.localData.newsType = this.edit_post?.newsType == undefined ? NewsTypes.Politic: this.edit_post?.newsType;
  }

  clickPostEditorSaveButton(param: Information){
    param.date = this.localData.date;
    param.title = this.localData.title;
    param.text = this.localData.text;
    param.newsType = this.localData.newsType;

    this.savePost.emit(param);
  }

  clickPostEditorCancelButton(){
    this.cancelEditPost.emit();
  }


  textChange($event: Event, localData: Information){
    localData.text = ($event.target as HTMLInputElement).value;;
  }
  titleChange($event: Event, localData: Information){
    localData.title = ($event.target as HTMLInputElement).value;;
  }
  dateChange($event: Event, localData: Information){
    localData.date = ($event.target as HTMLInputElement).value;
  }

  newsTypeChange($event: number){
    this.localData.newsType = $event;
  }

}
