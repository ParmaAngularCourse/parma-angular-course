import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NewsRadioControlComponent,
    },

    {
      provide: NG_VALIDATORS,
      useExisting: NewsRadioControlComponent,
      multi: true,
    },
  ],
})
export class NewsRadioControlComponent
  implements ControlValueAccessor, Validator
{
  controlValue!: ControlRadioValue;
  selectedTagKey!: number;
  onChange!: (_val: ControlRadioValue) => {};
  onTouch!: () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('onValidate' + this.selectedTagKey);
    if (this.selectedTagKey === -1 || this.selectedTagKey === undefined)
      return {
        message: 'не выбран тип новости',
      };
    else return null;
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
