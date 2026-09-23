import { Component, OnInit, signal } from '@angular/core';
import { CustomerGroup } from '../classes/ICustomer';
import { CustomerHttpService } from '../services/customer-http-service';

@Component({
  selector: 'app-service-customer-group',
  standalone: false,
  templateUrl: './service-customer-group.html',
  styleUrl: './service-customer-group.css',
})
export class ServiceCustomerGroup implements OnInit {
  groups = signal<CustomerGroup[]>([]);
  errorMessage = signal('');

  constructor(private service: CustomerHttpService) {}

  ngOnInit(): void {
    this.service.getCustomerGroups().subscribe({
      next: (data) => {
        this.groups.set(data);
      },
      error: (error) => {
        this.errorMessage.set('Không đọc được danh sách khách hàng.');
        console.error(error);
      },
    });
  }
}