import { TestBed } from '@angular/core/testing';

import { ResolveDataService } from './resolve-data.service';

describe('ResolveDataService', () => {
  let service: ResolveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
