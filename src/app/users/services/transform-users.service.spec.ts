import { TestBed } from '@angular/core/testing';

import { TransformUsersService } from './transform-users.service';
import {DatePipe, TitleCasePipe} from '@angular/common';

describe('TransformUsersService', () => {
  let service: TransformUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, TitleCasePipe]
    });
    service = TestBed.inject(TransformUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
