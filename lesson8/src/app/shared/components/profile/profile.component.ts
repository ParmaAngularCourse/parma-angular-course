import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserType } from '../../../all-posts/users';
import { required } from '../../../all-posts/validators';
import { UserInfoService } from '../../../services/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private isChangeForm: boolean = false;
  private defaultUser: UserType = {
    name: '',
    surname: '',
    email: '',
    login: '',
    permissions: [],
  };
  isVisibleDialogConfirm: boolean = false;

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

  constructor(
    private userInfoService: UserInfoService,
    private cdr: ChangeDetectorRef
  ) {
    this.userInfoService
      .getUserObserverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.user = { ...value };
          this.defaultUser = { ...value };
          this.setValueControl();
          this.cdr.markForCheck();
        }
      });
  }

  ngOnInit(): void {
    this.formGroupProfile = new FormGroup({
      profileNameUserControl: new FormControl(this.user?.name, [
        required('Имя'),
      ]),
      profileSurnameUserControl: new FormControl(this.user?.surname, [
        required('Фамилия'),
      ]),
      profileEmailUserControl: new FormControl(this.user?.email, [
        required('Email'),
      ]),
    });

    this.formGroupProfile.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        console.log(value);
        console.log(value['profileNameUserControl']);
        if (this.user !== null) {
          this.user.name = value['profileNameUserControl'];
          this.user.surname = value['profileSurnameUserControl'];
          this.user.email = value['profileEmailUserControl'];
          this.isChangeForm = true;
        }
      });
  }

  private setValueControl() {
    this.formGroupProfile.setValue({
      profileNameUserControl: this.user?.name,
      profileSurnameUserControl: this.user?.surname,
      profileEmailUserControl: this.user?.email,
    });
  }

  saveProfileHandler() {
    this.saveChangesProfileEvent.emit(this.user);
    this.userInfoService.updateUser(this.user);
    this.isChangeForm = false;
  }

  cancelProfileHandler() {
    this.closeProfileEvent.emit();
  }

  canDeactivate(): boolean {
    if (this.isChangeForm) {
      const isRedirect = confirm(
        'Все изменения будут потеряны! Вы действительно хотите перейти на другую страницу?'
      );
      if (isRedirect) {
        this.user = this.defaultUser;
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  isRedirectUserHandler(value: boolean): boolean {
    return value;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(e: Event): void {
    if (e && !this.canDeactivate()) {
      e.preventDefault();
      e.returnValue = false;
    }
  }
}
