import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserType } from '../../../all-posts/users';
import { required } from '../../../all-posts/validators';
import { UserInfoService } from '../../../services/user-info.service';
import { catchError, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  private user: UserType | null = null;
  private password: string = '';
  formGroupAuth!: FormGroup;
  private ngUnsubscribe$: Subject<void> = new Subject();

  constructor(
    private userInfoService: UserInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroupAuth = new FormGroup({
      loginControl: new FormControl(this.user?.login, [required('Логин')]),
      passwordControl: new FormControl(this.password, [required('Пароль')]),
    });

    this.userInfoService
      .getUserObserverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (value) => {
          if (value !== null) {
            this.formGroupAuth.setErrors(null);
            this.router.navigate(['/posts'], {
              relativeTo: this.route,
            });
            this.user = this.userInfoService.userCurrent;
          }
        },
        error: (error) => this.formGroupAuth.setErrors([error]),
        complete: () => {},
      });

    this.userInfoService.errorSubject
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((error) =>
        this.formGroupAuth.setErrors({ valid: { message: error } })
      );
  }

  authenticate(login: string, password: string) {
    this.userInfoService.authenticate(login, password);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
