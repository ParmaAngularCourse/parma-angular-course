import { TestBed } from '@angular/core/testing';

import { HttpNewsService } from './http-news.service';

describe('HttpNewsService', () => {
  let service: HttpNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
