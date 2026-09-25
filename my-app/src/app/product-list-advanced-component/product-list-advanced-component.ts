import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { Product } from '../classes/IProduct';
import id from '@angular/common/locales/extra/id';
import { createSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  styleUrl: './product-list-advanced-component.css',
  templateUrl: './product-list-advanced-component.html',
})
export class ProductListAdvancedComponent {
  products = signal<Product[]>([]);
  errMessage = signal("");
  public generateSlug=createSlug;

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  this._service.getProductList().subscribe({
    next: (data) => {
      this.products.set(data);
    },
    error: (err) => {
      this.errMessage.set(err);
    }
  });
  }

  viewDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

    viewDetailSlug(p:Product)
  {
    let slug=this.generateSlug(p.name,p.id)
    this.router.navigate(["/product",slug])
  }


}
