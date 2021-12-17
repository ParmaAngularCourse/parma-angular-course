import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Information } from '../news-types';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SinglePostComponent implements OnInit {

  @Input("single_post_data") single_post!: Information;
  @Output() editPost: EventEmitter<Information> = new EventEmitter(); 
  @Output() deletePost: EventEmitter<Information> = new EventEmitter(); 
  @Output() checkPost: EventEmitter<Information> = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    //console.log('single-post-component ' + this.single_post.title);
  }

  clickEditButton(param: Information){
    this.editPost.emit(param);
  }

  clickDeleteButton(param: Information){
    this.deletePost.emit(param);
  }

  changeCheckbox(param: Information){
    this.checkPost.emit(param);
  }

}
