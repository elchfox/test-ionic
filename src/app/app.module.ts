import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardModule } from './modules/product-card/product-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'; // Import SpeechRecognition

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ProductCardModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SpeechRecognition],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
