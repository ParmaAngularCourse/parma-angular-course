import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserType } from '../all-posts/users';
import { required } from '../all-posts/validators';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  formGroupProfile!: FormGroup;
  @Input() user: UserType = {
    name: '',
    surname: '',
    email: '',
    login: '',
    permissions: [],
  };
  ngUnsubscribe$: Subject<void> = new Subject();

  @Output() saveChangesProfileEvent: EventEmitter<UserType> =
    new EventEmitter<UserType>();
  @Output() closeProfileEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userInfoService: UserInfoService) {
    this.user = this.userInfoService.userCurrent;
  }

  ngOnInit(): void {
    this.formGroupProfile = new FormGroup({
      profileNameUserControl: new FormControl(this.user.name, [
        required('Имя'),
      ]),
      profileSurnameUserControl: new FormControl(this.user.surname, [
        required('Фамилия'),
      ]),
      profileEmailUserControl: new FormControl(this.user.email, [
        required('Email'),
      ]),
    });

    this.formGroupProfile.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        console.log(value);
        console.log(value['profileNameUserControl']);
        this.user.name = value['profileNameUserControl'];
        this.user.surname = value['profileSurnameUserControl'];
        this.user.email = value['profileEmailUserControl'];
      });
  }

  saveProfileHandler() {
    this.saveChangesProfileEvent.emit(this.user);
    this.userInfoService.updateUser(this.user);
  }

  cancelProfileHandler() {
    this.closeProfileEvent.emit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
