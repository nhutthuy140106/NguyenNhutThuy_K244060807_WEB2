import { Component } from '@angular/core';
import { ProductEvent } from '../classes/IProductEvent';
import { ProductEventService } from '../services/product-event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  styleUrl: './service-product-image-event.css',
  templateUrl: './service-product-image-event.html',
})
export class ServiceProductImageEvent {
  products: ProductEvent[];

  constructor(
    productService: ProductEventService,
    private router: Router
  ) {
    this.products = productService.getProductsWithImages();
  }

  viewDetail(product: ProductEvent): void {
    this.router.navigate([
      'service-product-image-event',
      product.ProductId
    ]);
  }
}
