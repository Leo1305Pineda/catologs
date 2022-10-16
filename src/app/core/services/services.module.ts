import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from './catalog/catalog.service';
import { ProductService } from './product/product.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CatalogService,
    ProductService
  ]
})
export class ServicesModule { }
