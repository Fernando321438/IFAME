import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUsers2PageRoutingModule } from './view-users2-routing.module';

import { ViewUsers2Page } from './view-users2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUsers2PageRoutingModule
  ],
  declarations: [ViewUsers2Page]
})
export class ViewUsers2PageModule {}
