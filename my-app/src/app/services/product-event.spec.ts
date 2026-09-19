import { TestBed } from '@angular/core/testing';
import { ProductEventService } from './product-event';

describe('ProductEventService', () => {
  let service: ProductEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
