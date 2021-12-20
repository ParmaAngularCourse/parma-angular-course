import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMainComponent } from './auto-main.component';

describe('AutoMainComponent', () => {
  let component: AutoMainComponent;
  let fixture: ComponentFixture<AutoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
