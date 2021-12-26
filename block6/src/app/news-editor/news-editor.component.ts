import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public currentNews: INewsData;

  public id:number = -1;
  public newsDate:Date|null = null; 
  public newsTitle:string = "Заголовок";
  public newsBody:string = "Текст";
  public newsType:TypeNews = TypeNews.Type0_None;
  public radioDataSource: typeof TypeNews = TypeNews;
  public newsTypeColorDict: typeof TypeNewsColorDictionary = TypeNewsColorDictionary;
  public isVisible: boolean = false;
  
  public editForm!: FormGroup

  private getNewsDateControl():FormControl{
    return this.editForm.controls['newsDateControl'] as FormControl;
  }

  private getNewsTitleControl():AbstractControl{
    return this.editForm.controls['newsTitleControl'];
  }

  private getNewsBodyControl():AbstractControl{
    return this.editForm.controls['newsBodyControl'];
  }

  constructor(private cd:ChangeDetectorRef, private fb: FormBuilder, private datepipe: DatePipe){
    this.currentNews = {
      id: -1,
      date: new Date(),
      title: "Заголовок",
      body: "Текст",
      type: TypeNews.Type0_None
    }
  }

  ngOnInit(): void {
    this.editForm = this.fb.group(
      {        
        newsDateControl: [this.getDateToLocalStringFormat(this.currentNews.date), { updateOn: 'change' }],
        newsTitleControl: [this.currentNews.title],
        newsBodyControl: [this.currentNews.body]
      },
      { updateOn: 'blur'}
    );
    
    this.getNewsDateControl(). valueChanges.subscribe((value:string)=> this.onChangeNewsDate(value))
    this.getNewsTitleControl().valueChanges.subscribe((value:string)=> this.onChangeNewsTitle(value))
    this.getNewsBodyControl().valueChanges.subscribe((value:string)=> this.onChangeNewsBody(value))    
  }

  saveForm() {
    this.saveEditForm.emit(this.currentNews);     
    this.closeForm();
  }

  openForm(newsData:INewsData|null){
    this.isVisible = true;    
    if(newsData){
      this.currentNews = { ...newsData };
    }

    this.editForm.patchValue({
      newsDateControl: this.getDateToLocalStringFormat(this.currentNews.date),
      newsTitleControl: this.currentNews.title,
      newsBodyControl: this.currentNews.body,
      newsTypeControl: this.currentNews.type
    });

    /*this.id = this.currentNews.id;
    this.newsDate = this.currentNews.date;
    this.newsTitle = this.currentNews.title;
    this.newsBody = this.currentNews.body;
    this.newsType = this.currentNews.type;*/
    this.cd.markForCheck();
  }

  closeForm() {
    this.isVisible = false;
    this.editForm.reset();
  }

  private getDateToLocalStringFormat(date:Date):string|null{
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss')
  }

  onChangeNewsDate(value:string){
    if(value){    
      this.currentNews.date = new Date(value);
    }
    else{
      this.currentNews.date = new Date(1900,0,1);
      this.editForm.patchValue({
        newsDateControl: this.getDateToLocalStringFormat(this.currentNews.date)
      });
    }
  }

  onChangeNewsTitle(value:string){
    this.currentNews.title = value;
  }

  onChangeNewsBody(value:string){
    this.currentNews.body = value;
  }
/*
  onChangeNewsType(value:TypeNews){
    this.newsType = value;
  }

  getNewsTypeColor(value:keyof typeof TypeNews):string{
    var typeNews = TypeNews[value];
    return TypeNewsColorDictionary.get(typeNews) ?? "";
  }*/

  ngDoCheck(){
    console.log('app-news-editor - ' + this.currentNews.title);
  }
}
