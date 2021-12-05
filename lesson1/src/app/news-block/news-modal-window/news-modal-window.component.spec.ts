import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsModalWindowComponent } from './news-modal-window.component';

describe('NewsModalWindowComponent', () => {
  let component: NewsModalWindowComponent;
  let fixture: ComponentFixture<NewsModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
