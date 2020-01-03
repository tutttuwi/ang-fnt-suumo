import { TestBed } from '@angular/core/testing';

import { PropertyServiceService } from './property-service.service';

describe('PropertyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyServiceService = TestBed.get(PropertyServiceService);
    expect(service).toBeTruthy();
  });
});
