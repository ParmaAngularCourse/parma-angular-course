import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService,  private router: Router) { }


  editLoginData!: FormGroup;
  get login() { return this.editLoginData.get('login'); }
  get password() { return  this.editLoginData.get('password'); }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup()
  {
    this.editLoginData = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy() {

  }


  loginClick(){   

    if(this.editLoginData.valid)
    {
     if(!this.authService.isAuth())
      this.authService.login("" + this.login?.value, "" + this.password?.value);
     else
       this.authService.logout();

       if(this.authService.isAuth())
         this.router.navigate(['/news']);
    }
  } 

}
