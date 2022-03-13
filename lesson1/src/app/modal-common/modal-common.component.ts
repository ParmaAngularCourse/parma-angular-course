import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-common',
  templateUrl: './modal-common.component.html',
  styleUrls: ['./modal-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCommonComponent {
  constructor(private changeDetection: ChangeDetectorRef) {}
  @Input() isModalOpen!: boolean;
  @Input() operationTitle!: string;
  @Input() changed!: Observable<boolean>;

  Open() {
    this.isModalOpen = true;
    this.changeDetectionForce();
  }

  Close() {
    this.isModalOpen = false;
    this.changeDetectionForce();
  }

  changeDetectionForce() {
    this.changeDetection.markForCheck();
  }
}
