import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Information } from '../news-types';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent implements OnInit {

  @Input("edit_post_data") edit_post!: Information;
  @Output() savePost: EventEmitter<Information> = new EventEmitter(); 
  @Output() cancelEditPost: EventEmitter<boolean> = new EventEmitter(); 
  
  public localData: Information = {
    date: "",
    title: "",
    text: "",
  };

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.localData.date = this.edit_post?.date;
    this.localData.title = this.edit_post?.title;
    this.localData.text = this.edit_post?.text == undefined ? "": this.edit_post?.text;
  }

  clickPostEditorSaveButton(param: Information){
    param.date = this.localData.date;
    param.title = this.localData.title;
    param.text = this.localData.text;

    this.savePost.emit(param);
  }

  clickPostEditorCancelButton(){
    this.cancelEditPost.emit();
  }


  textChange($event: string){
    this.localData.text = $event;
  }
  titleChange($event: string){
    this.localData.title = $event;
  }
  dateChange($event: string){
    this.localData.date = $event;
  }


}
