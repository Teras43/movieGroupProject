import { TestBed } from '@angular/core/testing';

import { MovieDetailsGuard } from './movie-details-guard.guard';

describe('MovieDetailsGuardGuard', () => {
  let guard: MovieDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MovieDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
