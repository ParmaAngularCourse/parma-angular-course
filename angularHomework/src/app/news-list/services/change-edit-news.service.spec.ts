import { TestBed } from '@angular/core/testing';

import { ChangeEditNewsService } from './change-edit-news.service';

describe('ChangeEditNewsService', () => {
  let service: ChangeEditNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeEditNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
