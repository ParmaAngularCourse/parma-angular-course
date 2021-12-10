import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news-type';

@Component({
  selector: 'app-add-edit-news-modal',
  templateUrl: './add-edit-news-modal.component.html',
  styleUrls: ['./add-edit-news-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditNewsModalComponent implements OnInit {

  public isOpen: boolean = false;

  @Output() closeWindow = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  open(){
    this.cdr.markForCheck(); //question
    this.isOpen = true;
  }

  close() {
    this.cdr.markForCheck();
    this.isOpen = false;
  }

  clickCancel() {
    this.closeWindow.emit();
    console.log('btn cancel');
  }
}
