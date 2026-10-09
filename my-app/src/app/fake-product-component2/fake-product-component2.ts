import { Component, signal } from '@angular/core';
import { FakeProductService } from '../services/fake-product-service';
import { IFakeProduct } from '../classes/IFakeProduct';

@Component({
  selector: 'app-fake-product-component2',
  standalone: false,
  templateUrl: './fake-product-component2.html',
  styleUrl: './fake-product-component2.css',
})
export class FakeProductComponent2 {
  products = signal<IFakeProduct[]>([]);
  errMessage = signal('');

  constructor(private service: FakeProductService) {}

  ngOnInit(): void {
    this.service.getFakeProductData().subscribe({
      next: (data: IFakeProduct[]) => this.products.set(data),
      error: (err) => this.errMessage.set(err.message),
    });
  }
}