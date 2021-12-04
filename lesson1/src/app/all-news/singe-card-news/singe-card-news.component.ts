import { Component, EventEmitter, Input, Output } from '@angular/core';
import { news_single } from 'src/models/news-single';
import { NewsService } from 'src/services/newsService';

@Component({
  selector: 'app-singe-card-news',
  templateUrl: './singe-card-news.component.html',
  styleUrls: ['./singe-card-news.component.scss']
})
export class SingeCardNewsComponent  {

  @Input("single_post_data") single_post!: news_single 
  @Output() deletePost : EventEmitter<number> = new EventEmitter<number>();
  public isOpenedModal: boolean = false;

  constructor() { }

 
  onChange(): any {
    this.single_post.isSelected = !this.single_post.isSelected;
  }

  onDeletePost(){
    this.deletePost.emit(this.single_post.id);
  }

  onOpenModal(){
    this.isOpenedModal = true;
  }

  onCloseModal(){
    this.isOpenedModal = false;
  }

  onAddNewsPost($event: news_single){

  }
}
