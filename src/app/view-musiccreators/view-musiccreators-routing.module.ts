import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMusiccreatorsPage } from './view-musiccreators.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMusiccreatorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMusiccreatorsPageRoutingModule {}
