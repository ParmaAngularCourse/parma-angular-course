import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponentComponent } from './parent-component.component';

describe('ParentComponentComponent', () => {
  let component: ParentComponentComponent;
  let fixture: ComponentFixture<ParentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
