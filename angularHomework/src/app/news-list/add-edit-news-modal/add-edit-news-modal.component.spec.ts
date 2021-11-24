import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNewsModalComponent } from './add-edit-news-modal.component';

describe('AddEditNewsModalComponent', () => {
  let component: AddEditNewsModalComponent;
  let fixture: ComponentFixture<AddEditNewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNewsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
