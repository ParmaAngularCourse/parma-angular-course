import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/model/news';


@Component({
  selector: 'app-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBlockComponent implements OnInit {

  @Input() public currentNews: News;
  @Output() public deleteNews: EventEmitter<News> = new EventEmitter();
  public checkBoxState: boolean;
  public enableDeleteButton: boolean;
  public showEditForm: boolean = false;       

  constructor() { 
    this.currentNews = new News(new Date, "Новость", "");
    this.checkBoxState = false;
    this.enableDeleteButton = this.checkBoxState;          
  }

  ngOnInit(): void {
  }

  onCheckboxChange(event:Event){
    var checkBox = (event.target as HTMLInputElement);
    this.checkBoxState = checkBox.checked;
    this.enableDeleteButton = this.checkBoxState;
  }

  onDeleteNew(event:Event){
    this.deleteNews.emit(this.currentNews)
  }

  onShowEditForm(){
    this.showEditForm = !this.showEditForm;
  }
  
  ngDoCheck(){
    console.log('app-news-block' + this.currentNews.title);
  }
}
