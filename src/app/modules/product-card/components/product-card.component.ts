import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | any;
  constructor(private router: Router) {}
  ngOnInit() {}
  navigateToProductDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

}
