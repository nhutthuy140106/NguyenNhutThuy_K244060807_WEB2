import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerGroup } from '../classes/ICustomer';

@Injectable({
  providedIn: 'root',
})
export class CustomerHttpService {
  private url = 'datasets/customers.js';

  constructor(private http: HttpClient) {}

  getCustomerGroups(): Observable<CustomerGroup[]> {
    return this.http.get<CustomerGroup[]>(this.url);
  }
}