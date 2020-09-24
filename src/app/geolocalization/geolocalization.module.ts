import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation/ngx';
import { GeolocalizationPageRoutingModule } from './geolocalization-routing.module';

import { GeolocalizationPage } from './geolocalization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalizationPageRoutingModule
  ],
  declarations: [GeolocalizationPage]
})
export class GeolocalizationPageModule {}
