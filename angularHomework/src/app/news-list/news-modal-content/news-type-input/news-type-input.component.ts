import { Component, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { NewsType, NewsTypeObjectEnum } from 'src/app/model/news-type';

@Component({
  selector: 'app-news-type-input',
  templateUrl: './news-type-input.component.html',
  styleUrls: ['./news-type-input.component.css']
})
export class NewsTypeInputComponent implements OnInit, ControlValueAccessor {

  public newsTypes: NewsType[] = Object.values(NewsTypeObjectEnum);
  selectedNewsType: NewsType | null = null;

  onChange!: (_val: NewsType | null) => {}
  onTouched!: () => {}

  //паблик для темплейта, но лучше обернуть в геттер\сеттер
  constructor(@Self() @Optional() public ngControl: NgControl ) { 
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.ngControl.control?.addValidators(validate);
    this.ngControl.control?.updateValueAndValidity();
    console.log("oninit", this.ngControl.control);
  }

  writeValue(obj: NewsType | null): void {
    console.log("writeValue",obj)
    this.selectedNewsType = obj;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  onButtonClick(id: number) {
    this.selectedNewsType = this.newsTypes.find(t => t.id === id) ?? null;
    this.onChange(this.selectedNewsType);
    this.onTouched();
  }

  
}

function validate(ctrl: AbstractControl): ValidationErrors | null {
  console.log("value in validate", ctrl.value);
  let val = Validators.required(ctrl);
  console.log("val", val);
  if (val) {
    console.log("Необходимо выбрать тип");
    return { message: "Необходимо выбрать тип" };

  }

  if (ctrl.value?.id === 1)
    return { message: "Сейчас запрещено писать о политике :D" };

  return null;
}