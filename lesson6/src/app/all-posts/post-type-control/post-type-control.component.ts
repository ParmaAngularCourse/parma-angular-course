import { Component, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { PostType } from '../post-types';

@Component({
  selector: 'app-post-type-control',
  templateUrl: './post-type-control.component.html',
  styleUrls: ['./post-type-control.component.css'],
})
export class PostTypeControlComponent implements OnInit, ControlValueAccessor {

  private politicClassDefault = "buttonStyle politic";
  private tourismClassDefault = "buttonStyle tourism";
  private economicClassDefault = "buttonStyle economic";
  private scienceClassDefault = "buttonStyle science";
  private internetClassDefault = "buttonStyle internet";

  politicClass:string = this.politicClassDefault;
  tourismClass:string = this.tourismClassDefault;
  economicClass:string = this.economicClassDefault;
  scienceClass:string = this.scienceClassDefault;
  internetClass:string = this.internetClassDefault;

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


  constructor(@Self() @Optional() private _ngControl: NgControl) {
    if (_ngControl)
    {
      _ngControl.valueAccessor = this;
    }
   }

  writeValue(value: PostType): void {
    this.value = value;
    this.selectValue(this.value);
  }
  registerOnChange(fn: (value:PostType) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  ngOnInit(): void {
  }

  private resetClass() {
    this.politicClass = this.politicClassDefault;
    this.tourismClass = this.tourismClassDefault;
    this.economicClass = this.economicClassDefault;
    this.scienceClass = this.scienceClassDefault;
    this.internetClass = this.internetClassDefault;
  }

  selectPolitic() {
    this.resetClass();
    this.politicClass += " selectedStyle";
    this.value = PostType.politic;
    this.onChange(this.value);
  }

  selectTourism() {
    this.resetClass();
    this.tourismClass += " selectedStyle";
    this.value = PostType.tourism;
    this.onChange(this.value);
  }

  selectEconomic() {
    this.resetClass();
    this.economicClass += " selectedStyle";
    this.value = PostType.economic;
    this.onChange(this.value);
  }

  selectScience() {
    this.resetClass();
    this.scienceClass += " selectedStyle";
    this.value = PostType.science;
    this.onChange(this.value);
  }

  selectInternet() {
    this.resetClass();
    this.internetClass += " selectedStyle";
    this.value = PostType.internet;
    this.onChange(this.value);
  }

  selectValue(value:PostType) {
    switch (value) {
      case PostType.politic: this.selectPolitic(); break;
      case PostType.tourism: this.selectTourism(); break;
      case PostType.economic: this.selectEconomic(); break;
      case PostType.science: this.selectScience(); break;
      case PostType.internet: this.selectInternet(); break;
      default:
        break;
    }
  }

}
