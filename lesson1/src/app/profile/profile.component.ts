import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService, User } from '../auth-service.service';
import { IDeactivateComponent } from '../close-page.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, IDeactivateComponent {
  constructor(private authService: AuthServiceService, private router: Router) {
    const user = this.authService.GetUserData();
    if (user) {
      this.name = user.name ?? '';
      this.secondName = user.surname ?? '';
      this.email = user.email ?? '';
    }
  }

  name: string = '';
  secondName: string = '';
  email: string = '';
  hasPermission: boolean = false;

  profileForm!: FormGroup;
  hasChanged = false;
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      nameControl: new FormControl(this.name, [Validators.required]),
      secondNameControl: new FormControl(this.secondName, [
        Validators.required,
      ]),
      emailControl: new FormControl(this.email, [Validators.required]),
    });
    const user = this.authService.GetUserData();
    if (user) {
      this.name = user.name ?? '';
      this.secondName = user.surname ?? '';
      this.email = user.email ?? '';
    }
    this.profileForm.valueChanges.subscribe((_) => {
      this.hasChanged = true;
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

    this.router.navigate(['..']);
  }

  onCancel() {
    this.router.navigate(['..']);
  }

  canDeactivate(): boolean {
    return this.hasChanged
      ? confirm('Имеются несохраненные изменения. Выйти со страницы?')
      : true;
  }
}
