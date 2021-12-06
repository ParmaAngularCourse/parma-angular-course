import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-news-maker',
  templateUrl: './news-maker.component.html',
  styleUrls: ['./news-maker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsMakerComponent implements OnInit {
  public isVisible: boolean = false;

  @Output()
  onCancelAction: EventEmitter<null> = new EventEmitter();

  @Output()
  onAddAction: EventEmitter<null> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  cancelAction() {
    this.onCancelAction.emit();
  }

  addAction() {
    this.onAddAction.emit();
    this.onCancelAction.emit();
  }

  setVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
    this.cd.markForCheck();
  }
}