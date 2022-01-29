import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTypeFilterComponent } from './news-type-filter.component';

describe('NewsTypeFilterComponent', () => {
  let component: NewsTypeFilterComponent;
  let fixture: ComponentFixture<NewsTypeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsTypeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
