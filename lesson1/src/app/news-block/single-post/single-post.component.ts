import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsBlock } from 'src/app/post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input("single_post_data") single_post!: NewsBlock;
  @Output() deleteItem : EventEmitter<number> = new EventEmitter();
  @Output() editItem : EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectNewsItem (checked : boolean) 
  {         
    this.single_post.checked = checked;
  }

  onDeleteItem(id:number)
  {
    this.deleteItem.emit(id);
  }

  onEditItem(id:number)
  {
    this.editItem.emit(id);
  }
}
