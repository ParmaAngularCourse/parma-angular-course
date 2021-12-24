import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentCanDeactivate, User } from '../news/news-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements ComponentCanDeactivate {

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

  canDeactivate(): boolean | Observable<boolean> {
    return this.userForm.dirty ? confirm("Изменения не сохранены. Вы точно хотите покинуть страницу?") : true;
  }
}
