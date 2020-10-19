import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationArtistPageRoutingModule } from './registration-artist-routing.module';

import { RegistrationArtistPage } from './registration-artist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationArtistPageRoutingModule
  ],
  declarations: [RegistrationArtistPage]
})
export class RegistrationArtistPageModule {}
