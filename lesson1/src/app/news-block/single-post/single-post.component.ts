import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsBlock } from 'src/app/post-types';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
 changeDetection: ChangeDetectionStrategy.OnPush
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

  onDeleteItem()
  {
    this.deleteItem.emit(this.single_post.id);
  }

  onEditItem()
  {
    this.editItem.emit(this.single_post.id);
  }

  ngDoCheck(){
    console.log("single-post "+ this.single_post.id);
  }
}
