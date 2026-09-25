import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Contact } from './contact/contact';
import { Homework } from './homework/homework';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list-component/product-list-component';
import { First } from './first/first';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ServiceProductImageEvent } from './service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './service-product-image-event-detail/service-product-image-event-detail';
import { ServiceProductCatalog } from './service-product-catalog/service-product-catalog';
import { ServiceCustomerGroup } from './service-customer-group/service-customer-group';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';

@NgModule({
  declarations: [
    App,
    Contact,
    Homework,
    BindingPropertyComponent,
    BindingClassComponent,
    BindingStyleComponent,
    BindingEventComponent,
    BindingTwoWayComponent,
    ProductListComponent,
    First,
    ProductDropdownListComponent,
    ProductListCallServiceComponent,
    ServiceProductImageEvent,
    ServiceProductImageEventDetail,
    ServiceProductCatalog,
    ServiceCustomerGroup,
    ProductDetailComponent,
    ProductListCallHttpServiceComponent,
    ProductListAdvancedComponent,
    ProductListSearchComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App],
})
export class AppModule {}
