import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-template-form-control',
  templateUrl: './template-form-control.component.html',
  styleUrls: ['./template-form-control.component.css']
})
export class TemplateFormControlComponent implements OnInit, AfterViewInit {

  user = { firstName: 'Иван' };
  fieldDisabled = false;  
  formControlValue: string = "";
  @ViewChild('nameField') nameField!: NgModel;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.nameField.control.valueChanges
    .pipe(
      filter(() => this.nameField.control.valid)
    )
    .subscribe((value) => this.formControlValue = value);
  }

}
