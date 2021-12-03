import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEditformComponent } from './header-editform.component';

describe('HeaderEditformComponent', () => {
  let component: HeaderEditformComponent;
  let fixture: ComponentFixture<HeaderEditformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEditformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
