import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMakerComponent } from './news-maker.component';

describe('NewsMakerComponent', () => {
  let component: NewsMakerComponent;
  let fixture: ComponentFixture<NewsMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
