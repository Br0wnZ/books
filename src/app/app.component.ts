import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookListPage } from '../pages/book-list/book-list';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  
  rootPage:any = BookListPage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.translate.use('es');
  }
}

