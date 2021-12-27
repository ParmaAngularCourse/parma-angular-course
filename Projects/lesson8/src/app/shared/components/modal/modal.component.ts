import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = "";
  showModal: boolean = false;

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }  
}
