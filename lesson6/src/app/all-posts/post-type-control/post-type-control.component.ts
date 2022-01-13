import { Component, ElementRef, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { PostType } from '../post-types';

@Component({
  selector: 'app-post-type-control',
  templateUrl: './post-type-control.component.html',
  styleUrls: ['./post-type-control.component.css'],
})
export class PostTypeControlComponent implements OnInit, ControlValueAccessor {

  value:PostType | null = null;

  private onChange = (value:PostType) => {};

  private _typePostControl: AbstractControl | null = null;
  get typePostControl(): AbstractControl | null
  {
    if (!this._typePostControl)
    {
      this._typePostControl = this._ngControl?.control
    }
    return this._typePostControl;
  }

  postTypes: string[] = [];


  constructor(@Self() @Optional() private _ngControl: NgControl) {
    if (_ngControl)
    {
      _ngControl.valueAccessor = this;
    }
    
    for (const item in PostType) {
      this.postTypes.push(item);
    }
   }

  writeValue(value: PostType | string): void {
    this.value = value as PostType;
    this.selectValue(this.value);
  }
  registerOnChange(fn: (value:PostType) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  ngOnInit(): void {
  }

  setValue(postType: PostType) {
    this.value = PostType.politic;
    this.onChange(this.value);
  }

  selectPolitic() {
    this.value = PostType.politic;
    this.onChange(this.value);
  }

  selectTourism() {
    this.value = PostType.tourism;
    this.onChange(this.value);
  }

  selectEconomic() {
    this.value = PostType.economic;
    this.onChange(this.value);
  }

  selectScience() {
    this.value = PostType.science;
    this.onChange(this.value);
  }

  selectInternet() {
    this.value = PostType.internet;
    this.onChange(this.value);
  }

  selectValue(value:PostType | string) {
    switch (value as PostType) {
      case PostType.politic: this.setValue(value as PostType); break;
      case PostType.tourism: this.setValue(value as PostType); break;
      case PostType.economic: this.setValue(value as PostType); break;
      case PostType.science: this.setValue(value as PostType); break;
      case PostType.internet: this.setValue(value as PostType); break;
      default:
        break;
    }
  }

}
