import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthServiceService) {

    const user = this.authService.GetUserData();
    if(user){
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

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      nameControl: new FormControl(this.name, [Validators.required]),
      secondNameControl: new FormControl(this.secondName, [
        Validators.required,
      ]),
      emailControl: new FormControl(this.email, [Validators.required]),
    });
  }

  onSave() {}

  onCancel() {}
}
