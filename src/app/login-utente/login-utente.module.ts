import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUtentePageRoutingModule } from './login-utente-routing.module';

import { LoginUtentePage } from './login-utente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUtentePageRoutingModule
  ],
  declarations: [LoginUtentePage]
})
export class LoginUtentePageModule {}
