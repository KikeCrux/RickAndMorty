import { TestBed } from '@angular/core/testing';

import { RicknmortyApiService } from './ricknmorty-api.service';

describe('RicknmortyApiService', () => {
  let service: RicknmortyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicknmortyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
