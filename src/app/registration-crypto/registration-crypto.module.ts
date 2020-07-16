import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationCryptoPageRoutingModule } from './registration-crypto-routing.module';

import { RegistrationCryptoPage } from './registration-crypto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationCryptoPageRoutingModule
  ],
  declarations: [RegistrationCryptoPage]
})
export class RegistrationCryptoPageModule {}
