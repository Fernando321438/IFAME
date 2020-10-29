import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocalizationPage } from './geolocalization.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocalizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocalizationPageRoutingModule {}
