import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Information, NewsTypes } from '../news-types';


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

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  ngDoCheck(){

  }

  clickEditButton(param: Information){
    
    //this.router.navigate([{outlets: {modalPostEditor: 'modal'}}]);
    this.editPost.emit(param);
  }

  clickDeleteButton(param: Information){
    this.deletePost.emit(param);
  }

  changeCheckbox(param: Information){
    this.checkPost.emit(param);
  }

  getNewsTypeClass(value?: NewsTypes) {
    let result = "politic";
    
    switch (value) {
      case NewsTypes.Politic:
        result = "politic";
      break;
      case NewsTypes.Travel:
        result = "travel";
      break;
      case NewsTypes.Economic:
        result = "economic";
      break;
      case NewsTypes.Since:
        result = "since";
      break;
      case NewsTypes.Internet:
        result = "internet";
      break;
    }

    return result ;
  }



}
