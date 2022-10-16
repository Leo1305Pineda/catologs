import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent, ProductComponent, ProductsComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
