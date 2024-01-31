import { Component, OnInit } from '@angular/core';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent   implements OnInit {
  constructor(private statusBar: StatusBar) {}
  ngOnInit() {
    if (window.cordova) {
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#121212');
    }
  }
}
