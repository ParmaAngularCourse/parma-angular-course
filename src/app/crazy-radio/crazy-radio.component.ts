import { ChangeDetectorRef, Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-crazy-radio',
  templateUrl: './crazy-radio.component.html',
  styleUrls: ['./crazy-radio.component.css']
})
export class CrazyRadioComponent implements OnInit, ControlValueAccessor {

  @Input() value: any;
  model: any;
  onChange = (value: any) => { };
  onTouched = () => { };
  constructor(@Self() private ngControl: NgControl, private ref: ChangeDetectorRef) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
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
    this.model = this.model === this.value ? null : this.value;
    this.onChange(this.model);
  }
}
