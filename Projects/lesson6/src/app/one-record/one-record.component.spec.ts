import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRecordComponent } from './one-record.component';

describe('OneRecordComponent', () => {
  let component: OneRecordComponent;
  let fixture: ComponentFixture<OneRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
