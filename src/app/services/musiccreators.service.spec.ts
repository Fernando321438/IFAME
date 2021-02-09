import { TestBed } from '@angular/core/testing';

import { MusiccreatorsService } from './musiccreators.service';

describe('MusiccreatorsService', () => {
  let service: MusiccreatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusiccreatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
