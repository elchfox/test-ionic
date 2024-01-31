import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product?: Product;

  displayedImages: string[] = []; // Add this line
  constructor(
    private route: ActivatedRoute,
    private productService: ApiService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const numericProductId = Number(productId);
    if (!isNaN(numericProductId) && numericProductId > 0) {
      this.product = this.productService.getById(numericProductId);
    } else {
      console.error('Invalid product ID in the URL');
    }
  }
}
