import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemModalComponent } from './news-item-modal.component';

describe('NewsItemModalComponent', () => {
  let component: NewsItemModalComponent;
  let fixture: ComponentFixture<NewsItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
