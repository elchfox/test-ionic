import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[];
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private speechRecognition: SpeechRecognition
  ) {
    this.products = [];
  }
  searchProducts(): void {
    this.products = this.apiService.searchProducts(this.searchTerm);
  }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const products = localStorage.getItem('products');
    if (products) {
      this.products = JSON.parse(products);
    } else {
      this.apiService.getData().subscribe({
        next: (response) => {
          localStorage.setItem('products', JSON.stringify(response.products));
          this.products = response.products;
        },
        error: (error) => console.error('Error fetching data:', error),
      });
    }
  }

  updateLocalStorage(data: any[]) {
    localStorage.setItem('products', JSON.stringify(data));
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  startListening() {
    const value = this.speechRecognition.startListening().subscribe(
      (matches: string[]) => {
        console.log('Speech Recognition Result:', matches);
      },
      (error) => {
        console.error('Speech Recognition Error:', error);
      }
    );
    console.log(value, 'value');
  }

  stopListening(): void {
    this.speechRecognition.stopListening();
  }
}
