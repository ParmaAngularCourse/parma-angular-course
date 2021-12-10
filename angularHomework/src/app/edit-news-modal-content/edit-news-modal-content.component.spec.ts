import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsModalContentComponent } from './edit-news-modal-content.component';

describe('EditNewsModalContentComponent', () => {
  let component: EditNewsModalContentComponent;
  let fixture: ComponentFixture<EditNewsModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewsModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
