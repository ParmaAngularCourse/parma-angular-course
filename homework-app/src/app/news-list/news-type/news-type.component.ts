import { Component, OnInit, ChangeDetectionStrategy, Self, Optional, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NgControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { NewsType } from '../news-types';

@Component({
  selector: 'app-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTypeComponent implements OnInit, ControlValueAccessor {

  typeValue: NewsType | null = null;
  onChange!: (_val: NewsType | null) => {}
  onTouched!: () => {}

  constructor(@Self() @Optional() public ngControl: NgControl, private cdr: ChangeDetectorRef,) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    let validatorsNgCotrol = this.ngControl.control?.validator;
    if (validatorsNgCotrol) {
      this.ngControl.control?.setValidators([validatorsNgCotrol, validate]);
    }
    else {
      this.ngControl.control?.setValidators(validate);
    }    
    this.ngControl.control?.updateValueAndValidity();
  }

  writeValue(_val: NewsType) {
    this.typeValue = _val;
    this.cdr.markForCheck();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  
  setNewsTypeValue(value: NewsType) {
    this.typeValue = value;
    this.onChange(this.typeValue);
  }

  getNewsTypeValues() {
    const keysAndValues = Object.values(NewsType);
    const typeValues : any[] = [];

    keysAndValues.forEach((keyOrValue: any) => {
      if (isNaN(Number(keyOrValue))) {
        typeValues.push(keyOrValue);
      }
    });

    return typeValues;
  }
}

function validate(ctrl: AbstractControl): ValidationErrors | null {
  if (ctrl.value === NewsType.Politics) {
    return { forbiddenNews: ctrl.value};
  }
  return null;
}
