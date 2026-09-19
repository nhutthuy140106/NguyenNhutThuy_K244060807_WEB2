import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductEvent } from '../classes/IProductEvent';
import { ProductEventService } from '../services/product-event';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  styleUrl: './service-product-image-event-detail.css',
  templateUrl: './service-product-image-event-detail.html',
})
export class ServiceProductImageEventDetail {
  selectedProduct?: ProductEvent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductEventService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id !== null) {
        this.selectedProduct =
          this.productService.getProductDetail(id);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['service-product-image-event']);
  }
}