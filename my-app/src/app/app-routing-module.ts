import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { ServiceProductImageEvent } from './service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './service-product-image-event-detail/service-product-image-event-detail';
import { ServiceProductCatalog } from './service-product-catalog/service-product-catalog';
import { ServiceCustomerGroup } from './service-customer-group/service-customer-group';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { Contact } from './contact/contact';

const routes: Routes = [
  {path:"binding-property", component:BindingPropertyComponent},
  {path:"binding-class", component:BindingClassComponent},
  {path:"binding-style", component:BindingStyleComponent},
  {path:"binding-event", component:BindingEventComponent},
  {path:"binding-two-way", component:BindingTwoWayComponent},
  {path:"Danh-sach-san-pham", component:ProductListComponent},
  {path:"product-dropdown-list", component:ProductDropdownListComponent}, 
  {path:"product-list-call-service", component:ProductListCallServiceComponent},
  {path:"product-list-call-http-service", component:ProductListCallHttpServiceComponent},
  {path:"product-http-handle-error-service", component:ProductHttpHandleErrorServiceComponent},
  {path:"service-product-image-event", component:ServiceProductImageEvent},
  {path:"service-product-image-event/:id", component:ServiceProductImageEventDetail},
  {path:"service-product-catalog", component:ServiceProductCatalog},
  {path:"service-customer-group", component:ServiceCustomerGroup},
  {path:"product/:id", component:ProductDetailComponent},
  {path:"products", component: ProductListAdvancedComponent },
  {path:"search-products", component: ProductListSearchComponent },
  {path:"", component:Contact},
  {path:"**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
