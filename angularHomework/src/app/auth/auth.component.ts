import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserAuthService } from '../user-authservice';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  userForm!: FormGroup;
  
  constructor(private _fb: FormBuilder, private _userAuthService: UserAuthService, private router: Router) {
   }

  ngOnInit(): void {
    this._userAuthService.logOut();
    this.userForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  login() {
    this._userAuthService.authorise(this.userForm.value.username, this.userForm.value.password).subscribe(
      val => {
        if (val){
          this.router.navigate(['main']);
        }
        else {
          this.userForm.reset()
        }
      }
    );
  }
}
