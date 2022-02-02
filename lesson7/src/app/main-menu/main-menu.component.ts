import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { PostType } from '../all-posts/post-types';
import { UserInfoService } from '../user-info.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  private ngUnsubscribe$: Subject<void> = new Subject();

  get isAuth(): boolean {
    return this.userInfoService.isAuth();
  }

  constructor(
    private userInfoService: UserInfoService,
    private cdr: ChangeDetectorRef
  ) {
    this.userInfoService
      .getUserObserverble()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        this.cdr.markForCheck();
      });
  }

  logout() {
    this.userInfoService.logout();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
