import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INewsData } from 'src/model/INewsData';
import { TypeNews } from 'src/model/TypeNews';
import { TypeNewsColorDictionary } from 'src/model/TypeNewsColorDictionary';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsEditorComponent implements OnInit { 
  @Output() public saveEditForm: EventEmitter<INewsData> = new EventEmitter(); 
  public currentNews: INewsData | undefined;   
  public id:number = -1;
  public newsDate:Date|null = null; 
  public newsTitle:string = "Заголовок";
  public newsBody:string = "Текст";
  public newsType:TypeNews = TypeNews.Type0_None;
  public radioDataSource: typeof TypeNews = TypeNews;
  public newsTypeColorDict: typeof TypeNewsColorDictionary = TypeNewsColorDictionary;
  public isVisible: boolean = false; 

  ngOnInit(): void { 
  }

  constructor(private cd:ChangeDetectorRef){

  }

  saveForm() {
    this.saveEditForm.emit({
      id: this.id,
      date: this.newsDate ?? new Date(),
      title: this.newsTitle,
      body: this.newsBody,
      type: this.newsType
    });     
    this.closeForm();   
  }

  openForm(newsData:INewsData|null){
    this.isVisible = true;    
    if(newsData){
      this.currentNews = newsData;
    }
    else{
      this.currentNews = 
      {
        id: -1,
        date: new Date(),
        title: "Заголовок",
        body: "Текст",
        type: TypeNews.Type0_None
      };
    }

    this.id = this.currentNews.id;
    this.newsDate = this.currentNews.date;
    this.newsTitle = this.currentNews.title;
    this.newsBody = this.currentNews.body;
    this.newsType = this.currentNews.type;
    this.cd.markForCheck();
  }

  closeForm() {
    this.isVisible = false;
  }

  onChangeNewsDate(value:string){
    this.newsDate = value ? new Date(value) : null;
  }

  onChangeNewsTitle(value:string){
    this.newsTitle = value;
  }

  onChangeNewsBody(value:string){
    this.newsBody = value;
  }

  onChangeNewsType(value:TypeNews){
    this.newsType = value;
  }

  getNewsTypeColor(value:keyof typeof TypeNews):string{
    var typeNews = TypeNews[value];
    return TypeNewsColorDictionary.get(typeNews) ?? "";
  }

  ngDoCheck(){
    console.log('app-news-editor - ' + this.currentNews?.title);
  }
}
