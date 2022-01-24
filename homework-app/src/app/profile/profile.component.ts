import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnDestroy {

  public profileForm!: FormGroup;

  private ngUnsubscribe$: Subject<boolean>;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute, private usersService: UsersService) { 

    this.ngUnsubscribe$ = new Subject();
    route.data.subscribe(data => {
      this.profileForm = this.fb.group({
        firstname: [data['userData'].firstname, [Validators.required]],
        lastname: [data['userData'].lastname, [Validators.required]],
        email: [data['userData'].email, [Validators.required]]
      });
    })
  }

  save() {
    let profileInfo = {
      login: this.usersService.getCurrentUserName(),
      ...this.profileForm.value
    }
    this.usersService.updateUserProfile(profileInfo).pipe(
      takeUntil(this.ngUnsubscribe$)
    ).subscribe();
    this.router.navigate(['/news/all']);
  }

  cancel() {
    this.router.navigate(['/news/all']);
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
