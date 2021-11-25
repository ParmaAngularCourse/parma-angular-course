import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INewsData } from 'src/model/INewsData';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditorComponent implements OnInit {  
  @Input() public currentNews: INewsData | undefined;
  @Output() public closeEditFrom: EventEmitter<Event> = new EventEmitter();
  @Output() public saveEditFrom: EventEmitter<INewsData> = new EventEmitter();
  public id:number = -1;
  public newsDate:Date = new Date; 
  public newsTitle:string = "Заголовок";
  public newsBody:string = "Текст";

  constructor(){}

  ngOnInit(): void {   
    if(this.currentNews != undefined){
      this.id = this.currentNews.id;
      this.newsDate = this.currentNews.date;
      this.newsTitle = this.currentNews.title;
      this.newsBody = this.currentNews.body;
    }
  }

  saveForm() {
    this.saveEditFrom.emit({
      id: this.id,
      date: this.newsDate,
      title: this.newsTitle,
      body: this.newsBody
    });     
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
