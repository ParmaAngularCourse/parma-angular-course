import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header-page-switcher',
  templateUrl: './header-page-switcher.component.html',
  styleUrls: ['./header-page-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPageSwitcherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
