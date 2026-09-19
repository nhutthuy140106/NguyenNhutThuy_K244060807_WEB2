import { Component } from '@angular/core';
import { CatalogService } from '../services/catalog';

@Component({
  selector: 'app-service-product-catalog',
  standalone: false,
  styleUrl: './service-product-catalog.css',
  templateUrl: './service-product-catalog.html',
})
export class ServiceProductCatalog {
  categories: any[];

  constructor(catalogService: CatalogService) {
    this.categories = catalogService.getCategories();
  }
}
