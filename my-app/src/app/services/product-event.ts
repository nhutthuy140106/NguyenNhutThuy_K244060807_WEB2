import { Injectable } from '@angular/core';
import { ProductEvent } from '../classes/IProductEvent';

@Injectable({
  providedIn: 'root'
})
export class ProductEventService {
  productsImage: ProductEvent[] = [
    {
      ProductId: 'p1',
      ProductName: 'Coca',
      Price: 100,
      Image: 'assets/Coca.jpg'
    },
    {
      ProductId: 'p2',
      ProductName: 'Pepsi',
      Price: 300,
      Image: 'assets/Pepsi.jpg'
    },
    {
      ProductId: 'p3',
      ProductName: 'Sting',
      Price: 200,
      Image: 'assets/Sting.jpg'
    }
  ];

  constructor() {}

  getProductsWithImages(): ProductEvent[] {
    return this.productsImage;
  }

  getProductDetail(id: string): ProductEvent | undefined {
    return this.productsImage.find(
      product => product.ProductId === id
    );
  }
}