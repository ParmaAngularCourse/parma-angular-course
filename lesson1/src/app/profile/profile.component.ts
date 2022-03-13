import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService, User } from '../auth-service.service';
import { IDeactivateComponent } from '../close-page.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent
  implements OnInit, IDeactivateComponent, OnDestroy
{
  private userSubscription!: Subscription;
  private formSubscription!: Subscription;
  name: string = '';
  secondName: string = '';
  email: string = '';
  hasPermission: boolean = false;

  profileForm!: FormGroup;
  hasChanged = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .GetUserData()
      .pipe(filter((x) => !!x && Object.keys(x).length !== 0))
      .subscribe((x) => {
        console.log(JSON.stringify(x));
        this.name = x?.name ?? '';
        this.secondName = x?.surname ?? '';
        this.email = x?.email ?? '';

        this.profileForm = new FormGroup({
          nameControl: new FormControl(this.name, [Validators.required]),
          secondNameControl: new FormControl(this.secondName, [
            Validators.required,
          ]),
          emailControl: new FormControl(this.email, [Validators.required]),
        });

        this.formSubscription = this.profileForm.valueChanges.subscribe((_) => {
          this.hasChanged = true;
        });
      });
  }

  onSave() {
    const user = {
      name: this.profileForm.controls['nameControl'].value,
      surname: this.profileForm.controls['secondNameControl'].value,
      email: this.profileForm.controls['emailControl'].value,
    } as User;
    console.log(user);
    this.authService.Update(user);

    this.hasChanged = false;

    this.router.navigate(['/news']);
  }

  onCancel() {
    this.router.navigate(['/news']);
  }

  canDeactivate(): boolean {
    return this.hasChanged
      ? confirm('Имеются несохраненные изменения. Выйти со страницы?')
      : true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}
