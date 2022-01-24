import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsboxComponent } from './newsbox.component';

describe('NewsboxComponent', () => {
  let component: NewsboxComponent;
  let fixture: ComponentFixture<NewsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
