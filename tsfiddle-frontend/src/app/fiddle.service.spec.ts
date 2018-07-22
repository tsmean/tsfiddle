import { TestBed, inject } from '@angular/core/testing';

import { FiddleService } from './fiddle.service';

describe('FiddleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiddleService]
    });
  });

  it('should be created', inject([FiddleService], (service: FiddleService) => {
    expect(service).toBeTruthy();
  }));
});
