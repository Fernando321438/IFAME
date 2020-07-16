import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMusiccreatorsPageRoutingModule } from './view-musiccreators-routing.module';

import { ViewMusiccreatorsPage } from './view-musiccreators.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMusiccreatorsPageRoutingModule
  ],
  declarations: [ViewMusiccreatorsPage]
})
export class ViewMusiccreatorsPageModule {}
