import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthorizedGuard } from './authorized.guard';

describe('AuthorizedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthorizedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
