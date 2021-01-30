import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Media} from "@ionic-native/media/ngx";
import { File} from "@ionic-native/file/ngx";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FileTransfer,FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { DatePipe } from '@angular/common';
import {LoadingController,Platform,ToastController} from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),  AgmCoreModule.forRoot({ // @agm/core
    apiKey: 'your key',
  }),
    AgmDirectionModule,  
    AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,

    
    
  ],
  providers: [
    Geolocation,
    AngularFirestoreModule,
    StatusBar,
    SplashScreen,
    Media,
    File,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FileTransfer,
    FileTransferObject,
    DatePipe,
    LoadingController,
    Platform,
    ToastController,
    
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
],
  bootstrap: [AppComponent]
})

export class AppModule {}
