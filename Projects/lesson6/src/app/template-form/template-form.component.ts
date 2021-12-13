import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit, AfterViewInit {

  user = { 
    firstName: 'Иван',  
    password: '12344545'
  };
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

  onSubmitForm(loginForm: NgForm) {
    console.log(loginForm.value);
    console.log(this.user);
    console.log('Статус формы: ' + loginForm.status);
  }
}
