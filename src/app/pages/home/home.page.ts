import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[];
  searchTerm: string = '';
  searchResults: any[] = [];
  isListening?: boolean;

  constructor(
    private platform: Platform,
    private apiService: ApiService,
    private router: Router,
    private speechRecognition: SpeechRecognition
  ) {
    this.products = [];
  }
  searchProducts(event: any): void {
    this.searchTerm = event.target.value;
    this.products = this.apiService.searchProducts(this.searchTerm);
  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchData();
      }
    });
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
    this.router.navigate(['/login']);
  }

  startListening() {
    this.isListening = !this.isListening;
    if (this.platform.is('cordova')) {
      this.speechRecognition.startListening().subscribe(
        (matches: string[]) => {
          this.searchTerm = matches.length > 0 ? matches[0] : '';
          this.products = this.apiService.searchProducts(this.searchTerm);
          this.stopListening();
        },
        (error) => {
          console.error('Speech Recognition Error:', error);
        }
      );
    }
  }

  stopListening(): void {
    this.isListening = false;
    this.speechRecognition.stopListening();
  }
}
