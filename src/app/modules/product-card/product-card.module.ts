// product-card.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ProductInfoComponent } from '../product-info/product-info.component';
import { ProductCardComponent } from './components/product-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [ProductCardComponent, ProductInfoComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProductCardComponent, ProductInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardModule {}
