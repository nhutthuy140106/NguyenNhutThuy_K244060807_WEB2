import { Service } from '@angular/core';
import { Product } from '../classes/IProduct';

@Service()
export class ProductService {
    products: Product[] = [
          { id: 1, name: 'Iphone 18 ProMax', price: 100, image:"https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01_5.jpg" },
          { id: 2, name: 'Iphone 16 Pro', price: -500, image:"https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png" },
          { id: 3, name: 'Iphone 17 Pro Max', price: 370, image:"https://cdn2.cellphones.com.vn/insecure/rs:fill:358:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg" },
          { id: 4, name: 'Iphone 18 Pro', price: -200, image:"https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01_5.jpg" },
          { id: 5, name: 'Iphone 18 Pro', price: 689, image:"https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01_5.jpg" },
        ]
    constructor() {}
    getProductList(){
        return this.products;
    }
    filterProductList(minPrice: number, maxPrice: number) {
        return this.products.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );
    }
}
