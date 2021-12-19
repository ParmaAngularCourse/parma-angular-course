import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyRadioComponent } from './crazy-radio.component';

describe('CrazyRadioComponent', () => {
  let component: CrazyRadioComponent;
  let fixture: ComponentFixture<CrazyRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrazyRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
