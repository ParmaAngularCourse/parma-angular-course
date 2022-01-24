import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() public selectedNews: EventEmitter<News> = new EventEmitter();
  public checkBoxState: boolean;
  public enableDeleteButton: boolean;       

  constructor(private route: ActivatedRoute, private router: Router) { 
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
    this.router.navigate([{ outlets: { editForm: ['edit', this.currentNews.id] }}], { relativeTo: this.route, queryParamsHandling: 'merge'}); 
  }
  
  ngDoCheck(){
    console.log('app-news-block - ' + this.currentNews.title);
  }
}
