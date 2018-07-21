import { TestBed, inject } from '@angular/core/testing';

import { TscService } from './tsc.service';

describe('TscService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TscService]
    });
  });

  it('should be created', inject([TscService], (service: TscService) => {
    expect(service).toBeTruthy();
  }));
});
