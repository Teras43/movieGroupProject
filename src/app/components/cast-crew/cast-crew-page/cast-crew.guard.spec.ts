import { TestBed } from '@angular/core/testing';

import { CastCrewGuard } from './cast-crew.guard';

describe('CastCrewGuard', () => {
  let guard: CastCrewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CastCrewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
