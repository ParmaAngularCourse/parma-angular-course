import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostDetailComponent } from './single-post-detail.component';

describe('SinglePostDetailComponent', () => {
  let component: SinglePostDetailComponent;
  let fixture: ComponentFixture<SinglePostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePostDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
