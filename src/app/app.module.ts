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
import { Camera } from '@ionic-native/camera'

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

@NgModule({
  declarations: [MyApp, HomePage, SubmitPage, ShowcasePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), IonicSwipeAllModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SubmitPage, ShowcasePage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
