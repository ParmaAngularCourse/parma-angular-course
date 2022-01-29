import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoHideStatusMsgComponent } from './auto-hide-status-msg.component';

describe('AutoHideStatusMsgComponent', () => {
  let component: AutoHideStatusMsgComponent;
  let fixture: ComponentFixture<AutoHideStatusMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoHideStatusMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoHideStatusMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
