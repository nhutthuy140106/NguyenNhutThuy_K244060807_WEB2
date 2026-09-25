import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})

export class ProductDetailComponent {
  product=signal<Product|null>(null);
  errMessage=signal("")
  constructor(private _service:ProductHttpHandleErrorService,
    private router:Router,
    private activateRoute:ActivatedRoute){
  }

  ngOnInit():void{
    this.activateRoute.paramMap.subscribe(
      (param)=>{
        let idParam=param.get('id')
        if(idParam!=null)
        {
          let id=parseInt(idParam)
          this._service.getProductById(id).subscribe(
            {
              next:(data)=>{
                this.product.set(data??null);
              },
              error: (err) =>{
                this.errMessage.set(err)
              }
            }
          )
        }
      }
    );
  }
}

