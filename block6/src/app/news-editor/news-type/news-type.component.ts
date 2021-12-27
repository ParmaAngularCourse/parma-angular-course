import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TypeNews } from 'src/model/TypeNews';
import { TypeNewsColorDictionary } from 'src/model/TypeNewsColorDictionary';

@Component({
  selector: 'app-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.css'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,    
    useExisting: NewsTypeComponent,
    multi:true
  },{
    provide: NG_VALIDATORS,
    useExisting: NewsTypeComponent,
    multi: true
  }]
})

export class NewsTypeComponent implements OnInit, ControlValueAccessor, Validator {
  public radioDataSource: typeof TypeNews = TypeNews;
  public newsType:TypeNews = TypeNews.Type0_None;
  public newsTypeColorDict: typeof TypeNewsColorDictionary = TypeNewsColorDictionary;
  private OnFormChange!: (_val:TypeNews) => {}
  private OnFormTouched!: () => {}

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.value === TypeNews.Type0_None){
      return { message: 'Нельзя указывать "Пустой" тип новости'}
    }
    else{
      return null;
    }
  }

  ngOnInit(): void {
  }

  writeValue(newsType: TypeNews): void {
    this.newsType = newsType;
  }

  registerOnChange(fn: any): void {
    this.OnFormChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.OnFormTouched = fn;
  }

  onBlur(){
    this.OnFormTouched();
  }

  onChangeNewsType(value:TypeNews){
    this.newsType = value;
    this.OnFormChange(value);
  }

  getNewsTypeColor(value:string):string{
    var key = value as keyof typeof TypeNews;
    if(key){
      var typeNews = TypeNews[key];
      return TypeNewsColorDictionary.get(typeNews) ?? "";
    }
    else{
      return "";
    }
  }
}
