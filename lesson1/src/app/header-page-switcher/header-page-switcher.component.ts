import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { UserService } from 'src/services/userService';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-header-page-switcher',
  templateUrl: './header-page-switcher.component.html',
  styleUrls: ['./header-page-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPageSwitcherComponent implements OnInit, OnDestroy {
  userPermission!: boolean;
  private subscrition!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.subscrition = this.userService.IsAdmin().subscribe((x) => {
      this.userPermission = x;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {}

  logOut() {
    if (this.userPermission) this.authService.LogOut();
    else this.router.navigate(['auth']);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
}
