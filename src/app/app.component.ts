import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
<<<<<<< HEAD

=======
import { BookDetailPage } from '../pages/book-detail/book-detail';
>>>>>>> f61bea96b83e5e19e19aafa8a2a784668dac28ab
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = BookDetailPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

