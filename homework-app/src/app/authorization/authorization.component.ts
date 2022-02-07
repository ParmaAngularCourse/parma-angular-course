import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  public authorizationForm!: FormGroup;
  public showError: boolean = false;

  private ngUnsubscribe$: Subject<boolean>;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder,
    private usersService: UsersService, private router: Router) { 
    this.ngUnsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.authorizationForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.usersService.login(this.authorizationForm.value.login, this.authorizationForm.value.password)
    .pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe({ next: (data) => {
        if (data) {
          this.showError = false;
          this.cdr.markForCheck();
          this.router.navigate(['/news']);
        }
        else {
          this.showError = true;
          this.cdr.markForCheck();
        }

    },
      error: (error: HttpErrorResponse) => {
        console.log(`${error.status} ${error.message}`);
        this.showError = true;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}

