import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
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

    this.profileForm.valueChanges.subscribe((_) => {
      this.hasChanged = true;
    });
  }

  onSave() {
    this.hasChanged = false;
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
