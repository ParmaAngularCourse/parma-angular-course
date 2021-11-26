import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditformComponent } from './news-editform.component';

describe('NewsEditformComponent', () => {
  let component: NewsEditformComponent;
  let fixture: ComponentFixture<NewsEditformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsEditformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
