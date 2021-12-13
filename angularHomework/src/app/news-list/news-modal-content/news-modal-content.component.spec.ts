import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsModalContentComponent } from './news-modal-content.component';

describe('NewsModalContentComponent', () => {
  let component: NewsModalContentComponent;
  let fixture: ComponentFixture<NewsModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
