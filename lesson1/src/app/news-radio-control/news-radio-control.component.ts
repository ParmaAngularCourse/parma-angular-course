import { KeyValue } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
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
  ],
})
export class NewsRadioControlComponent implements OnInit, ControlValueAccessor {
  radioControl!: FormControl;
  controlValue!: ControlRadioValue;
  onChange!: (_val: ControlRadioValue) => {};
  onTouch!: () => {};

  constructor() {}

  writeValue(obj: ControlRadioValue): void {
    this.controlValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    this.radioControl = new FormControl(
       this.controlValue?.selectedTag,
      [Validators.required]
    );
  }

  onRadioChange = (index: number) => {
    this.controlValue.selectedTag = this.controlValue.newsTags[index];
    console.log(this.controlValue.selectedTag);
  };
}

type ControlRadioValue = {
  newsTags: Array<NewsPostTag>;
  selectedTag: NewsPostTag | undefined;
};
