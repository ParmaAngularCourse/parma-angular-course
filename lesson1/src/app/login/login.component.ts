import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  loginForm!: FormGroup;
  login: string | null = null;
  password: string | null = null;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginControl: new FormControl(this.login, [Validators.required]),
      passwordControl: new FormControl(this.password, [Validators.required]),
    });

   
  }

  onLogin() {}
}
