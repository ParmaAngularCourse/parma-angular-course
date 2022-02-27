import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor() {}

  @Input() name: string = '';
  @Input() secondName: string = '';
  @Input() email: string = '';
  @Input() hasPermission: boolean = false;

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      nameControl: new FormControl(this.name, [Validators.required]),
      secondNameControl: new FormControl(this.secondName, [Validators.required]),
      emailControl: new FormControl(this.email, [Validators.required]),
    });
  }

  onSave(){

  }

  onCancel(){
    
  }
}
