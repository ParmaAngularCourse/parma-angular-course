import { TestBed } from '@angular/core/testing';

import { HttpInterseptorService } from './http-interseptor.service';

describe('HttpInterseptorService', () => {
  let service: HttpInterseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
