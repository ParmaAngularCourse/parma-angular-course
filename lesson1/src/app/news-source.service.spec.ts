import { TestBed } from '@angular/core/testing';

import { NewsSourceService } from './news-source.service';

describe('NewsSourceService', () => {
  let service: NewsSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
