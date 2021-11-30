import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/model/News';

@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBlockComponent implements OnInit {

  @Input() public currentNews: News;
  @Output() public deleteNews: EventEmitter<News> = new EventEmitter();
  @Output() public editNews: EventEmitter<News> = new EventEmitter();
  @Output() public selectedNews: EventEmitter<News> = new EventEmitter();
  public checkBoxState: boolean;
  public enableDeleteButton: boolean;       

  constructor() { 
    this.currentNews = new News(-1, new Date, "Новость", "");
    this.checkBoxState = false;
    this.enableDeleteButton = this.checkBoxState;          
  }

  ngOnInit(): void {
  }

  onCheckboxChange(checked:boolean){    
    this.checkBoxState = checked;
    this.enableDeleteButton = this.checkBoxState;
    this.selectedNews.emit(this.currentNews);
  }

  onDeleteNew(){
    this.deleteNews.emit(this.currentNews)
  }

  onEditNew(){    
    this.editNews.emit(this.currentNews); 
  }
  
  ngDoCheck(){
    console.log('app-news-block - ' + this.currentNews.title);
  }
}
