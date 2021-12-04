import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPostModalWindowComponent } from './news-post-modal-window.component';

describe('NewsPostModalWindowComponent', () => {
  let component: NewsPostModalWindowComponent;
  let fixture: ComponentFixture<NewsPostModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPostModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPostModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
