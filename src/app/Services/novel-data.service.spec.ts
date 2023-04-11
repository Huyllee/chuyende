import { TestBed } from '@angular/core/testing';

import { NovelDataService } from './novel-data.service';

describe('NovelDataService', () => {
  let service: NovelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
