import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../model/user-info';
import { UserAuthService } from '../user-authservice';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {

  userForm!: FormGroup;
  userInfo!: UserInfo;
  
  constructor(private fb: FormBuilder, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.resetUserInfo();
  }

  private resetUserInfo() {
    var userInfo = this.userAuthService.getCurrentUser();

    if (userInfo) {
      this.userInfo = userInfo;
      this.userForm = this.fb.group({
        name: [userInfo.name, [Validators.required]],
        surname: [userInfo.surname, [Validators.required]],
        email: [userInfo.email, [Validators.required]]
      });
    }
  }

  clickSave() {
    console.log(this.userForm.value);
    this.userAuthService.changeUserInfo(
      {login: this.userInfo.login,
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        email: this.userForm.value.email}).subscribe(
      isOk => {
        if (isOk) this.resetUserInfo();
      }
    );

    
  }

  clickCancel() {
    this.userForm.setValue(
      {
        name: this.userInfo.name,
        surname: this.userInfo.surname,
        email: this.userInfo.email
      }
    );
  }

}
