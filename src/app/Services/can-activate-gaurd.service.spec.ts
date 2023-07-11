import { TestBed } from '@angular/core/testing';

import { CanActivateGaurdService } from './can-activate-gaurd.service';

describe('CanActivateGaurdService', () => {
  let service: CanActivateGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
