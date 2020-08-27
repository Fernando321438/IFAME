import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioPlayerPage } from './audio-player.page';

const routes: Routes = [
  {
    path: '',
    component: AudioPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioPlayerPageRoutingModule {}
