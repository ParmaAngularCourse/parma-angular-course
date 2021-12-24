import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCommonComponent } from './modal-common.component';

describe('ModalCommonComponent', () => {
  let component: ModalCommonComponent;
  let fixture: ComponentFixture<ModalCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
