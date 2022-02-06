import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AutoHideStatusMsgComponent } from '../ShareComponent/auto-hide-status-msg/auto-hide-status-msg.component';
import { AuthorizationService } from '../../service/authorization.service';
import { NeedNubmerAndCharacters } from '../../Validators/NeedNubmerAndCharacters';
import { NotEmptyStringValidator } from '../../Validators/NotEmptyStringValidator';
import { OnlyNumberOrCharacters } from '../../Validators/OnlyNumberOrCharacters';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPageComponent implements OnInit {

  private unsubscriptionSubj!:Subject<void>
  @ViewChild('statusMsg') statusMsg!: AutoHideStatusMsgComponent
  public editForm!: FormGroup;
  private login:string = '';
  private password:string = '';

  public get userLogin():AbstractControl{
    return this.editForm.controls['userLogin'];
  }

  public get userPassword():AbstractControl{
    return this.editForm.controls['userPassword'];
  }

  constructor(private fb: FormBuilder, private authService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();

    this.editForm = this.fb.group(
      {
        userLogin: [this.login, [NotEmptyStringValidator('Логин'), OnlyNumberOrCharacters('Логин')]],
        userPassword: [this.password, [NotEmptyStringValidator('Пароль'), NeedNubmerAndCharacters('Пароль')]]
      }      
    );    

    this.userLogin.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeUserLogin(value))
    this.userPassword.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeUserPassword(value))
  }

  onChangeUserPassword(value: string) {
    this.password = value;
  }

  onChangeUserLogin(value:string){
    this.login = value;
  }

  LogIn() {
    this.authService.LogOn(this.login, this.password)
      .pipe(
        switchMap(result => this.statusMsg.ShowStatusMessage(result)),
        takeUntil(this.unsubscriptionSubj)
      )
      .subscribe(result=> this.router.navigate(['/main/news-list'], { queryParams: {type: "Type0_None"}})      
    );
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}