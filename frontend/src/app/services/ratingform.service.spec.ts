import { TestBed } from '@angular/core/testing';

import { RatingformService } from './ratingform.service';

describe('RatingformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingformService = TestBed.get(RatingformService);
    expect(service).toBeTruthy();
  });
});