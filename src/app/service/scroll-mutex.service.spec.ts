import { TestBed } from '@angular/core/testing';

import { ScrollMutexService } from './scroll-mutex.service';

describe('ScrollMutexService', () => {
  let service: ScrollMutexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollMutexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
