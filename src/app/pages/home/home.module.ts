import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ProductCardModule } from '../../modules/product-card/product-card.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProductCardModule, HomePageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
