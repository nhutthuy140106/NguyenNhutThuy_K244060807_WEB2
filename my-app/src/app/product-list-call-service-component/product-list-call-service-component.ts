import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  styleUrl: './product-list-call-service-component.css',
  templateUrl: './product-list-call-service-component.html',
})
export class ProductListCallServiceComponent {
  minPrice: number = 0;
  maxPrice: number = 1000;
  products: Product[] = [];
  constructor(private ps: ProductService) {
    // this.products = this.ps.getProductList();
  }
  ngOnInit(): void {
    this.products = this.ps.getProductList();
  }
  doFilter() {
    this.products = this.ps.filterProductList(this.minPrice, this.maxPrice);
  }
}
