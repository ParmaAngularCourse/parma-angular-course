import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  editUserData!: FormGroup;
  public localUserData = {
    name: "",
    surname: "",
    email: "",
  };


  get name() { return this.editUserData.get('name'); }
  get surname() { return this.editUserData.get('surname'); }
  get email() { return this.editUserData.get('email'); }
  
  private ngUnsubscribeValueChange$: Subject<void> = new Subject();
  
  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup()
  {
    this.editUserData = new FormGroup({
      name: new FormControl(this.authService.getName(), [Validators.required]),
      surname: new FormControl(this.authService.getSurname(), [Validators.required]),
      email: new FormControl(this.authService.getEmail(), [Validators.required]),
    });

    this.editUserData.valueChanges
                .pipe(takeUntil(this.ngUnsubscribeValueChange$))
                .subscribe((value)=>{
                  this.localUserData.name = value.name;
                  this.localUserData.surname = value.surname;
                  this.localUserData.email = value.email;
                });
  }

  ngOnDestroy() {
    this.ngUnsubscribeValueChange$.next();
    this.ngUnsubscribeValueChange$.complete();
  }


  saveClick()
  {
    if(this.editUserData.valid)
      {       
        this.authService.setName(this.localUserData.name);
        this.authService.setSurname(this.localUserData.surname);
        this.authService.setEmail(this.localUserData.email);
      }
  }

}
