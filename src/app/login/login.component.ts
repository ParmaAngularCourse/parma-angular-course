import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private router: Router) { }

  creds = { login: "", password: "" };
  users = [{ login: "mvd", password: "123" }];
  isUserNotExists = false;

  ngOnChanges() { this.loginForm.patchValue(this.creds); }

  loginForm: FormGroup = this.fb.group({
    login: ["", Validators.required],
    password: ["", Validators.required]
  });

  templates = [
    { name: 'login', header: 'Имя', type: 'text' },
    { name: 'password', header: 'Пароль', type: 'password' }
  ];

  submit() {
    if (this.users.some(x => x.login == this.loginForm.value.login && x.password == this.loginForm.value.password)) {
      localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));
      this.router.navigateByUrl('/news?newsType=');
    }
    else this.isUserNotExists = true;
  }
}
