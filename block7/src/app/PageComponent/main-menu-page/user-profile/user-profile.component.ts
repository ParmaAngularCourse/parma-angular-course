import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/model/User';
import { AutoHideStatusMsgComponent } from '../../ShareComponent/auto-hide-status-msg/auto-hide-status-msg.component';
import { AuthorizationService } from '../../../service/authorization.service';
import { NotEmptyStringValidator } from '../../../Validators/NotEmptyStringValidator';
import { ICanDeactivateComponent } from 'src/model/ICanDeactivateComponent';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, ICanDeactivateComponent {
  private unsubscriptionSubj!:Subject<void>
  @ViewChild('statusMsg') statusMsg!: AutoHideStatusMsgComponent
  public editForm!: FormGroup
  public currentUser!: User;
  public originalUser!: User;
  private saved:boolean = true;  

  constructor(private fb: FormBuilder, private authService: AuthorizationService){}

  canDeactivate() : boolean | Observable<boolean>{     
    if(!this.saved){
        return confirm("Вы хотите покинуть страницу?");
    }
    else{
        return true;
    }
  }

  private setUser(data:User):void{
    this.currentUser = {...data};
    this.originalUser = {...data};
    this.editForm.patchValue({      
      userName: this.currentUser.name,
      userSurname: this.currentUser.surname,
      userEMail: this.currentUser.email
    });
  }

  public get userName():AbstractControl{
    return this.editForm.controls['userName'];
  }

  public get userSurname():AbstractControl{
    return this.editForm.controls['userSurname'];
  }

  public get userEMail():AbstractControl{
    return this.editForm.controls['userEMail'];
  }

  ngOnInit(): void {
    this.unsubscriptionSubj = new Subject();
    this.editForm = this.fb.group(
      {
        userName: ['', [NotEmptyStringValidator('Имя')]],
        userSurname: ['', [NotEmptyStringValidator('Фамилия')]],
        userEMail: [''],
      }
    );    

    this.userName.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeUserName(value))
    this.userSurname.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeUserSurname(value))
    this.userEMail.valueChanges.pipe(takeUntil(this.unsubscriptionSubj)).subscribe((value:string)=> this.onChangeUserEMail(value))

    this.authService.GetCurrentUser()
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe((data) => this.setUser(data));
  }

  onChangeUserEMail(value: string): void {
    this.currentUser.email = value;
    this.saved = false;
  }

  onChangeUserSurname(value: string) {
    this.currentUser.surname = value;
    this.saved = false;
  }

  onChangeUserName(value:string){
    this.currentUser.name = value;
    this.saved = false;
  }

  saveForm() {
    this.authService.UpdateUserProfile(this.currentUser)
    .pipe(takeUntil(this.unsubscriptionSubj))
    .subscribe(result=> {
        this.statusMsg.ShowStatusMessage(result);
        this.saved = true;
      }
    );
  }

  cancelForm() {
    if(!this.saved && confirm("Это действие привидет к потере несохранненных изменений. Вы уверены?")){
      this.setUser(this.originalUser);
      this.saved = true;
    }    
  }

  ngOnDestroy(){
    this.unsubscriptionSubj.next();
    this.unsubscriptionSubj.complete();
  }
}
