import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

type errorValidate = {
  notOneValidator: {message: string}
}

@Directive({
  selector: '[appTemplateValidate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TemplateValidateDirective, multi: true }
  ]
})
export class TemplateValidateDirective implements Validator {
  @Input('appTemplateValidate') value: string = "111111";
  constructor() { }

  validate(formControl: FormControl) : null | errorValidate   { 
    if (formControl.value == this.value) {
      return { notOneValidator: { message: 'Нельзя вводить ' + this.value }};
    }
    return null;  
  }  
}
