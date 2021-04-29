import { TestBed } from '@angular/core/testing';

import { GamificationServiceService } from './gamification-service.service';

describe('GamificationServiceService', () => {
  let service: GamificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
