import { TestBed } from '@angular/core/testing';

import { UserAuthService } from './user-authservice';

describe('UserPermissionService', () => {
  let service: UserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
