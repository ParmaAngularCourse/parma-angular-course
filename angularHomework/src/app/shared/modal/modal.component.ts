import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  clickCancel() {
    this._router.navigate([{outlets: {modal: null}}]);
  }

}
