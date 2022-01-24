import { TestBed } from '@angular/core/testing';

import { SaveGuard } from './save.guard';

describe('SaveGuard', () => {
  let guard: SaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
