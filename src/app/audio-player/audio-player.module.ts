import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioPlayerPageRoutingModule } from './audio-player-routing.module';

import { AudioPlayerPage } from './audio-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioPlayerPageRoutingModule
  ],
  declarations: [AudioPlayerPage]
})
export class AudioPlayerPageModule {}
