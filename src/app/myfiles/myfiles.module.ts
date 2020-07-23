import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyfilesPageRoutingModule } from './myfiles-routing.module';

import { MyfilesPage } from './myfiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyfilesPageRoutingModule
  ],
  declarations: [MyfilesPage]
})
export class MyfilesPageModule {}
