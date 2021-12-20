import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDtpComponent } from './auto-dtp.component';

describe('AutoDtpComponent', () => {
  let component: AutoDtpComponent;
  let fixture: ComponentFixture<AutoDtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
