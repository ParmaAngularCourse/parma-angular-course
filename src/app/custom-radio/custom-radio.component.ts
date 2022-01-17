import { ChangeDetectorRef, Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NewsType } from '../news/news-types';

@Component({
  selector: 'app-custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.css']
})
export class CustomRadioComponent implements OnInit, ControlValueAccessor {

  @Input() value: any;
  @Input() enum = NewsType;
  @Input() colors!: any;
  model: any;
  onChange = (value: any) => { };
  onTouched = () => { };
  constructor(@Self() private ngControl: NgControl, private ref: ChangeDetectorRef) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    console.log(this.value);
    console.log(this.model);
    this.ngControl?.control?.valueChanges.subscribe((value: any) => {
      this.ref.detectChanges();
      if (this.model === value) return;
      this.writeValue(value);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.model = value;
  }

  select() {
    this.onChange(this.model);
  }
}
