import { TestBed } from '@angular/core/testing';

import { Sessione } from './sessione';

describe('Sessione', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sessione = TestBed.get(Sessione);
    expect(service).toBeTruthy();
  });
});
