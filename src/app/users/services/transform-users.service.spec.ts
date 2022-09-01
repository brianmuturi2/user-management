import { TestBed } from '@angular/core/testing';

import { TransformUsersService } from './transform-users.service';

describe('TransformUsersService', () => {
  let service: TransformUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
