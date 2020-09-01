import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceAccountPageRoutingModule } from './choice-account-routing.module';

import { ChoiceAccountPage } from './choice-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceAccountPageRoutingModule
  ],
  declarations: [ChoiceAccountPage]
})
export class ChoiceAccountPageModule {}
