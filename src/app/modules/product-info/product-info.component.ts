import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { register } from 'swiper/element/bundle';
import { ApiService } from 'src/app/api.service';
register();
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product: Product | any;
  displayedImages: string[] = []; // Add this line
  editedProduct?: Product | any;
  editing = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}
  ngOnChanges() {
    this.displayedImages = this.product.images.slice(0, 3);
  }

  getStarArray(rating: number) {
    return rating.toFixed(1).toLocaleString();
  }

  editProduct(): void {
    this.editedProduct = { ...this.product };
    this.editing = true;
  }

  updateProduct(name: string, value: any): void {
    this.editedProduct = {
      ...this.editedProduct,
      [name]: value,
    };
  }

  saveChanges(): void {
    this.product = { ...this.editedProduct };
    this.apiService.update(this.editedProduct)
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
  }
}
