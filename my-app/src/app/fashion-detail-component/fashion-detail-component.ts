import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';
import { getIdentityType, extractIdFromSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent {
  fashion=signal<Fashion|null>(null);
  errMessage=signal('')
  public checkIdentityType = getIdentityType;
  public getIdFromSlug = extractIdFromSlug;

  constructor(private _service: FashionAPIService,
    private router: Router,
    private activateRoute: ActivatedRoute){}

  ngOnInit():void{
    this.activateRoute.paramMap.subscribe((param)=>{
      let idParam = param.get('id')
      if(idParam!=null){
        const type = this.checkIdentityType(idParam);
        let id:any = -1
        switch (type) {
          case 'ID':
            id = parseInt(idParam);
            break;
          case 'SLUG_WITH_ID':
            id = this.getIdFromSlug(idParam)
            break;
          case 'PURE_SLUG':
            id = -1
            break;
        }
        this.fashion.set(null)
        this._service.getFashionByIdF(id).subscribe({
          next:(data)=>{
            this.fashion.set(data ? Object.assign(new Fashion(), data) : null)
          },
          error:(err)=>{ this.errMessage.set(err) }
        })
      }
    })
  }

  searchFashion(id:string){
    this.fashion.set(null)
    this.errMessage.set("")
    this._service.getFashion(id).subscribe({
      next:(data)=>{
        const fashionInstance = Object.assign(new Fashion(), data);
        this.fashion.set(fashionInstance);
      },
      error:(err)=>{this.errMessage.set(err)}
    })
  }

  Quaylai(){
    this.router.navigate(['/fashion-list']);
  }
}
