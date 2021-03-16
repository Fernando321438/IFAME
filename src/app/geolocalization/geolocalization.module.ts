import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocalizationPageRoutingModule } from './geolocalization-routing.module';

import { GeolocalizationPage } from './geolocalization.page';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalizationPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzG0AKWtBTZquD9uAyI1qav0epH3Z-S7E'
    })
  ],
  declarations: [GeolocalizationPage]
})
export class GeolocalizationPageModule {}
