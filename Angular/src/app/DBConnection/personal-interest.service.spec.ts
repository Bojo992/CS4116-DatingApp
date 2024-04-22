import { TestBed } from '@angular/core/testing';

import { PersonalInterestService } from './personal-interest.service';

describe('PersonalInterestService', () => {
  let service: PersonalInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
