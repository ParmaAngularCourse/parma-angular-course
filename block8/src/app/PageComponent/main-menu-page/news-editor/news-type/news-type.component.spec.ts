import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTypeComponent } from './news-type.component';

describe('NewsTypeComponent', () => {
  let component: NewsTypeComponent;
  let fixture: ComponentFixture<NewsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
