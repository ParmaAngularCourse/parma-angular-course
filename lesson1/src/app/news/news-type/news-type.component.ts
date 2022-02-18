import { HtmlAstPath } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { NewsTypes } from '../news-types';
import { nType } from './types';

@Component({
  selector: 'app-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: NewsTypeComponent
  },{
    provide: NG_VALIDATORS, 
    useExisting: NewsTypeComponent, 
    multi: true
  }]
})

export class NewsTypeComponent implements OnInit, ControlValueAccessor, Validator {

   public nTypes: nType[] = [
    {name: "Политика", color: "green", value: NewsTypes.Politic, isCheck: false},
    {name: "Туризм", color: "skyblue", value: NewsTypes.Travel, isCheck: false},
    {name: "Экономика", color: "orange", value: NewsTypes.Economic, isCheck: false},
    {name: "Наука", color: "rgb(57, 98, 175)", value: NewsTypes.Since, isCheck: false},
    {name: "Интернет", color: "gray", value: NewsTypes.Internet, isCheck: false},
  ];

  controlValue: number = 1;

  onChange!: (_val: number) => {};
  onTouched!: () => {};

  constructor() { 
  }

  ngOnInit(): void {

  }


  writeValue(_val: number) {
    this.controlValue = _val;
    this.setSelected(_val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;      
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;      
  }


  onValueChange($event: number){
    this.controlValue = $event;
    this.setSelected($event);

    this.onChange(this.controlValue);
  }

  setSelected(val: number)
  {
    this.nTypes.map(i=> i.isCheck = false);

    var item = this.nTypes.filter(i=> i.value == val);
    item[0].isCheck = true;
  }



  onClick(item: nType)
  {
    this.nTypes.map(i=> i.isCheck = false);

    item.isCheck = true;
    this.onValueChange(item.value);
  }



    validate(ctrl: AbstractControl): ValidationErrors|null{

      if(ctrl.value == NewsTypes.Internet)
      {
          return {message: "На данный момент нельзя уcтанавливать новость типа 'Интернет'"};
      }

      return null;
    }




}
