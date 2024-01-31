import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { ApiService } from '../../api.service';

import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

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
    private apiService: ApiService,
    private router: Router,
    private speechRecognition: SpeechRecognition,
    private androidPermissions: AndroidPermissions
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

  async startListening() {
    const permissionStatus = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.RECORD_AUDIO
    );

    if (permissionStatus) {
      this.isListening = true;
      this.speechRecognition
        .startListening({
          language: 'en-US',
          prompt: 'Speak now',
        })
        .subscribe(
          (matches: string[]) => {
            this.searchTerm = matches.length > 0 ? matches[0] : '';
            this.products = this.apiService.searchProducts(this.searchTerm);
            this.stopListening();
          },
          (error) => {
            this.isListening = false;
            console.error('Speech Recognition Error:', error);
          }
        );
    } else {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      ]);
    }
  }

  stopListening(): void {
    this.isListening = false;
    this.speechRecognition.stopListening();
  }

}
