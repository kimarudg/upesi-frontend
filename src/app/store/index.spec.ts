import { Store } from '@app/core/store';
import { TestBed } from '@angular/core/testing';
// import { Me } from '@app/core/interfaces/engineer.interface';

describe('Store', () => {
  class MockStore extends Store {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useClass: MockStore
        }
      ]
    });
  });

  it('should get user information', () => {
    expect(true).toBeTruthy();
  });
});
