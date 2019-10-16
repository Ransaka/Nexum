import { TestBed } from '@angular/core/testing';

import { ReplyformService } from './reply.service';

describe('ReplyformService ', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReplyformService  = TestBed.get(ReplyformService );
    expect(service).toBeTruthy();
  });
});