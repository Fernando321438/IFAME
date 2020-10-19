import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUsers3PageRoutingModule } from './view-users3-routing.module';

import { ViewUsers3Page } from './view-users3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUsers3PageRoutingModule
  ],
  declarations: [ViewUsers3Page]
})
export class ViewUsers3PageModule {}
 