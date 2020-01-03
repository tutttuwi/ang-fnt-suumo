import { TestBed } from '@angular/core/testing';

import { LocalstrageService } from './localstrage.service';

describe('LocalstrageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalstrageService = TestBed.get(LocalstrageService);
    expect(service).toBeTruthy();
  });
});
