import 'firebase/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubmitPage } from '../pages/submit/submit';
import { ShowcasePage } from '../pages/showcase/showcase';
import { Camera } from '@ionic-native/camera';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LoginPage } from '../pages/login/login';
import qards, { QardsDatabase, QardsStorage } from 'qards-lib'
import { SessionService } from '../data/session';

/**
 * - Karte größer
 * - Design drumrum
 * - Kommentar
 * - Punktzahl
 * - Seriennummer
 * - 1h Cooldown
 * - Kartenrahmen stylable
 * - Nö
 */

export const config = qards;
export function database() {
  return new QardsDatabase(config)
}
export function storage() {
  return new QardsStorage(config)
}

@NgModule({
  declarations: [MyApp, HomePage, SubmitPage, ShowcasePage, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), IonicSwipeAllModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SubmitPage, ShowcasePage, LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    NativeGeocoder,
    SessionService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: QardsDatabase, useFactory: database },
    { provide: QardsStorage, useFactory: storage }
  ]
})
export class AppModule {}
