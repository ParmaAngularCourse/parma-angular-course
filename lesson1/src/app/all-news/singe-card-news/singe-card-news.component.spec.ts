import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingeCardNewsComponent } from './singe-card-news.component';

describe('SingeCardNewsComponent', () => {
  let component: SingeCardNewsComponent;
  let fixture: ComponentFixture<SingeCardNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingeCardNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingeCardNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
