import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTypeInputComponent } from './news-type-input.component';

describe('NewsTypeInputComponent', () => {
  let component: NewsTypeInputComponent;
  let fixture: ComponentFixture<NewsTypeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsTypeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
