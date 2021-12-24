import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-common',
  templateUrl: './modal-common.component.html',
  styleUrls: ['./modal-common.component.scss']
})
export class ModalCommonComponent {
  @Input() isModalOpen!: boolean;
  @Input() operationTitle!: string;

  Open() {
    this.isModalOpen = true;
  }

  Close() {
    this.isModalOpen = false;
  }
}
