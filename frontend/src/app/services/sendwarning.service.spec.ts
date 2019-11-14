import { TestBed } from '@angular/core/testing';

import { SendwarningService } from './sendwarning.service';

describe('SendwarningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendwarningService = TestBed.get(SendwarningService);
    expect(service).toBeTruthy();
  });
});
