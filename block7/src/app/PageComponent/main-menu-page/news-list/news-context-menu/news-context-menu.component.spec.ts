import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContextMenuComponent } from './news-context-menu.component';

describe('NewsContextMenuComponent', () => {
  let component: NewsContextMenuComponent;
  let fixture: ComponentFixture<NewsContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
