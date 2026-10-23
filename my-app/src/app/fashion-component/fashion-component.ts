import { Component, signal } from '@angular/core';
import { FashionAPIService } from '../services/fashion-apiservice';
import { Fashion } from '../classes/Fashion';
import { Router } from '@angular/router';
import { createSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-fashion-component',
  standalone: false,
  templateUrl: './fashion-component.html',
  styleUrl: './fashion-component.css',
})
export class FashionComponent {
  fashions=signal<Fashion[]>([]);
  errMessage=signal('')
  public generateSlug = createSlug;

  constructor(public _service: FashionAPIService, private router: Router){
    this._service.getFashions().subscribe({
      next:(data)=>{this.fashions.set(data)},
      error:(err)=>{this.errMessage.set(err)}
    })
  }

  viewDetailSlug(f:Fashion){
    let slug = this.generateSlug(f.fashion_subject, f.IdF)
    this.router.navigate(["/fashion-detail", slug])
  }
}


