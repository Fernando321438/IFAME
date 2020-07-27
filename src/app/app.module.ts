import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';
import{AngularFireStorageModule} from 'angularfire2/storage';
import {InAppBrowser, InAppBrowserOriginal} from '@ionic-native/in-app-browser';
import { DataService } from './data.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  
  AngularFireDatabaseModule,
  AngularFireStorageModule,
  InAppBrowserOriginal,
  AngularFireModule.initializeApp(firebaseConfig),
  BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    DataService,
    StatusBar,
    SplashScreen,
    { provide:  RouteReuseStrategy, useClass: IonicRouteStrategy, }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
