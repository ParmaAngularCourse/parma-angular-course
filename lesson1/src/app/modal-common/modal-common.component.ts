import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateComponent } from '../close-page.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-common',
  templateUrl: './modal-common.component.html',
  styleUrls: ['./modal-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCommonComponent {
  constructor(
    private changeDetection: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  @Input() isModalOpen!: boolean;
  @Input() operationTitle!: string;

  Open() {
    this.isModalOpen = true;
    this.changeDetectionForce();
  }

  Close() {
    this.isModalOpen = false;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        operation: null,
        itemId: null,
      },
      queryParamsHandling: 'merge',
    });
    this.changeDetectionForce();
  }

  changeDetectionForce() {
    this.changeDetection.markForCheck();
  }
}
