import { Component, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { oneRecord } from '../types';

@Component({
  selector: 'app-one-record',
  templateUrl: './one-record.component.html',
  styleUrls: ['./one-record.component.css']
})
export class OneRecordComponent implements OnInit, ControlValueAccessor {

  controlValue: oneRecord | null = {
    name: "Имя по-умолчанию",
    value: "Значение по-умолчанию"
  }
  onChange!: (_val: oneRecord | null) => {}
  onTouched!: () => {}

  constructor(@Self() @Optional() public ngControl: NgControl) {
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

  writeValue(_val: oneRecord) {
    this.controlValue = _val;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  onNameChange($event: Event) {
    if (this.controlValue) {
      this.controlValue.name = ($event.target as HTMLInputElement).value;
    } else {
      this.controlValue = {
        name: ($event.target as HTMLInputElement).value,
        value: ''
      }
    }
    this.resetValue();
    this.onChange(this.controlValue);
  }

  onValueChange($event: Event) {
    if (this.controlValue) {
      this.controlValue.value = ($event.target as HTMLInputElement).value;
    } else {
      this.controlValue = {
        value: ($event.target as HTMLInputElement).value,
        name: ''
      }
    }
    this.resetValue();
    this.onChange(this.controlValue);
  }

  onBlur() {
    this.onTouched();
  }

  resetValue() {
    if (this.controlValue) {
      if (this.controlValue.name == '' && this.controlValue.value == '') {
        this.controlValue = null;
      }
    }
  }
}

function validate(ctrl: AbstractControl): ValidationErrors | null {
  if (ctrl.value?.name === 'Иванов') {
    return { message: 'Нельзя вводить Иванов'};
  }
  return null;
}