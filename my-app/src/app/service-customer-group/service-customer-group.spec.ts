import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCustomerGroup } from './service-customer-group';

describe('ServiceCustomerGroup', () => {
  let component: ServiceCustomerGroup;
  let fixture: ComponentFixture<ServiceCustomerGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCustomerGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCustomerGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
