import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';
import { Template } from '../news/news-types';
import { Role } from '../news/roles';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})

export class EditComponentComponent {

  @Input() templates!: Template[];
  @Input() form!: FormGroup;
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  @Input() submitName = 'Coхранить';
  @Input() canSubmit = true;

  roleEnum = Role;

  submit() {
    this.submitForm.emit(this.form.value);
  }
}
