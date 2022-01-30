import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

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

  ngOnInit(): void {}
}
