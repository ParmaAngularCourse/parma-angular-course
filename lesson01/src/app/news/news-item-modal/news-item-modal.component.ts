import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Permission, PermissionService} from "../services/permission.service";

@Component({
  selector: 'app-news-item-modal',
  templateUrl: './news-item-modal.component.html',
  styleUrls: ['./news-item-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemModalComponent implements OnInit {

  @Output() save : EventEmitter<void> = new EventEmitter<void>();
  isVisible: boolean = false;
  perms: Permission[] = [];

  constructor(private _permService : PermissionService,
              public cd : ChangeDetectorRef) {
    this.perms = this._permService.getPermissions();
  }

  ngOnInit(): void {
  }

  show() {
    this.isVisible = true;
    this.cd.markForCheck();
  }

  cancel() {
    this.isVisible = false;
  }

  saveItem() {
    this.isVisible = false;
    this.save.emit();
  }
}
