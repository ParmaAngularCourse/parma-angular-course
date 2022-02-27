import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthServiceService,
    private router: Router
  ) {}
  loginForm!: FormGroup;
  login: string | null = null;
  password: string | null = null;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginControl: new FormControl(this.login, [Validators.required]),
      passwordControl: new FormControl(this.password, [Validators.required]),
    });
  }

  onLogin() {
    const loginVal = this.loginForm.controls['loginControl'].value;
    const passVal = this.loginForm.controls['passwordControl'].value;

    if (this.authService.LogIn(loginVal, passVal))
      this.router.navigate(['/news']);
  }
}
