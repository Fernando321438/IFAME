import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewArtistPage } from './view-artist.page';

const routes: Routes = [
  {
    path: '',
    component: ViewArtistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewArtistPageRoutingModule {}
