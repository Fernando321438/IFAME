import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCryptoPageRoutingModule } from './view-crypto-routing.module';

import { ViewCryptoPage } from './view-crypto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCryptoPageRoutingModule
  ],
  declarations: [ViewCryptoPage]
})
export class ViewCryptoPageModule {}
