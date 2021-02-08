import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationMusiccreatorsPageRoutingModule } from './registration-musiccreators-routing.module';

import { RegistrationMusiccreatorsPage } from './registration-musiccreators.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationMusiccreatorsPageRoutingModule
  ],
  declarations: [RegistrationMusiccreatorsPage]
})
export class RegistrationMusiccreatorsPageModule {}
