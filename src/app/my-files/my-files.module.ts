import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFilesPageRoutingModule } from './my-files-routing.module';

import { MyFilesPage } from './my-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFilesPageRoutingModule
  ],
  declarations: [MyFilesPage]
})
export class MyFilesPageModule {}
