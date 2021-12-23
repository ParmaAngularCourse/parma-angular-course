import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../news/news-types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  constructor(private fb: FormBuilder) { }

  @Output() saveUser: EventEmitter<User> = new EventEmitter();
  @Input() user: User = { name: 'Mary', surname: 'Dub', email: 'dubrovskih@parma.ru' }

  ngOnChanges() { this.userForm.patchValue(this.user); }

  userForm: FormGroup = this.fb.group({
    name: [this.user.name, Validators.required],
    surname: [this.user.surname, Validators.required],
    email: [this.user.email, [Validators.required, Validators.email]]
  });

  templates = [
    { name: 'name', header: 'Имя', type: 'text' },
    { name: 'surname', header: 'Фамилия', type: 'text' },
    { name: 'email', header: 'Email', type: 'text' }
  ];

  submit() {
    this.user = this.userForm.value;
  }

  cancel() {
    this.userForm.patchValue(this.user);
  }
}
