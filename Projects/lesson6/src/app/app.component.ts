import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

type errorValidate = {
  notOneValidator: {message: string}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesson6';
  user = {
    firstName: 'Иван',
    password: ''
  }

  formStatus: string = "";

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(5)], [notOneAsyncValidator('Иванов')]],
      password: [this.user.password, [Validators.required]],
      records: this.fb.array([])
    }, /*{ updateOn: 'blur'}*/);

    //console.log(this.loginForm.value);
    this.formStatus = this.loginForm.status;

    this.loginForm.valueChanges.pipe(filter(() => this.loginForm.valid)).subscribe((value) => console.log(this.loginForm.value));
    this.loginForm.statusChanges.subscribe((status) => this.formStatus = status);
  }

  get recordList(): FormArray {
    return this.loginForm.controls["records"] as FormArray;
  }

  addRecord() {
    this.recordList.push(
      this.fb.control({name: 'Имя', value: 'Значение'}, [Validators.required])
    )
  }

  removeRecord(i: number) {
    this.recordList.removeAt(i);
  }
}

function notOneAsyncValidator(param: string) {
return function notOneAsyncValidator(formControl: AbstractControl): Observable<null | errorValidate> {
  if (formControl.value == param) {
    return of({ notOneValidator: {message: 'Нельзя вводить ' + param}}).pipe(
      delay(3000)
    )
  }
  return of(null);
}
}

function notOneValidator(formControl: FormControl): null | errorValidate {
  if (formControl.value == 'Петров') {
    return { notOneValidator: {message: 'Нельзя вводить Петров'}}
  }
  return null;
}