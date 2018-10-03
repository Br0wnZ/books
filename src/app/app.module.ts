import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookListPage } from '../pages/book-list/book-list';
import { BookService } from '../services/book-service';

import { BookDetailPage } from '../pages/book-detail/book-detail';
import { ToastService } from '../services/toast';
import { NewBookPage } from '../pages/new-book/new-book';
import { ConfirmAlertService } from '../services/confirmAlert';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    BookDetailPage,
    NewBookPage
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
    BookListPage,
    BookDetailPage,
    NewBookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BookService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfirmAlertService
  ]
})
export class AppModule {}
