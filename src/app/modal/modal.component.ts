import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isModalVisible = false;

  show() {
    this.isModalVisible = true;
  }

  hide() {
    this.isModalVisible = false;
  }
}
