import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductUrl, Product } from './interfaces/product.interface';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient,private speechRecognition: SpeechRecognition) {}

  getData(): Observable<ProductUrl> {
    return this.http.get<ProductUrl>(this.apiUrl);
  }
  getProducts() {
    const products = localStorage.getItem('products');
    const productsJson: Product[] = products ? JSON.parse(products) : [];
    return productsJson;
  }
  getById(id: number) {
    const products = this.getProducts();
    const product = products.find((item) => item.id === id);
    return product;
  }

  update(data: Product) {
    const products = this.getProducts();

    const indexOf = products.findIndex((item) => item.id === data.id);
    if (indexOf >= 0) {
      products[indexOf] = {
        ...products[indexOf],
        ...data,
      };
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }

    return false;
  }

  searchProducts(searchTerm: string): any[] {
    const products = this.getProducts();
    if (!searchTerm) {
      return products;
    }
    searchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }


}
