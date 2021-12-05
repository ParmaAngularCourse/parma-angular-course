import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportFormComponent } from './edit-report-form.component';

describe('EditReportFormComponent', () => {
  let component: EditReportFormComponent;
  let fixture: ComponentFixture<EditReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
