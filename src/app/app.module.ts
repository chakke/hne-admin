import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/ba-components/components.module';
import { AppControllerProvider } from '../providers/football-admin/app-controller/app-controller';
import { HttpService } from '../providers/http-service';
import { ProgressControllerProvider } from '../providers/football-admin/progress-controller/progress-controller';
import { ProvinceControllerProvider } from '../providers/football-admin/province-controller/province-controller';
import { FootballAdminHttpServiceProvider } from '../providers/football-admin/football-admin-http-service/football-admin-http-service';
import { FirebaseServiceProvider } from '../providers/football-admin/firebase-service/firebase-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppControllerProvider,
    HttpService,
    ProgressControllerProvider,
    FootballAdminHttpServiceProvider,
    FirebaseServiceProvider,
    ProvinceControllerProvider
  ]
})
export class AppModule { }
