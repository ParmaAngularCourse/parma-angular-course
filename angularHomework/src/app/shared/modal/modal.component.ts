import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  
  public isOpen: boolean = false;

  @Output() cancel = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  clickCancel() {
    this.cancel.emit();
  }

  open(){
    this.cdr.markForCheck(); //question
    this.isOpen = true;
  }

  close() {
    this.cdr.markForCheck();
    this.isOpen = false;
  }

}
