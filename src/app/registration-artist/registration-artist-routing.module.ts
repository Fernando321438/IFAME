import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationArtistPage } from './registration-artist.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationArtistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationArtistPageRoutingModule {}
