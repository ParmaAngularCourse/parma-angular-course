import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/model/news';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditorComponent implements OnInit {  
  @Input() public currentNews: News | undefined;
  @Output() public closeEditFrom: EventEmitter<Event> = new EventEmitter();
  @Output() public saveEditFrom: EventEmitter<News> = new EventEmitter();
  public newsDate:Date = new Date; 
  public newsTitle:string = "Заголовок";
  public newsBody:string = "Текст";

  constructor(private element: ElementRef<HTMLElement>){

  }

  ngOnInit(): void { 
    this.element.nativeElement.addEventListener('click', (event:Event)=> {  
      var htmlElement = event.target as Element;  
      if (htmlElement.className === 'mmodal-background') {
        this.closeForm();
      }        
    });
    
    if(this.currentNews != undefined){
      this.newsDate = this.currentNews.date;
      this.newsTitle = this.currentNews.title;
      this.newsBody = this.currentNews.body;
    }
  }

  saveForm() {
    if(this.currentNews == undefined){
      this.currentNews = new News(this.newsDate, this.newsTitle, this.newsBody);    
      this.saveEditFrom.emit(this.currentNews);
    }
    else{
      this.currentNews.date = this.newsDate;
      this.currentNews.title = this.newsTitle;
      this.currentNews.body = this.newsBody;
    }
    this.closeForm();
  }

  closeForm() {
    this.closeEditFrom.emit()
  }

  parseDate(event:Event): Date {
    var dateControl = event.target as HTMLDataElement;
    if (dateControl.value) {
        return new Date(dateControl.value);
    }
    return new Date();
  }

  onChangeStringInput(event:Event):string{
    var control = event.target as HTMLInputElement;
    if(control.value){
      return control.value;
    }
    else{
      return "";
    }
  }

  ngDoCheck(){
    console.log('app-news-editor' + this.currentNews?.title);
  }
}
