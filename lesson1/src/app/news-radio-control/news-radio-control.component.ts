import { JsonpInterceptor } from '@angular/common/http';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Self,
  Optional,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { NewsPostTag } from 'src/models/NewsPostTag';

@Component({
  selector: 'app-news-radio-control',
  templateUrl: './news-radio-control.component.html',
  styleUrls: ['./news-radio-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: NewsRadioControlComponent,
  //   },
  //   {
  //     provide: NG_VALIDATORS,
  //     useExisting: NewsRadioControlComponent,
  //     multi: true,
  //   },
  // ],
})
export class NewsRadioControlComponent
  implements ControlValueAccessor, OnInit
{
  controlValue!: ControlRadioValue;
  selectedTagKey!: number;
  onChange!: (_val: ControlRadioValue) => {};
  onTouch!: () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    @Self() @Optional() public ngControl: NgControl
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    this.ngControl.control?.setValidators(validate);
    this.ngControl.control?.updateValueAndValidity();
  }

  

  writeValue(obj: ControlRadioValue): void {
    this.controlValue = obj;
    this.selectedTagKey = this.controlValue.newsTags.indexOf(
      this.controlValue.selectedTag!
    );
    console.log('selectedTag' + this.selectedTagKey);
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onRadioChange = (index: number) => {
    this.controlValue.selectedTag = this.controlValue.newsTags[index];
    this.selectedTagKey = index;
    this.onChange(this.controlValue);
  };
}

type ControlRadioValue = {
  newsTags: Array<NewsPostTag>;
  selectedTag: NewsPostTag | undefined;
};

function validate(control: AbstractControl): ValidationErrors | null {
  console.log('onValidate' + JSON.stringify(control.value));
  if (control.value.selectedTag === "" || control.value.selectedTag === undefined)
    return {
      message: 'не выбран тип новости',
    };
  else return null;
}