import { TestBed } from '@angular/core/testing';

import { SubsectionsService } from './subsections.service';

describe('SubsectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsectionsService = TestBed.get(SubsectionsService);
    expect(service).toBeTruthy();
  });
});
