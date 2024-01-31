import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  loginError: string | null = null;
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    this.username = '';
  }

  ngOnInit() {}
  async login() {
    if (this.username === '1') {
      localStorage.setItem('username', this.username);
      this.router.navigate(['/']);
    } else {
      await this.ErrorAlert();
    }
  }

  private async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Wrong username Please try again.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
