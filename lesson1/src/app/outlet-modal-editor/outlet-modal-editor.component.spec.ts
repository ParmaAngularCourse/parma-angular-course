import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletModalEditorComponent } from './outlet-modal-editor.component';

describe('OutletModalEditorComponent', () => {
  let component: OutletModalEditorComponent;
  let fixture: ComponentFixture<OutletModalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletModalEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletModalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
