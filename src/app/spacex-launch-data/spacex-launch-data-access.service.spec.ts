import { TestBed } from '@angular/core/testing';

import {SpaceLaunchDataAccessService} from './spacex-launch-data-access.service';

describe('SpaceLaunchDataAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceLaunchDataAccessService = TestBed.get(SpaceLaunchDataAccessService);
    expect(service).toBeTruthy();
  });
});
