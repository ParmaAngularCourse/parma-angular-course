import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserRights } from '../i-user-types';

@Component({
  selector: 'app-news-maker',
  templateUrl: './news-maker.component.html',
  styleUrls: ['./news-maker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMakerComponent implements OnInit {
  public isVisible: boolean = false;
  public curUserRights!: UserRights;

  @Output()
  onCancelAction: EventEmitter<null> = new EventEmitter();

  @Output()
  onAddAction: EventEmitter<null> = new EventEmitter();

  constructor(private readonly authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    let curUser = this.authService.getCurrentUser();
    this.curUserRights = curUser.rights;
  }

  cancelAction() {
    this.onCancelAction.emit();
  }

  addAction() {
    this.onAddAction.emit();
    this.onCancelAction.emit();
  }

  setVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
    this.cd.markForCheck();
  }
}