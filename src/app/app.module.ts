import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
<<<<<<< HEAD
import { BookListPage } from '../pages/book-list/book-list';
import { BookService } from '../services/book-service';
=======
import { BookDetailPage } from '../pages/book-detail/book-detail';
>>>>>>> f61bea96b83e5e19e19aafa8a2a784668dac28ab

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    BookListPage
=======
    BookDetailPage
    
>>>>>>> f61bea96b83e5e19e19aafa8a2a784668dac28ab
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    BookListPage
=======
    BookDetailPage
    
>>>>>>> f61bea96b83e5e19e19aafa8a2a784668dac28ab
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BookService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
